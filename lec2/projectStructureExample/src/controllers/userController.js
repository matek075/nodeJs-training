const userModel = require('../models/userModel');

const userController = {
  getAllUsers: (req, res) => {
    const users = userModel.getAllUsers();
    res.status(200).json(users);
  },
  createUser: (req, res) => {
    const newUser = userModel.createUser(req.body);
    res.status(201).json(newUser);
  }
};

module.exports = userController;