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

})

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

})

// @route POST /api/categories
// @description add new category
// @access Restricted
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    await Category.findOne({ name }, async (err, category) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: 'No fue posible agregar la categoria' });
        };
        if (category) {
            res.status(409).json({ msg: 'Categoria ya existe' });
        } else {
            const category = new Category(
                {
                    name,
                    description
                }
            );
            category.save((err, category) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: 'No fue posible agregar la categoria' });
                };
                if (category) {
                    res.status(201).json({ msg: 'Categoria agregada correctamente' });
                };
            });
        };
    });
})

// @route GET api/categories/:id
// @description Update a category
// @access Restricted
router.put('/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const { name, description } = req.body;
        const category = await Category.findById(req.params.id);
        if (category === null) {
            res.status(404).json({
                msg: 'No hay ninguna categoría con la identificacion proporcionada'
            });
        } else {
            const exists = await Category.findOne({ name });
            if (exists) {
                console.log(exists);
                res.status(409).json({ msg: 'Categoria ya existe' });
            } else {
                category.name = name;
                category.description = description;
                category.save((err, category) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ msg: 'No fue posible agregar la categoria' });
                    };
                    if (category) {
                        res.status(200).json({ msg: 'Categoria actualizada correctamente' });
                    };
                });
            }
        };
    } else {
        res.status(400).json({
            msg: 'Formato de identificacion no valido'
        });
    };
})

router.delete('/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Category.findByIdAndRemove(req.params.id, (err, category) => {
            if (!category) {
                res.status(404).json({ msg: 'No existe una categoria con la identificacion proporcionada' });
            }
            if (err) {
                console.log(err);
                res.status(500).json({ msg: 'No fue posible eliminar la categoria' });
            };
            res.status(200).json({ msg: 'Categoria eliminada correctamente' });
        });
    } else {
        res.status(400).json({
            msg: 'Formato de identificacion no valido'
        });
    }
})

module.exports = router;