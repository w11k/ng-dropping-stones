"use strict";
import express = require("express");
import cors = require("cors");
import bodyParser = require("body-parser");
import db = require("./common/db");
import UserCtrl  from "./routes/UserCtrl";
import HighscoreCtrl  from "./routes/HighscoreCtrl";

db.init();
let app = express();
app.listen(3002, 'localhost', function () {
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 *  Public Routes:
 * */

HighscoreCtrl.publicRoutes(app, "/api/highscore");