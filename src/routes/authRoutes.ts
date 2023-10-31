import express from "express";
import { getUser, login } from "../controllers/authController";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/get_user", auth, getUser);
router.post("/login", login);

export default router;
