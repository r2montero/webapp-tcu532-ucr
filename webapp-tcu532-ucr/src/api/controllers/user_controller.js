/**
 * User controller : All business logic goes here
 */
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//Create new User
exports.create = async (req, res) => {
  const {
    name,
    role,
    email,
    phone,
    password,
    isActive
  } = req.body;

  /**
   * Validation request
   */
  if (!email || !password || !name) {
    return res.status(400).json({
      msg: 'Uno de los campos obligatorios esta vacio'
    });
  };
  /**
   * Create a user
   */
  const user = new User({
    name,
    role,
    email,
    phone,
    password: bcrypt.hashSync(password, 10),
    isActive,
  });
  /**
   * Save user to database
   */
  user.save((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        msg: 'No fue posible agregar el usuario'
      });
    };
    if (user) {
      res.status(201).json(user);
    };
  });
}

//GET All Users
exports.getAll = async (req, res) => {
  const users = await User.find();
  if (users.length == 0) {
    res.status(404).json({
      msg: 'No hay ningun usuario'
    });
  } else {
    res.status(200).json(users);
  };
}

//GET One User by id
exports.getOne = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        msg: 'No hay ningun usuario con la identificacion proporcionada'
      });
    } else {
      res.status(200).json(user);
    };
  } else {
    res.status(400).json({
      msg: 'Formato de identificacion no valido'
    });
  };
}

//Update User by id
exports.update = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    /**
     * Validation request
     */
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({
        msg: 'Uno de los campos obligatorios esta vacio'
      });
    };

    /**
     * Updating user
     */
    await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, (err, user) => {
      if (!user) {
        return res.status(404).json({
          msg: "Usuario no encontrado"
        });
      };
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: 'No fue posible actualizar el usuario'
        });
      };
      res.status(200).send(user);
    });
  } else {
    return res.status(400).json({
      msg: 'Formato de identificacion no valido'
    })
  };
}

//Delete User by id
exports.delete = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await User.findByIdAndRemove(req.params.id, (err, user) => {
      if (!user) {
        return res.status(404).json({
          msg: "Usuario no encontrado"
        });
      };
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: 'No fue posible actualizar el usuario'
        });
      };
      res.status(200).send(user);
    });
  } else {
    return res.status(400).json({
      msg: 'Formato de identificacion no valido'
    })
  };
}
