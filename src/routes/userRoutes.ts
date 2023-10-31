import express from "express";
import {
  addUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
} from "../controllers/userController";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/", auth, getAllUsers);

router.get("/profil", auth, getUser);

router.post("/register", addUser);

router.put("/:id", auth, editUser);

router.delete("/:id", auth, deleteUser);

export default router;
