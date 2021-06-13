/**
 * User requests routes
 * Host + /api/usuarios
 */
const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { create, getAll, getOne, remove, update } = require('../api/controllers/user_controller');
const { validate } = require('../middlewares/fields_validation');
const { jwtValidate } = require('../middlewares/jwt_validation');

router.get('/', getAll);

router.get('/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        validate
    ], getOne);

router.post(
    '/nuevo',
    [ //middlewares
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo es requerido').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        jwtValidate,
        validate,
    ],
    create);

router.put(
    '/:id',
    [ //middlewares
        check('id', 'Formato de identificacion no valido').isMongoId(),
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        jwtValidate,
        validate,
    ],
    update);

router.delete('/:id', jwtValidate, remove);

module.exports = router;