/*
Medicos
ruta: '/api/Medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const {        getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico} = require('../controllers/medicos')


const router = Router();

router.get('/',getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser valdo').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put( '/:_id',
    [

    ],
    actualizarMedico
);

router.delete( '/:_id',
    
borrarMedico

    );

module.exports = router;