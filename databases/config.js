
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
   await mongoose.connect(process.env.db_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}); 

    console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new error('Error a la hora de iniciar la BD ver logs');
    }


}


module.exports = {
    dbConnection 
}