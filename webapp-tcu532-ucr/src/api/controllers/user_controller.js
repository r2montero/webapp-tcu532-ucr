/**
 * User controller : All business logic goes here
 */
const { request, response } = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwtGen = require('../../helpers/jwt');

//Create new User
create = async (req = request, res = response) => {

  const {
    email,
    password
  } = req.body;

  try {

    /**
     * request validation
     */
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json(
          {
            ok: false,
            msg: `el email ${email} ya existe`
          });
    };

    /**
     * Create a user / register
     */
    user = new User(req.body);

    /**
     * Encrypt password
     */
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    /**
     * Save user to database
     */
    await user.save();

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
          user,
          token,
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'No se pudo crear el usuario' });
  }
}

//GET All Users
getAll = async (req = request, res = response) => {
  const users = await User.find();
  if (users.length == 0) {
    res.status(404).json({
      ok: false,
      msg: 'No hay ningun usuario'
    });
  } else {
    res.status(200).json({ ok: true, users });
  };
}

//GET One User by id
getOne = async (req = request, res = response) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        ok: false,
        msg: 'No hay ningun usuario con la identificacion proporcionada'
      });
    } else {
      res.status(200).json({ ok: true, user });
    };
  } else {
    res.status(400).json({
      ok: false,
      msg: 'Formato de identificacion no valido'
    });
  };
}

//Update User by id
update = async (req = request, res = response) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    /**
     * Validation request
     */
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({
        ok: false,
        msg: 'Uno de los campos obligatorios esta vacio'
      });
    };

    /**
     * Updating user
     */
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado"
        });
      };
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'No fue posible actualizar el usuario'
        });
      };
      res.status(200).send({ ok: false, user });
    });
  } else {
    return res.status(400).json({
      ok: false,
      msg: 'Formato de identificacion no valido'
    })
  };
}

//Delete User by id
remove = async (req = request, res = response) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await User.findByIdAndRemove(req.params.id, (err, user) => {
      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado"
        });
      };
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'No fue posible eliminar el usuario'
        });
      };
      res.status(200).send(user);
    });
  } else {
    return res.status(400).json({
      ok: false,
      msg: 'Formato de identificacion no valido'
    })
  };
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
}