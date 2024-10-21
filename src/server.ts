import * as http from 'http';
import { PORT } from './config';

const server = http.createServer();

const startServer = (port: number) => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer(PORT);
