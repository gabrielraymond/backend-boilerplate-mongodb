import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
