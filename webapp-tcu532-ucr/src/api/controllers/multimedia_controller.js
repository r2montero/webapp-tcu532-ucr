/**
 * Multimedia controller : All business logic goes here
 */
const Multimedia = require('../models/multimedia');
const mongoose = require('mongoose');

//Create new Multimedia
exports.create = async (req, res) => {
  const { name, type, storage_link, description, section, user } = req.body;

  /**
  * Validation request
  */
  if (!name || !type || !storage_link || !section || !user) {
    return res.status(400).json({
      ok: false,
      msg: 'Uno de los campos obligatorios esta vacio'
    });
  };

  /**
   * Create Multimedia
   */
  const mm = new Multimedia({ name, type, storage_link, description, section, user });

  /**
   * Save Multimedia to database
   */
  mm.save((err, multi) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: 'No fue posible agregar el usuario'
      });
    };
    if (multi) {
      res.status(201).json({ ok: true, multimedia: multi });
    };
  });
}

//GET All Multimedias
exports.getAll = async (req, res) => {
  const mm = await Multimedia
    .find()
    .sort({ name: 'asc' })
    .populate('user');
  if (mm.length == 0) {
    res.status(404).json({
      ok: false,
      msg: 'No hay ningun archivo aun'
    });
  } else {
    res.status(200).json({ ok: true, multimedia: mm });
  };
}

//GET One Multimedia by id
exports.getOne = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const mm = await User.findById(req.params.id).populate('user');
    if (!mm) {
      res.status(404).json({
        ok: false,
        msg: 'No hay multimedia con la identificacion proporcionada'
      });
    } else {
      res.status(200).json({ ok: true, multimedia: mm });
    };
  } else {
    res.status(400).json({
      ok: false,
      msg: 'Formato de identificacion no valido'
    });
  };
}

//Update Multimedia by id
exports.update = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {

    /**
    * Validation request
    */
    if (!req.body.name || !req.body.type || !req.body.section || !req.body.user || !req.body.storage_link) {
      return res.status(400).json({
        ok: false,
        msg: 'Uno de los campos obligatorios esta vacio'
      });
    };

    /**
     * Updating multimedia
     */
    await Multimedia.findByIdAndUpdate(req.params.id, req.body, { new: true },
      (err, mm) => {
        if (!mm) {
          return res.status(404).json({
            ok: false,
            msg: "Multimedia no encontrado"
          });
        };
        if (err) {
          console.log(err);
          return res.status(500).json({
            ok: false,
            msg: 'No fue posible actualizar multimedia'
          });
        };
        res.status(200).send({ ok: true, multimedia: mm });
      });
  } else {
    return res.status(400).json({
      ok: false,
      msg: 'Formato de identificacion no valido'
    })
  };
}

//Delete Multimedia by id
exports.delete = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await Multimedia.findByIdAndRemove(req.params.id, (err, mm) => {
      if (!mm) {
        return res.status(404).json({
          ok: false,
          msg: "Multimedia no encontrado"
        });
      };
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'No fue posible elinar multimedia'
        });
      };
      res.status(200).send({ ok: true, multimedia: mm });
    });
  } else {
    return res.status(400).json({
      ok: false,
      msg: 'Formato de identificacion no valido'
    })
  };
}