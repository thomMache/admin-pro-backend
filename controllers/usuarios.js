const { response } = require('express');
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helper/jwt');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });

}


const crearUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg:'El correo ya se encuentra registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptando contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //Guardar usuario
        await usuario.save();

        //Geenrar el TOKEN -- JWT
       const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar logs'
        })
    }


}

const actualizarUsuario = async (req,res = response) =>{

// TODO:Validar token y comprobar si es el usuario correcto

const uid  = req.params._id;

try {

    const usuarioDB =  await Usuario.findById(uid);

    if ( !usuarioDB ) {
        return res.status(404).json({
            ok:false,
            msg:'No existe un usuario con ese id'
        });
    }

//Actualizando al usuario
const {password,google,email,...campos} = req.body;

if (usuarioDB.email != email) {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        return res.status(400).json({
            ok:false,
            msg: 'Ya existe un usuario con ese email en la bd'
        })
    }
}

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new:true});

    res.json({
        ok:true,
        usuario: usuarioActualizado
    })

} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Error inesperado'
    })
}

}
 
const borrarUsuario = async(req,res= response)=>{
    
    const uid = req.params._id;

    try {

        const usuarioDB =  await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg:'Usuario Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
