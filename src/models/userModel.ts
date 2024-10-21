import { UserData } from "../types";

let users: UserData[] = [];

export class User {
    static getAll(): UserData[] {
        return users;
    }

    static getById(id: string): UserData | null {
        return users.find(user => user.id === id) || null;
    }

    static create(user: UserData): UserData {
        users.push(user);
        return user;
    }

    static update(id: string, updatedUser: Omit<UserData, 'id'>): UserData | null {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }

    static delete(id: string): boolean {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return false;
        users.splice(index, 1);
        return true;
    }
}
