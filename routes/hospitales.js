/*
Hopitales
ruta: '/api/hopitales'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const {    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital} = require('../controllers/hospitales')


const router = Router();

router.get('/',getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put( '/:_id',
    [
        
    ],
    actualizarHospital
);

router.delete( '/:_id',
    
borrarHospital

    );

module.exports = router;