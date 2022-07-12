import {connect} from 'mongoose';

export class DatabaseService {
    constructor() {
        this.connectToDB();
    }

    private async connectToDB() {
        try {
            await connect('mongodb://localhost:27017/');
            console.log('Connected to DB');
        } catch (error) {
            console.error('Could not connect to DB:', error);
        }
    }
}
