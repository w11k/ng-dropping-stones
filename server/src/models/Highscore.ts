import mongoose = require("mongoose");
// mongoose.Promise = require("bluebird");
// import {PublicUser} from "../common/interfaces/PublicUser";
var Schema = mongoose.Schema;


export interface Highscore extends mongoose.Document {
    _id: typeof mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    score: string;
    level: string;
    lines: string;
}

export var HighscoreSchema = new Schema(
    {
        name: String,
        email: String,
        score: Number,
        level: Number,
        lines: Number
    },
    {
        timestamps: true
    }
);

export var model = mongoose.model<Highscore>("Highscore", HighscoreSchema);
