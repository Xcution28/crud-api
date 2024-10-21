"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
let users = [];
class User {
    static getAll() {
        return users;
    }
    static getById(id) {
        return users.find(user => user.id === id) || null;
    }
    static create(user) {
        users.push(user);
        return user;
    }
    static update(id, updatedUser) {
        const index = users.findIndex(user => user.id === id);
        if (index === -1)
            return null;
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }
    static delete(id) {
        const index = users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        users.splice(index, 1);
        return true;
    }
}
exports.User = User;
