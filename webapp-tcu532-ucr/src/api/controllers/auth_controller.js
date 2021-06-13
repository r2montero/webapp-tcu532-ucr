const { request, response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwtGen = require('../../helpers/jwt');


//User login / authentication
login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        /**
         * request validation (user must exists)
         */
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json(
                    {
                        ok: false,
                        msg: `El correo o la contraseña no son válidos`
                    });
        };

        /**
         * password match validation
         */
        const validPass = bcrypt.compareSync(password, user.password);

        if (!validPass) {
            return res
                .status(400)
                .json(
                    {
                        ok: false,
                        msg: `La contraseña o el correo no son válidos`
                    });
        }

        /**
         * jwt generation
         */
        const token = await jwtGen(user.id, user.name);

        /**
         * Send response
         */
        res
            .status(200)
            .json(
                {
                    ok: true,
                    uid: user.id,
                    name: user.name,
                    token,
                });

    } catch (error) {
        res
            .status(500)
            .json(
                { ok: false, msg: 'Error al autenticar el usuario' }
            );
    }
}

//User token renewal
tknRenew = async (req = request, res = response) => {
    const { uid, name } = req;

    /**
       * jwt generation
       */
    const token = await jwtGen(uid, name);

    /**
     * Send response
     */
    res
        .status(200)
        .json(
            {
                ok: true,
                uid,
                name,
                token,
            });
}

module.exports = {
    login,
    tknRenew
}