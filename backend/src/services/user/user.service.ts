import User, { IUser } from "../../models/user.model";


const getAllUsers = async (): Promise<IUser[]> => {
  return User.find();
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};


const deleteUser = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};

export default {
  getAllUsers,
  getUserById,
  deleteUser
};
