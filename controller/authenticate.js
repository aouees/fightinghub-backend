const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user')
const secretKey = '0991238772MM';

async function login(req, res) {
  const { username_Email, password } = req.body;
  try {
    let user;
    if (username_Email.includes('@')) {
      user = await UserModel.findOne({ email: username_Email });
    }
    else {
      console.log("hhhh");
      user = await UserModel.findOne({ username: username_Email });
    }
    if (!user) {
      return res.status(401).json({ login: '0' });
    }
    var passwordMatch;
    passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ login: '0' });
    }
    const token = jwt.sign({ userId: user._id, username_Email }, secretKey, { expiresIn: '315360000' });
    res.status(200).json({ token, login: '1' });
  } catch (error) {

    res.status(500).json({ error: 'Error authenticating user : '+error });
  }
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied: Token is missing' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Access denied: Token is not valid' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = {
  login,
  authenticateToken
}