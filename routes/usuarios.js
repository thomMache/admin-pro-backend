/*
Ruta:/api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario,borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

router.get('/', validarJWT,getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.put( '/:_id',
    [
       // validarJWT,
        //varlidarADMIN_ROLE_o_MismoUsuario,
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
        
    ],
    actualizarUsuario
);

router.delete( '/:_id',
validarJWT,
    borrarUsuario

    );

module.exports = router;