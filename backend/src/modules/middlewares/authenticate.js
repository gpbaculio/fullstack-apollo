import jwt from "jsonwebtoken";
import User from "../models/User";

export default (req, res, next) => {
  const { authorization } = req.headers; // token wil be injected on header if found on localStorage
  if (authorization) {
    jwt.verify(authorization.substring(7), process.env.JWT_SECRET, (err, { id }) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        User.findOne({ _id: id }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};
