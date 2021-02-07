
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const login = async(req,res = response ) =>{

 const { email, password } = req.body;

    try {

         //Verificar email
        const usuarioDB = await  Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Contraseña o email no son validos'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok:false,
                msg:'Email o Contraseña invalidos'
            })
        }

        //Geenrar el TOKEN -- JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Verifiquelo con el admnistrador'
        })
    }

}


module.exports = {
    login
}