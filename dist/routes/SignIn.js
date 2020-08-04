"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
var express_1 = require("express");
exports.SignIn = express_1.Router();
exports.SignIn.post('/sign-in', function (req, res) {
    res.send('User is being signed in here');
});
