import jwt from 'jsonwebtoken';
import User from './models/User';

export async function getUser(token) {
  if (!token) {
    return { user: null };
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne(
      { _id: id }, // user _id for finding query!
      {
        password: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        confirmationToken: 0
      }
    );
    return ({
      user: {
        id: user._id.toString(), // _id by default is object id, not string
        email: user.email,
        confirmed: user.confirmed
      }
    });
  } catch (err) {
    return { user: null };
  }
}

export function generateToken(user) {
  return `Bearer ${jwt.sign({ id: user._id }, process.env.JWT_SECRET)}`;
}