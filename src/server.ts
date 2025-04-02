import express from "express";
import { routes } from "./routes";
import cors from 'cors';

require("dotenv").config();
export default class Server {
    private port: string;
    private message: string;
    private app: any;

    constructor() {
        this.port = String(9090);
        this.message = String(process.env.SERVER_MESSAGE);
        this.app = express();
    }


    async __init__() {
        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
        };
        this.app.use(cors(corsOptions))
        this.app.use(express.json());
        this.app.use(routes);

        await this.app.listen(this.port, () => {
            console.log("Start server on: http://localhost:" + this.port);
        });
    }
}