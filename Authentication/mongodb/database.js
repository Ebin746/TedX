const mongoose = require('mongoose');

const dataBaseConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATA_BASE_URL);
        console.log(`Database connected on host: ${connection.connection.host}, port: ${connection.connection.port}`);
    } catch (error) {
        console.log('Database did not connect', error);
    }
};

module.exports = dataBaseConnection;
