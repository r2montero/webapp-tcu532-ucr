const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidate = (req = request, res = response, next) => {
    //x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res
            .status(401)
            .json({
                ok: false,
                msg: 'Peticion sin token',
            });
    }

    try {
        
        const payload = jwt.verify(token, process.env.JWT_SEED);

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res
            .status(401)
            .json({
                ok: false,
                msg: 'El token no es valido',
            });
    }

    next();
}

module.exports = { jwtValidate };