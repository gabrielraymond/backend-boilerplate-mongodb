"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.addUser = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const validation_1 = require("../config/validation");
// get user data
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.user.id).select("-password");
        if (user) {
            res.status(200).json(user);
        }
        else {
            console.log(req.user.user.id);
            res.status(400).send('test');
        }
        // res.send('hello')
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});
exports.getUser = getUser;
// Register
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, phone_number, gender, status } = req.body;
    const userFields = {};
    const { error } = (0, validation_1.registerValidation)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Chekcing  user is already in the database
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
    // Create a new user
    if (name)
        userFields.name = name;
    if (address)
        userFields.address = address;
    if (phone_number)
        userFields.phone_number = phone_number;
    if (gender)
        userFields.gender = gender;
    if (status)
        userFields.status = status;
    userFields.username = req.body.username;
    userFields.password = hashedPassword;
    // userFields.laundry = req.body.laundry;
    const user = new User_1.default(userFields);
    try {
        const savedUser = yield user.save();
        // Create and assign a token
        const token = jsonwebtoken_1.default.sign({ user: { id: user._id } }, process.env.TOKEN_SECRET, { expiresIn: 100000 });
        res.header("auth-token", token).json({ token });
    }
    catch (error) {
        res.status(400).send("ini error");
    }
});
exports.addUser = addUser;
//Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Lets validate the data before login
    const { error } = (0, validation_1.loginValidation)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //Checking if the email exists
    const user = yield User_1.default.findOne({ username: req.body.username });
    if (!user)
        return res.status(400).send("Username is not found");
    //Password is correct
    const validPass = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send("Invalid Password");
    try {
        //Create and assign a token
        const token = jsonwebtoken_1.default.sign({ user: { id: user._id } }, process.env.TOKEN_SECRET, { expiresIn: 100000 });
        res.header("auth-token", token).json({ token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map