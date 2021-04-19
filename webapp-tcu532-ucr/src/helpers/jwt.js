const jwt = require('jsonwebtoken');

const jwtGen = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(
            payload, 
            process.env.JWT_SEED, 
            { expiresIn: '4h'},
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error al generar el token');
                }

                resolve(token);
            });
    });
}

module.exports = jwtGen;