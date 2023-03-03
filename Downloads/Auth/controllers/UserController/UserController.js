const userService = require("../../services/UserServices/UserService");

const UserController = {

  register_controller: async (req, res) => {
    userService.register(req, res);
  },

  validationAccount_controller: async (req, res) => {
    userService.activationAccount(req, res);
  },

  login_controller: async (req, res) => {
    userService.login(req, res);
  },

  forgotPassword_controller: async (req, res) => {
    userService.forgotPassword(req, res);
  },

  resetPassword_controller: async (req, res) => {
    userService.resetPassword(req, res);
  },

  logout_controller: async (req, res) => {
    userService.logout(req, res);
  },

  isValidateToken_controller: async (req, res) => {
    userService.validateToken(req, res);
  },

  //Profile
  getUser_controller : async(req,res)=> {
    userService.getInformations(req,res);
  },

  updateUser_controller : async(req,res)=> {
    userService.updateInformations(req,res);
  },

  updateImage_controller : async(req,res)=> {
    userService.updateImage(req,res);
  }
};

module.exports = UserController;
