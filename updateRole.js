import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const updateRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Find all users
        const users = await mongoose.connection.collection('users').find({}).toArray();
        console.log('All users:', users);

        const result = await mongoose.connection.collection('users').updateOne(
            { _id: users[0]._id }, // Update the first user we find
            { $set: { role: 'ADMIN' } }
        );
        
        if(result.modifiedCount > 0) {
            console.log('Successfully updated role to ADMIN');
        } else {
            console.log('User not found or already an admin');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
};

updateRole();