require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./databases/config')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();

//Directorio público
app.use( express.static('public'));


// ClAr68TTc2OO2oI7
//mean_user
// mongodb+srv://mean_user:<password>@cluster0.4lkea.mongodb.net/test

//Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/hospitales', require('./routes/hospitales') );
app.use('/api/medicos', require('./routes/medicos') );
app.use('/api/todo', require('./routes/busquedas') );
app.use('/api/upload', require('./routes/uploads') );
app.use('/api/login', require('./routes/auth') );

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})




