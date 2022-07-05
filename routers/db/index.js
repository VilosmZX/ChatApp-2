const mongoose = require("mongoose");


const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/user_db', (err) => {
        if(err) return console.error('database error');
        return console.log('Database connected!');
    });
}

const getModel = () => {
    const userSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    });
    const user = mongoose.model('users', userSchema);
    return user;
};

module.exports = { connectDB, getModel };