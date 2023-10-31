"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    //Get token from header
    const token = req.header("x-auth-token");
    //Check if not token
    if (!token)
        res.status(401).json({ msg: "No token, authorization denied" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map