const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const medicos = require('../models/medicos');

borrarImagen = (path) =>{
                       
    if(fs.existsSync(path)){
        //borrando la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo) => {

let pahtviejo = ''; 
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontro el medico por id');
                return false;     
            }
            
            pathViejo = `${medico.img}`;
            borrarImagen(pathViejo);                        

            medico.img =  nombreArchivo;
            await medico.save();
            return true;
        
            break;
         case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro el hospital por id');
                return false;     
            }
            
             pathViejo = `${hospital.img}`;
            borrarImagen(pathViejo);                        

            hospital.img =  nombreArchivo;
            await hospital.save();
            return true;
           break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro el hospital por id');
                return false;     
            }
            
            pathViejo = `${usuario.img}`;
            borrarImagen(pathViejo);                        

            usuario.img =  nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}



module.exports = {
    actualizarImagen
}