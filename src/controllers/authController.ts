import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { registerValidation, loginValidation } from "../config/validation";
import mongoose, { Schema, model } from "mongoose";

interface IUser {
  // laundry: any;
  name: string;
  username: string;
  password: string;
  address: string;
  phone_number: number;
  gender: string;
  status: string;
  date: any;
}

// get user data
const getUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user.user.id).populate('laundry')

    const user = await User.findById(req.user.user.id)
      .select("-password")
      .populate("laundry")
      .exec();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send("test");
    }

    // res.send('hello')
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

// // Register
// const addUser = async (req, res) => {
//   const { name, address, phone_number, gender, status } = <IUser>req.body;
//   const userFields = <IUser>{};

//   const { error } = registerValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // Chekcing  user is already in the database
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);

//   // Create a new user
//   if (name) userFields.name = name;
//   if (address) userFields.address = address;
//   if (phone_number) userFields.phone_number = phone_number;
//   if (gender) userFields.gender = gender;
//   if (status) userFields.status = status;
//   userFields.username = req.body.username;
//   userFields.password = hashedPassword;
//   // userFields.laundry = req.body.laundry;
//   const user = new User(userFields);

//   try {
//     const savedUser = await user.save();

//     // Create and assign a token
//     const token = jwt.sign(
//       { user: { id: user._id } },
//       process.env.TOKEN_SECRET,
//       { expiresIn: 100000 }
//     );

//     res.header("auth-token", token).json({ token });
//   } catch (error) {
//     res.status(400).send("ini error");
//   }
// };

//Login
const login = async (req, res) => {
  //Lets validate the data before login
  const { usernameOrEmail, password } = req.body;

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the provided input is an email or a username
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) return res.status(401).send("Username or Email is not found");

  //Password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(401).send("Invalid Password");

  try {
    //Create and assign a token
    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.TOKEN_SECRET,
      { expiresIn: "3h" }
    );
    res.status(200).header("auth-token", token).json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export { getUser, login };
