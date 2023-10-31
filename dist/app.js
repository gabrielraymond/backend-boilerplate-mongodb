"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 4000;
// Routes
const authRoute_1 = __importDefault(require("./routes/authRoute"));
//Connect DB
// console.log(process.env.MONGO_URI);
const db_1 = __importDefault(require("./config/db"));
(0, db_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes Middleware
app.use("/api/user", authRoute_1.default);
app.get("/", (req, res) => {
    res.send("Hello there!!!!!!!!!!!!");
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map