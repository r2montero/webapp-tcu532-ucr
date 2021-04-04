const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Category model
const Category = require('../../models/category');

//@route GET /api/categories
// @description Get all categories
// @access Public
router.get('/', async (req, res) => {
    const categories = await Category.find();
    console.log(categories);
    if (categories.length == 0) {
        res.status(404).json({
            msg: 'No hay ninguna categoría'
        });
    } else {
        res.json(categories);
    }

});

// @route GET /api/categories/:id
// @description Get single category by id
// @access Public
router.get('/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const category = await Category.findById(req.params.id);
        console.log(category);
        if (category === null) {
            res.status(404).json({
                msg: 'No hay ninguna categoría con la identificacion proporcionada'
            });
        } else {
            res.json(category);
        };
    } else {
        res.status(400).json({
            msg: 'Formato de identificacion no valido'
        });
    };

});

// @route POST /api/categories
// @description add new category
// @access Restricted
router.post('/', (req, res) => {
    Category.create(req.body)
        .then(() => res.json({
            msg: 'Categoria agregada correctamente'
        }))
        .catch(err => console.log(err),
            res.status(400)
            .json({
                error: 'No fue posible agregar la categoria'
            }));
});


module.exports = router;