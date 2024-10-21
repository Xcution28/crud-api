import { UserData } from "../types";

let users: UserData[] = [];

export class User {
    static getAll(): UserData[] {
        return users;
    }

    static getById(id: string) {
    }

    static create(user: UserData){
    }

    static update(id: string, updatedUser: Omit<UserData, 'id'>) {

    }

    static delete(id: string) {

    }
}
