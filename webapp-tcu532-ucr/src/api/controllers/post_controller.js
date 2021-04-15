/**
 * Post controller : All business logic goes here
 */
const Post = require('../models/post');
const { response } = require("express");
const e = require('express');
require('../models/user');
require('../models/multimedia');

//Create a new Post
exports.create = async (req, res = response) => {
    const { title, subtitle, text, multimedia, user, tags, published_date } = req.body;

    try {
        
        /**
         * Create a Post
         */
        const post = new Post({ title, subtitle, text, multimedia, user, tags, published_date });
        
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
exports.addMulti = async (req, res) => {
    const { status, msg, post }
        = await manageMulti(req.params.id, req.body.multimedia._id, 'Push');
    res.status(status).json({ msg, post });
}

//Remove Multimedia from Post
exports.removeMulti = async (req, res) => {
    const { status, msg, post }
        = await manageMulti(req.params.id, req.body.multimedia._id, 'Pull');
    res.status(status).json({ msg, post });
}


//Internal function to manage multimedia in posts
async function manageMulti(postId, multi, action) {
    let job;
    let msg;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return { status: 404 };
        }

        if (action == 'Push') {
            job = 'agregar';
            section.posts.push(multi);
            msg = 'agregada';
        }
        else {
            job = 'remover'
            section.posts.pull(multi);
            msg = 'eliminada';
        }

        post.populate('multimedia').populate('user');

        return {
            status: 200,
            msg: `Multimedia ${msg} correctamente`,
            post: post
        };

    } catch (error) {
        console.log(error)
        return {
            status: 500,
            msg: `Error al ${job} multimedia del post`,
            post: null
        };
    }

}