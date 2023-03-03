const User = require("../../models/client");
const bcrypt = require("bcryptjs");
const fs = require('fs'); 
const jwt = require("jsonwebtoken");
const _ = require("lodash");
//command line to install 
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'ettouils505@gmail.com',    
    pass:'sgyvsyhnwbmvjacs',
  },
});

const UserService = {
  register: async (req, res) => {
    const { username, phone, email, password, passwordVerify, adresse="", avatar="", birthday="", genre=""} = req.body; //name, country, phone, email, password, passwordVerify
    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(400).json({ error: "Email is already taken" });
      }
    });

    if (password !== passwordVerify) {
      return res.status(400).json({ error: "Mismatch password" });
    }
    const token = jwt.sign(
      { username, phone, email, password, passwordVerify },
     `${process.env.JWT_ACC_ACTIVATE}`,
      { expiresIn: "10m" }
    );

    const options = {
      from: 'ettouils505@gmail.com',
      to: email,
      subject: "Account Activation Link",
      html: `
           <div style="max-width: 700px; margin:auto; border: 5px solid #ddd; padding: 50px 20px; font-size: 110%;">
           <h2 style="text-align: center; text-transform: uppercase;color: #FF1717;">Welcome to Ordear.</h2>
           <p>Congratulations! 
               Just click the button below to validate your email address.
           </p>
           
           
           <a href="${process.env.CLIENT_URL}/authenticate/activate/${token}"
              target="_blank"
              style="background: #FF1717; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">
              Verify Your Email Address
           </a>
           
       
           <p>If the button doesn't work for any reason, you can also copy this link below and paste it in the browser:</p>
       
           <a>${process.env.CLIENT_URL}/authenticate/activate/${token}</a>
           </div>
           `,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log("Error in signup while account activation: ", err);
        return res.status(400).json({ error: "Error activating account" });
      } else {
        return res.status(200).json({ message: "An email has been sent" });
      }
    });
  },


  activationAccount: async (req, res) => {
    const { token } = req.body;
    if (token) {
      jwt.verify(
        token,
        `${process.env.JWT_ACC_ACTIVATE}`,
        function (err, decodedToken) {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ error: "Incorrect or Expired link." });
          }
          const { role, avatar, username, phone, email, password } =
            decodedToken;
          User.findOne({ email }).exec(async (err, user) => {
            if (user) {
              return res
                .status(400)
                .json({ error: "User with this email already exists." });
            }
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            console.log(passwordHash);

            let newUser = new User({
              role: "user",
              avatar: "https://image.flaticon.com/icons/png/512/61/61205.png",
              username,              
              phone,
              email,
              password: passwordHash,
            });
            newUser.save((err, success) => {
              if (err) {
                console.log("Error in signup : ", err);
                return res.status(400).json({ error: err });
              } else {
                return res.status(200).json({
                  message: "Signup success",
                });
              }
            });
          });
        }
      );
    } else {
      console.log(err);
      return res.json({ error: "Something went wrong." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      //validate
      if (!email || !password) {
        console.log(err)
        return res
          .status(400)
          .json({ message: "Not all fields have been entered" });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "No account with this email has been founded" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      //Using token for login
      const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`);
      res.json({
        token,
        user: {
          id: user._id,
          //role: user.role,
         // avatar: user.avatar,
          username: user.username,
         // country: user.country,
          phone: user.phone,
          email: user.email,
          //birthday: user.birthday,
         // bio: user.bio,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    User.findOne({ email }).exec((err, user) => {
      if (err || !user) {
        console.log(err);
        return res
          
          .status(400)
          .json({ error: "User with this email does not exists" });
      }
      const token = jwt.sign(
        { _id: user._id },
        `${process.env.RESET_PASSWORD_KEY}`,
        { expiresIn: "10m" }
      );

      const options = {
        from: "ettouils505@gmail.com",
        to: email,
        subject: "Reset password",
        html: `
            <div style="max-width: 700px; margin:auto; border: 5px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: #FF1717;">Welcome to Ordear.</h2>
            <p>Congratulations! 
                Just click the button below to reset your password.
            </p>

            <a href="${process.env.CLIENT_URL}/authenticate/activate/${token}"
              target="_blank"
              style="background: #FF1717; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">
              Reset Your Password
           </a>
            
            <p>${process.env.CLIENT_URL}/authenticate/activate//${token}</p>
            `,
      };
      return user.updateOne({ resetLink: token }, function (err, success) {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: "reset password link error." });
        } else {
          //SEND MAIL HERE
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Sent: " + info.response);
          });
        }
      });
    });
  },

  resetPassword: async (req, res) => {
    const { resetLink, newPass } = req.body;
    if (resetLink) {
      jwt.verify(
        resetLink,
        `${process.env.RESET_PASSWORD_KEY}`,
        function (error, decodedData) {
          if (error) {
            return res.status(401).json({
              error: "Incorrect token or It is expired.",
            });
          }
          User.findOne({ resetLink }, async (err, user) => {
            if (err || !user) {
              return res
                .status(400)
                .json({ error: "User with token does not exists" });
            }

            const salt = await bcrypt.genSalt();
            const passwordHash1 = await bcrypt.hash(newPass, salt);
            console.log(passwordHash1);

            const obj = {
              password: passwordHash1,
              resetLink: "",
            };
            user = _.extend(user, obj);
            user.save((err, result) => {
              if (err) {
                return res.status(400).json({ error: "reset password error" });
              } else {
                return res
                  .status(200)
                  .json({ message: "Your password has been changed." });
              }
            });
          });
        }
      );
    } else {
      return res.status(401).json({ error: "Authentication error." });
    }
  },

  logout: async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Logged out" });
  },

  validateToken: async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //Profile Management

    //Display User Informations
  getInformations : async(req,res)=> {
    const user = await User.findById(req.user);
    res.json({
      id: user?._id,
      avatar : user?.avatar,
      username: user?.username,
      //country: user.country,
      phone: user?.phone,
      email: user?.email,
    })
  },

    //Update User Informations
  updateInformations : async(req,res)=> {
    try {
      let {
        username,
        phone,
        email,
          //bio,
          //birthday
      } = req.body;
      const userUpdate = await User.findById(req.params.id);
      if(!username){
        username= userUpdate.username
    }
      if(!email){
        email= userUpdate.email
    }
      if(!country){
        country= userUpdate.country
      }
      if(!phone){
        phone= userUpdate.phone
      }
     /* if(!birthday){
        birthday= userUpdate.birthday
      }
      if(!bio){
        bio= userUpdate.bio
      }*/
      userUpdate.username = username;
      userUpdate.email = email;
      userUpdate.country = country;
      userUpdate.phone = phone;
      //userUpdate.birthday = birthday;
      //userUpdate.bio = bio;
      await userUpdate.save();
      res.json(
        
        {
          user:{
            id: userUpdate._id,
            //avatar : userUpdate.avatar,
            //role : userUpdate.role,
            username: userUpdate.username,
            //country: userUpdate.country,
            phone: userUpdate.phone,
            email: userUpdate.email,
            //bio: userUpdate.bio,
            //birthday: userUpdate.birthday
          }     
        }
      );
  
    } catch (error) {
      console.log(error);
    }
  },


    //Update User Profile Image
  updateImage: async (req, res) => {
    try {
      let { avatar } = req.body;
      const userUpdate = await User.findById(req.params.id);
      if (!avatar) {
        avatar = userUpdate.avatar;
      }
      userUpdate.avatar = avatar;
      await userUpdate.save();
      res.json({
        user: {
          id: userUpdate.id,
          username: userUpdate.username,
          email: userUpdate.email,
          phone: userUpdate.phone,
          country: userUpdate.country,
          avatar: userUpdate.avatar,
          birthday: userUpdate.birthday,
          bio: userUpdate.bio,
          role: userUpdate.role,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserService;
