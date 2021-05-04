/**
 * Multimedia requests routes
 */
const express = require("express");
const router = express.Router();
const controller = require('../api/controllers/multimedia_controller');
const { check } = require("express-validator");
const { validate } = require('../middlewares/fields_validation');
const { jwtValidate } = require('../middlewares/jwt_validation');

router.get('/', controller.getAll);

router.get('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        validate
    ], controller.getOne);

router.post('/',
    [ //middlewares
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('type', 'El tipo es requerido').not().isEmpty(),
        check('storage_link', 'El link de almacenamiento es requerido').not().isEmpty(),
        jwtValidate,
        validate
    ],
    controller.create);

router.put('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('type', 'El tipo es requerido').not().isEmpty(),
        check('storage_link', 'El link de almacenamiento es requerido').not().isEmpty(),
        jwtValidate,
        validate
    ],
    controller.update);

router.delete('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        jwtValidate,
        validate
    ],
    controller.delete);

module.exports = router;