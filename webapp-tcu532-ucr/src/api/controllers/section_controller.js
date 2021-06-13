/**
 * Section controller : All business logic goes here
 */
require('../models/post');
const Section = require('../models/section');
const mongoose = require('mongoose');

//Create a new Section
exports.create = async (req, res) => {
    const { name, description, user } = req.body;

    /**
   * Validation request
   */
    if (!name) {
        return res.status(400).json({
            ok: false,
            msg: 'El campo nombre es requerido'
        });
    };

    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: 'El id del usuario es requerido'
        });
    };

    /**
     * Create a Section
     */
    const section = new Section({ name, description, user });

    /**
    * Save section to database
    */
    section.save((err, section) => {
        if (err) {
            console.log(err);
            if (err.message.indexOf("11000") != -1) {
                return res.status(400).json({
                    ok: false,
                    msg: `El nombre ${name} ya está asignado a otra sección`
                });
            }
            return res.status(500).json({
                msg: 'No fue posible agregar la sección'
            });
        };
        if (section) {
            return res.status(201).json({ ok: true, section });
        };
    });

}

//GET All Sections
exports.getAll = async (req, res) => {
    Section.find()
        .sort({ name: 'asc' })
        .populate('user')
        .exec((err, sections) => {
            if (err) {
                console.log(err);
            };
            if (sections.length == 0) {
                res.status(404).json({
                    ok: false,
                    msg: 'No hay ninguna seccion'
                });
            } else {
                res.status(200).json({ ok: true, sections });
            };
        });
}

//GET One Section by id
exports.getOne = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            ok: false,
            msg: 'Formato de identificacion no valido'
        });
    } else {
        const result = findSection(req.params.id);
        if ((await result).status == 200) {
            res.status(200).json({ ok: true, section: ((await result).section) });
        }
        if ((await result).status == 404) {
            res.status(404).json({
                ok: false,
                msg: 'No hay ninguna seccion con la identificacion proporcionada'
            });
        }
        if ((await result).status == 500) {
            res.status(500).json({
                ok: false,
                msg: 'Sucedio un error al buscar la seccion'
            });
        }
    };
}

//Update Section by id
exports.update = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            ok: false,
            msg: 'Formato de identificacion no valido'
        });
    };

    /**
     * Validation request
     */
    if (!req.body.name) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre es obligatorio'
        });
    };

    /**
     * Updating Section
     */
    await Section.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, section) => {
        if (!section) {
            return res.status(404).json({
                ok: false,
                msg: "Seccion no encontrada con la identificacion proporcionada"
            });
        };
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'No fue posible actualizar la seccion'
            });
        };
        res.status(200).json({ ok: true, section });
    });
}

//Delete Section by id
exports.delete = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            ok: false,
            msg: 'Formato de identificacion no valido'
        });
    };

    await Section.findByIdAndRemove(req.params.id, (err, section) => {
        if (!section) {
            return res.status(404).json({
                msg: "No hay secciones con la identificacion proporcionada"
            });
        };
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'No fue posible eliminar el usuario'
            });
        };
        res.status(200).json({ ok: true, section });
    });
}

//Add a Post to a Section
// exports.addPost = async (req, res) => {
//     const { status, msg, section } = await managePost(req.params.id, req.body, 'Push');

//     if (status == 200) {
//         return res.status(200).json({ ok: true, section });
//     }
//     else {
//         res.status(status).json({ ok: false, msg });
//     }
// }

//Remove a Post from Section
// exports.removePost = async (req, res) => {
//     const { status, msg, section } = await managePost(req.params.id, req.body, 'Pull');

//     if (status == 200) {
//         return res.status(200).json({ ok: true, section });
//     }
//     else {
//         res.status(status).json({ ok: false, msg });
//     }
// }

//Internal function to find section by id
async function findSection(id) {
    try {
        const section = await (await Section.findById(id)).populate('user');
        if (!section) {
            return { status: 404 };
        } else {
            return { status: 200, Section: section };
        }
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
}

//Internal function to manage section's posts
// async function managePost(sectionId, post, action) {
//     if (!mongoose.Types.ObjectId.isValid(sectionId)) {
//         return {
//             status: 400,
//             msg: 'Formato de identificacion no valido',
//             section
//         };
//     };

//     const result = await findSection(sectionId);
//     if (result.status == 200) {
//         let section = result.section;

//         if (action == 'Push') {
//             section.posts.push(post);
//         }
//         else {
//             section.posts.pull(post);
//         }

//         await section.save();
//         return { status: 200, msg: 'Ok', section };
//     }
//     if (result.status == 404) {
//         return {
//             status: 404,
//             msg: 'No hay ninguna seccion con la identificacion proporcionada',
//             section
//         };
//     }
//     if (result.status == 500) {
//         return {
//             status: 500,
//             msg: 'Sucedio un error al buscar la seccion',
//             section
//         };
//     }
// }