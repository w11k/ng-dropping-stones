import express = require("express");
import _ = require("lodash");
import {model as HighscoreModel} from "./../models/Highscore";
import {Highscore} from "./../models/Highscore";

class HighscoreCtrl {

    publicRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + "/add", this.createHighscoreItem);
        app.get(baseRoute + "/get", this.getHighscoreForToday);
        app.get(baseRoute + "/get/all", this.getHighscoreAlltime);
        app.post(baseRoute + "/get/byName", this.playerNameExists;
    }

    createHighscoreItem(req: express.Request, res: express.Response) {
        let done = (err: any) => {
            if (err) {
                console.log('err');
                res.status(500);
                res.send('500 - Internal Error');
                return;
            }

            res.status(200);
        };

        let highscoreItem = new HighscoreModel(req.body);
        highscoreItem.save(done);
    }

    getHighscoreForToday(req: express.Request, res: express.Response) {
        let now = new Date();
        let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let done = (err, result:Highscore[]) => {
            if (err) {
                console.log("err");
                return
            }

            res
                .status(200)
                .json(result)
        };

        HighscoreModel
            .find({createdAt: {$gte: startOfToday}})
            .exec(done);
    }

    getHighscoreAlltime(req: express.Request, res: express.Response) {
        let done = (err, result:Highscore[]) => {
            if (err) {
                console.log("err");
                return
            }

            res
                .status(200)
                .json(result)
        };

        HighscoreModel
            .find({})
            .exec(done);
    }

    playerNameExists(req: express.Request, res: express.Response) {
        console.log(req.body);
        let done = (err, result:Highscore) => {
            if (err) {
                console.log("err");
                return
            }

            console.log(result);

            res
                .status(200)
                .json(result)
        };

        HighscoreModel
            .findOne({'name': req.body.name})
            .exec(done);
    }

}

export default new HighscoreCtrl();