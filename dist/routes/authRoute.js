"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controller/authController");
const auth_1 = __importDefault(require("../middleware/auth"));
router.get("/get_user", auth_1.default, authController_1.getUser);
router.post("/register", authController_1.addUser);
router.post("/login", authController_1.login);
exports.default = router;
//# sourceMappingURL=authRoute.js.map