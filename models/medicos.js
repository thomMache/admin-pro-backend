const { Schema, model } = require('mongoose');
const hospital = require('../models/hospital');
const usuario = require('./usuario');

const MedicosSchema = Schema({
    
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    }


}, {collection: 'medicos'});


MedicosSchema.method('toJSON', function(){
   const{ __v,...object } =  this.toObject();
   return object;
})

module.exports = model('Medico', MedicosSchema);