import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { connectDB } from './config/database.js';

class AppServer{
    constructor(port){
        this.app = express();
        this.port = port;
    }

    async init(){
        await connectDB();
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware(){
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
    }
    
    setupRoutes(){
        routes(this.app);
    }

    start(){
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
        // this.app.listen(8080, '192.168.138.241', () => {
        //     console.log('Backend is running on http://192.168.138.241:8080');
        //   });
        
        // this.app.listen(8080, '0.0.0.0', () => {
        //     console.log('Backend is running on http://0.0.0.0:8080');
        // });
    }
}

const appServer = new AppServer(8080);
await appServer.init();
appServer.start();