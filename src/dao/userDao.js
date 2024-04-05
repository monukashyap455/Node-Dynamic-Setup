import usersModel from "../model/usersModel.js";

// Create user
export const createUser = async (data) => {
    try {
        const newUser = await usersModel.create(data);
        return newUser;
    } catch (error) {
        throw error;
    }
};

// Get user by userId
export const getUser = async (userId) => {
    try {
        const user = await usersModel.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

// Delete user by userId
export const deleteUser = async (userId) => {
    try {
        const deletedUser = await usersModel.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        throw error;
    }
};

// Update user by userId
export const updateUser = async (userId, data) => {
    try {
        const updatedUser = await usersModel.findByIdAndUpdate(userId, data, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};
