import {connect} from 'mongoose';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = '27017';
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/`;

export class DatabaseService {
    constructor() {
        this.connectToDB();
    }

    private async connectToDB() {
        try {
            await connect(DB_URI);
            console.log(`Connected to DB. URI: ${DB_URI}`);
        } catch (error) {
            console.error('Could not connect to DB. URI: ${DB_URI}', error);
        }
    }
}
