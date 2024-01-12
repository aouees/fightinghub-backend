const OTP = require('../static/otp')
const OTP_Model = require('../model/otp')
const bcrypt = require('bcrypt');
const UserModel = require('../model/user')

async function singup(req, res) {
  const { email } = req.body;
  try {
    const otp = OTP.generateOTP();
    OTP.sendOTP(email, otp);
    const Newuser = new OTP_Model({
      email: email,
      OTP: otp,
    });
    await Newuser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error registering user' });
  }
}

async function verify(req, res) {
  let { username, email, password, otp } = req.body;
  try {
    if (!username || !otp || !email || !password) {
      return res.status(400).json({ message: 'Input problem' });
    }
    let OTP_inDB = await OTP_Model.findOne({ email })
    if (!OTP_inDB) {
      return res.status(401).json({ register: '0' });
    }
    if (OTP_inDB.OTP == otp) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      await OTP_Model.deleteOne({email})
      return res.status(201).json({ message: 'User registered successfully' });
    }
    throw new Error("OTP not Correct")

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error registering user' });
  }

}

async function setImage(req,res){
  u=await UserModel.findOne({email:req.query.email})
  u.imageURL=req.file.filename
  await u.save()
  res.status(201).json({ message: 'User update image successfully' });
}
module.exports = {
  singup, verify,setImage
}