import express = require("express");
import _ = require("lodash");
import {model as UserModel} from "./../models/User";
import {User} from "./../models/User";

class UserCtrl {

    publicRoutes(app: express.Application, baseRoute: string) {
        // app.post(baseRoute + "/get", this.getSingleUser);
        // app.get(baseRoute + "/get/all", this.getUsers);
    }

    getSingleUser(req: JwtRequest, res: express.Response) {

        UserModel
        .findOne({"$and": [{"login": req.body.username}, {"active": true}]})
        .exec(done);

        function done(err: any, result: User) {
            if (err) {
                console.log("err");
                return
            }

            if (result) {
                result = UserCtrl.cleanSensitiveData(result);
            }

            res
            .status(200)
            .json(result);
        }
    }

    // todo: merge getUsers and getUsersNearCity because of duplicate functionality
    getUsers(req: express.Request, res: express.Response) {
        let limit: number = 10;

        UserModel
        .find({"active": true}, 'name login avatar_url city tec availability')
        .sort({"fieldSum": -1})
        .lean()
        .exec(done);

        function done(err: any, result: any) {
            if (err) {
                console.log("err");
                return
            }

            _.forEach(result, function (data: User, key: number) {
                result[key]['forProjects'] = data.availability.forProjects;
                result[key]['greaterDistance'] = data.availability.greaterDistance;
                result[key]['nodejs'] = data.tec.nodejs;
                result[key]['angularjs'] = data.tec.angularjs;
                result[key]['angular2'] = data.tec.angular2;
                result[key]['ionic'] = data.tec.ionic;
                result[key]['nativescript'] = data.tec.nativescript;

                delete result[key].availability;
                // delete result[key].tec;
            });

            res
            .status(200)
            .json(result);
        }
    }

    updateUser(req: JwtRequest, res: express.Response) {
        let location = req.body.zip + ' ' + req.body.city;

        UserCtrl.getCoordinates(location)
        .then((result: any) => {
            if (result.status === 'ZERO_RESULTS') {
                UserCtrl.cancel(res, 'location_not_found');
                return;
            }
            // save users city (w/o zip to cities collection
            UserCtrl.saveCityCoordinates(req.body.city);

            let fieldSum: number = _.size(req.body);

            // cannot update if unique values are present, see:
            // http://stackoverflow.com/questions/23119823/mongoerror-field-name-duplication-not-allowed-with-modifiers
            delete req.body._id;
            delete req.body.__v;
            delete req.body.updatedAt;
            delete req.body.createdAt;
            delete req.body.github_id;
            delete req.body.login;

            let data: User = req.body;
            data.loc = [];
            data.loc[0] = result.results[0].geometry.location.lng;
            data.loc[1] = result.results[0].geometry.location.lat;
            data.fieldSum = fieldSum;
            data.active = true;

            UserModel.findOneAndUpdate({
                "github_id": req.decoded.github_id
            }, data, {
                "new": true
            }, done);
        });

        function done(err: any, result: User) {
            if (err) {
                console.log('err');
                return;
            }

            res
            .status(200)
            .json("user data updated");
        }
    }
}

export default new UserCtrl();