const {path} = require('path');
const { fs } = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helper/actualizar-imagen");



const fileUpload = ( req,res = response ) =>{


    const tipo = req.params.tipo;
    const id   = req.params.id;

    //validar tipo
    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];

    if(!tipoValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg:'No es un medico, usuario u hospital (tipo)'
        });
    }

    //Validar que existe un archivo a subir
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({
            ok:false,
            msg:'No hay ningun archivo a subir'
        })
    }

    //Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];


    //Validar Extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if ( !extensionesValidas.includes(extensionArchivo) ) {
        return res.json({
            ok:false,
            msg:'No es una extensión permmitida'
        })
    }


    //Generar le nombre del archivo
    const nombreArchivo  = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //Moviendo la imagen
    file.mv(path, (err) => {
        if (err){
            console.log(err);
          return res.status(500).json({
              ok:false,
              msg:'Error al mover la imagen'
          })
        }
    
        //Actualizar base de datos
        actualizarImagen( tipo, id, path, nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
      });

}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;
    
    //const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }` );
  
    //Imagen por defecto
    if (fs.existsSync(pathImg)) {
 
        res.sendFile(pathImg);
   
     } else {
   
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
   
     }
    
   
}


module.exports = {
    fileUpload,
    retornaImagen
}