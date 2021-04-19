/**
 * User requests routes
 * Host + /api/usuarios
 */
const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { create, getAll, getOne, login, remove, tknRenew, update } = require('../api/controllers/user_controller');
const { validate, validId } = require('../middlewares/fields_validation')

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/tknrenew', tknRenew);

router.post(
    '/nuevo',
    [ //middlewares
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo es requerido').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6} ),
        validate,
    ],
    create);

router.post('/', login);

router.put(
    '/:id',
    [ //middlewares
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validate,
        validId,
    ],
    update);

router.delete('/:id', remove);

module.exports = router;