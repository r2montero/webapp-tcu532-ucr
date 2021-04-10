/**
 * Section requests routes
 */

 const express = require("express");
 const router = express.Router();
 const controller = require('../api/controllers/section_controller');

 router.get('/', controller.getAll);
 router.get('/:id', controller.getOne);
 router.post('/', controller.create);
 router.put('/:id', controller.update);
 router.put('/addPost/:id', controller.addPost);
 router.put('/removePost/:id', controller.removePost);
 router.delete('/:id', controller.delete);

 module.exports = router;