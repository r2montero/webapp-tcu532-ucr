const { request, response } = require('express');
const { validationResult } = require("express-validator");

const validate = (req = request, res = response, next) => {
    //Errors management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
}

module.exports = validate;