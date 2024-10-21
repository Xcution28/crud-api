import * as http from 'http';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

export const setRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { method, url } = req;

    if (url?.startsWith('/api/users')) {
        if (method === 'GET' && url === '/api/users') {
            try {
                const users = getAllUsers();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users));
            } catch (error: any) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            }
        } else if (method === 'GET' && url?.match(/\/api\/users\/([a-f0-9-]+)/)) {
            const userId = url.split('/')[3];
            try {
                const user = getUserById(userId);
                if (user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            } catch (error: any) {
                if (error.message === 'Invalid userId') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
            }
        } else if (method === 'POST' && url === '/api/users') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const userData = JSON.parse(body);
                    const newUser = createUser(userData);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                } catch (error: any) {
                    if (error.message === 'Missing required fields') {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                }
            });
        } else if (method === 'PUT' && url?.match(/\/api\/users\/([a-f0-9-]+)/)) {
            const userId = url.split('/')[3];
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const userData = JSON.parse(body);
                    const updatedUser = updateUser(userId, userData);
                    if (updatedUser) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(updatedUser));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'User not found' }));
                    }
                } catch (error: any) {
                    if (error.message === 'Invalid userId' || error.message === 'Missing required fields') {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                }
            });
        } else if (method === 'DELETE' && url?.match(/\/api\/users\/([a-f0-9-]+)/)) {
            const userId = url.split('/')[3];
            try {
                const deleted = deleteUser(userId);
                if (deleted) {
                    res.writeHead(204);
                    res.end();
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            } catch (error: any) {
                if (error.message === 'Invalid userId') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};
