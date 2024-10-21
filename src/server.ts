import * as http from 'http';
import { PORT } from './config';
import { setRequest } from "./routes/userRoutes";

const server = http.createServer(setRequest);

const startServer = (port: number) => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer(PORT);
