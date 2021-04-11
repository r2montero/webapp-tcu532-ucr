/**
 * Post controller : All business logic goes here
 */
const Post = require('../models/post');
const { response } = require("express");
require('../models/user');
require('../models/multimedia');

//Create a new Post
exports.create = async (req, res = response) => {
    const { title, subtitle, text, multimedia, user, tags, published_date } = req.body;

    if (!multimedia) {
        multimedia = [];
    }

    if (!tags) {
        tags = [];
    }

    /**
     * Create a Post
     */
    const post = new Post({ title, subtitle, text, multimedia, user, tags, published_date });

    try {
        /**
        * Save post to database
        */
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'No se pudo crear el post' });
    }
}

//GET All Posts
exports.getAll = async (req, res = response) => {
    try {
        posts = await Post.find()
            .sort({ published_date: 'asc' })
            .populate('user')
            .populate('multimedia');

        if (!posts) {
            res.status(404).json({
                msg: 'No hay ningun post registrado'
            });
        }
        else {
            res.status(200).json(posts);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener los posts' });
    }
}

//GET One Post by id
exports.getOne = async (req, res = response) => {
    try {
        post = await Post
            .findById(req.params.id)
            .populate('user')
            .populate('multimedia');

        if (!post) {
            res.status(404).json({
                msg: 'No hay ningun post registrado con la identificacion proporcionada'
            });
        }
        else {
            res.status(200).json(post);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: `Error al obtener el post ${req.params.id}` });
    }
}

//Update Post by id
exports.update = async (req, res = response) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({
                msg: "Post no encontrado con la identificacion proporcionada"
            });
        };
        res.status(200).send(post);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: `Error al actualizar el post ${req.params.id}` });
    }
}

//Delete Post by id
exports.delete = async (req, res = response) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({
                msg: "Post no encontrado con la identificacion proporcionada"
            });
        };
        res.status(200).send(post);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: `Error al eliminar el post ${req.params.id}` });
    }
}

//Add Multimedia to a Post

//Remove Multimedia from Post