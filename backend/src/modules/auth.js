import jwt from 'jsonwebtoken';
import User from './models/User';

export async function getUser(token) {
  if (!token) {
    return ({ user: null });
  }
  try {
    const decodedToken = jwt.verify(token.substring(7), process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken._id });
    return ({ user });
  } catch (err) {
    return ({ user: null });
  }
}

export function generateToken(user) {
  return `Bearer ${jwt.sign({ id: user._id }, process.env.JWT_SECRET)}`;
}