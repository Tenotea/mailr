"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var SignIn_1 = require("./routes/SignIn");
exports.routes = function (app) {
    app.post('/sign-in', SignIn_1.SignIn);
};
