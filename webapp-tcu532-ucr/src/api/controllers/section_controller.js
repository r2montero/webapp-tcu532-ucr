/**
 * Section controller : All business logic goes here
 */
const Section = require('../models/section');

//Create a new Section
exports.create = async (req, res) => {
    const { name, description,} = req.body;

    /**
   * Validation request
   */
  if (!name) {
    return res.status(400).json({
      msg: 'El campo nombre es requerido'
    });
  };

  /**
   * Create a Section
   */
  const section = new Section({name, description, posts:[]});
}

//GET All Sections
exports.getAll = async (req, res) => {
    Section.find()
        .populate('posts')
        .exec((err, sections) => {
            if (err) {
                console.log(err);
            };
            if (sections.length == 0) {
                res.status(404).json({
                    msg: 'No hay ninguna seccion'
                });
            } else {
                res.status(200).json(sections);
            };
        });
}

//GET One Section by id
exports.getOne = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Section.findById(req.params.id)
            .populate('posts')
            .exec((err, section) => {
                if (err) {
                    console.log(err);
                };
                if (!section) {
                    res.status(404).json({
                        msg: 'No hay ninguna seccion con la identificacion proporcionada'
                    });
                } else {
                    res.status(200).json(section);
                };
            });
    } else {
        res.status(400).json({
            msg: 'Formato de identificacion no valido'
        });
    };
}