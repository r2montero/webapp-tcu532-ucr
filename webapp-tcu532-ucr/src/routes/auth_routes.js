const express = require("express");
const router = express.Router();
const { login, tknRenew } = require("../api/controllers/auth_controller");
const { jwtValidate } = require('../middlewares/jwt_validation');

router.get('/renew', jwtValidate, tknRenew);

router.post('/', login);

module.exports = router;