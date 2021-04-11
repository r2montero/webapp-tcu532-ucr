/**
 * Post requests routes
 */

const express = require("express");
const router = express.Router();
const validate = require('../middlewares/fields_validation')
const controller = require('../api/controllers/post_controller');
const { check } = require("express-validator");

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
        check('published_date', 'La fecha de publicacion es requerida').not().isEmpty(),
        validate
    ],
    controller.create);

router.put('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('text', 'El post no tiene contenido').not().isEmpty(),
        check('published_date', 'La fecha de publicacion es requerida').not().isEmpty(),
        validate
    ], controller.update);

//router.put('/addPost/:id', controller.addPost);

//router.put('/removePost/:id', controller.removePost);

router.delete('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        validate
    ], controller.delete);

module.exports = router;