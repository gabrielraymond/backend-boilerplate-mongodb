import { Request, Response } from "express";
import { registerValidation } from "../config/validation";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
  name: string;
  username: string;
  email: string;
  address: string;
  phoneNumber: string;
  gender: string;
  status: string;
  password: string;
}

const getUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user.user.id).populate('laundry')

    const user = await User.findById(req.user.user.id)
      .select("-password")
      .exec();
    // .populate("laundry")

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send("test");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(401).send("No Data");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const addUser = async (req, res) => {
  const {
    name,
    username,
    email,
    address,
    phoneNumber,
    gender,
    status,
    password,
  } = <IUser>req.body;
  const userFields = <IUser>{};
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   Checking username or email is already in the database
  const usernameExist = await User.findOne({ username: username });
  if (usernameExist) return res.status(403).send("username is already exist");
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(403).send("email is already exist");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create New User
  if (name) userFields.name = name;
  if (address) userFields.address = address;
  if (phoneNumber) userFields.phoneNumber = phoneNumber;
  if (gender) userFields.gender = gender;
  if (status) userFields.status = status;
  userFields.username = username;
  userFields.password = hashedPassword;
  userFields.email = email;
  const user = new User(userFields);

  try {
    const savedUser = await user.save();

    // Create and assign a token
    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).header("auth-token", token).json(savedUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const editUser = async (req, res) => {
  const {
    name,
    username,
    email,
    address,
    phoneNumber,
    gender,
    status,
    password,
  } = <IUser>req.body;

  const userFields = <IUser>{};

  //   Checking username or email is already in the database

  if (username) {
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) return res.status(403).send("username is already exist");
  }

  if (email) {
    const emailExist = await User.findOne({ email: email });
    if (emailExist) return res.status(403).send("email is already exist");
  }

  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (username) userFields.username = username;
  if (address) userFields.address = address;
  if (phoneNumber) userFields.phoneNumber = phoneNumber;
  if (gender) userFields.gender = gender;
  if (status) userFields.status = status;

  try {
    let user = await User.findById(req.params.id);
    // console.log(user);
    if (user) {
      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: userFields },
        { new: true }
      ).select("-password");

      console.log(user);
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(204).json({ message: "Delete User is successful" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export { getUser, addUser, getAllUsers, editUser, deleteUser };
