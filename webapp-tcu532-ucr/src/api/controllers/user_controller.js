/**
 * User controller : All business logic goes here
 */
const user = require('../models/user');

//Create new User
exports.create = (req, res) => {
    /**
     * validation request
     */
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).send({
        message: "Required field can not be empty",
      });
    }
    /**
     * Create a user
     */
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      isActive: req.body.isActive,
      userType: req.body.userType,
    });
    /**
     * Save user to database
     */
    user
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User.",
        });
      });
  };