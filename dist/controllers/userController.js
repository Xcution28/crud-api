"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("../models/userModel");
const getAllUsers = () => {
    return userModel_1.User.getAll();
};
exports.getAllUsers = getAllUsers;
const getUserById = (userId) => {
    if (!(0, uuid_1.validate)(userId)) {
        throw new Error('Invalid userId');
    }
    return userModel_1.User.getById(userId);
};
exports.getUserById = getUserById;
const createUser = (userData) => {
    const { username, age, hobbies } = userData;
    if (!username || !age || !hobbies) {
        throw new Error('Missing required fields');
    }
    const newUser = { id: (0, uuid_1.v4)(), username, age, hobbies };
    return userModel_1.User.create(newUser);
};
exports.createUser = createUser;
const updateUser = (userId, userData) => {
    if (!(0, uuid_1.validate)(userId)) {
        throw new Error('Invalid userId');
    }
    const { username, age, hobbies } = userData;
    if (!username || !age || !hobbies) {
        throw new Error('Missing required fields');
    }
    return userModel_1.User.update(userId, { username, age, hobbies });
};
exports.updateUser = updateUser;
const deleteUser = (userId) => {
    if (!(0, uuid_1.validate)(userId)) {
        throw new Error('Invalid userId');
    }
    return userModel_1.User.delete(userId);
};
exports.deleteUser = deleteUser;
