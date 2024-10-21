import { validate as uuidValidate } from 'uuid';
import { UserData } from "../types";
import { User } from '../models/userModel';

export const getAllUsers = (): UserData[] => {
    return User.getAll();
};

export const getUserById = (userId: string): UserData | null => {
    if (!uuidValidate(userId)) {
        throw new Error('Invalid userId');
    }
    return User.getById(userId);
};

export const createUser = (userData: Omit<UserData, 'id'>): UserData => {
    const { username, age, hobbies } = userData;
    if (!username || !age || !hobbies) {
        throw new Error('Missing required fields');
    }
    const newUser = { id: username, age, hobbies };
    return User.create(newUser);
};

export const updateUser = (userId: string, userData: Omit<UserData, 'id'>): UserData | null => {
    if (!uuidValidate(userId)) {
        throw new Error('Invalid userId');
    }
    const { username, age, hobbies } = userData;
    if (!username || !age || !hobbies) {
        throw new Error('Missing required fields');
    }
    return User.update(userId, { username, age, hobbies });
};

export const deleteUser = (userId: string): boolean => {
    if (!uuidValidate(userId)) {
        throw new Error('Invalid userId');
    }
    return User.delete(userId);
};
