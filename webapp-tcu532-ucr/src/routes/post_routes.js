/**
 * Post requests routes
 */

const express = require("express");
const router = express.Router();
const { validate } = require('../middlewares/fields_validation');
const controller = require('../api/controllers/post_controller');
const { check } = require("express-validator");
const { jwtValidate } = require('../middlewares/jwt_validation');

router.get('/', controller.getAll);

router.get('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        validate
    ],
    controller.getOne);

router.post(
    '/',
    [ //middlewares
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('text', 'El post no tiene contenido').not().isEmpty(),
        jwtValidate,
        validate
    ],
    controller.create);

router.put('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('text', 'El post no tiene contenido').not().isEmpty(),
        check('published_date', 'La fecha de publicacion es requerida').not().isEmpty(),
        jwtValidate,
        validate
    ], 
    controller.update);

router.put('/addMulti/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        check('name', 'El nombre del archivo multimedias es requerido').not().isEmpty(),
        check('type', 'El tipo del archivo multimedias es requerido').not().isEmpty(),
        check('storage_link', 'El enlace al archivo es requerido').not().isEmpty(),
        jwtValidate,
        validate
    ],
    controller.addMulti);

router.put('/removeMulti/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        check('name', 'El nombre del archivo multimedias es requerido').not().isEmpty(),
        check('type', 'El tipo del archivo multimedias es requerido').not().isEmpty(),
        check('storage_link', 'El enlace al archivo es requerido').not().isEmpty(),
        jwtValidate,
        validate
    ],
    controller.removeMulti);

router.delete('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        jwtValidate,
        validate
    ],
    controller.delete);


module.exports = router;