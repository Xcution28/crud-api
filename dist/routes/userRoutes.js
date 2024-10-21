"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRequest = void 0;
const userController_1 = require("../controllers/userController");
const setRequest = (req, res) => {
    const { method, url } = req;
    if (url?.startsWith('/api/users')) {
        if (method === 'GET' && url === '/api/users') {
            try {
                const users = (0, userController_1.getAllUsers)();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users));
            }
            catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            }
        }
        else if (method === 'GET' && url?.match(/\/api\/users\/([a-f0-9-]+)/)) {
            const userId = url.split('/')[3];
            try {
                const user = (0, userController_1.getUserById)(userId);
                if (user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            }
            catch (error) {
                if (error.message === 'Invalid userId') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
                else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
            }
        }
        else if (method === 'POST' && url === '/api/users') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const userData = JSON.parse(body);
                    const newUser = (0, userController_1.createUser)(userData);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                }
                catch (error) {
                    if (error.message === 'Missing required fields') {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                    else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                }
            });
        }
        else if (method === 'PUT' && url?.match(/\/api\/users\/([a-f0-9-]+)/)) {
            const userId = url.split('/')[3];
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const userData = JSON.parse(body);
                    const updatedUser = (0, userController_1.updateUser)(userId, userData);
                    if (updatedUser) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(updatedUser));
                    }
                    else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'User not found' }));
                    }
                }
                catch (error) {
                    if (error.message === 'Invalid userId' || error.message === 'Missing required fields') {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                    else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: error.message }));
                    }
                }
            });
        }
        else if (method === 'DELETE' && url?.match(/\/api\/users\/([a-f0-9-]+)/)) {
            const userId = url.split('/')[3];
            try {
                const deleted = (0, userController_1.deleteUser)(userId);
                if (deleted) {
                    res.writeHead(204);
                    res.end();
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            }
            catch (error) {
                if (error.message === 'Invalid userId') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
                else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: error.message }));
                }
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};
exports.setRequest = setRequest;
