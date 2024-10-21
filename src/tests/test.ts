import { createUser, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { UserData } from '../types';


describe('User API', () => {
    let userId: string;

    it('should create a new user', () => {
        const userData: Omit<UserData, 'id'> = {
            username: 'testuser',
            age: 30,
            hobbies: ['reading', 'coding'],
        };
        const newUser = createUser(userData);
        expect(newUser).toHaveProperty('id');
        userId = newUser.id;
    });

    it('should get the created user', () => {
        const user = getUserById(userId);
        expect(user).not.toBeNull();
        expect(user?.id).toEqual(userId);
    });

    it('should update the created user', () => {
        const updatedUserData: Omit<UserData, 'id'> = {
            username: 'updateduser',
            age: 31,
            hobbies: ['reading', 'coding', 'traveling'],
        };
        const updatedUser = updateUser(userId, updatedUserData);
        expect(updatedUser).not.toBeNull();
        expect(updatedUser?.username).toEqual('updateduser');
    });

    it('should delete the created user', () => {
        const deleted = deleteUser(userId);
        expect(deleted).toBeTruthy();
    });

    it('should return null for deleted user', () => {
        const user = getUserById(userId);
        expect(user).toBeNull();
    });
});
