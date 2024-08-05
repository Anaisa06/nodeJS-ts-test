import express from 'express';
import dotenv from 'dotenv';
import sequelize  from './config/db'
import router from './Routes/Router';
import { errorHandler } from './middlewares/errorHandler.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database succesful');
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log('Unable to connect to database:', error);
    }
}

startServer();