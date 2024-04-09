
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
 //signup
 
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request body:', req.body);


    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the password matches
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error('Error occurred during login:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
 //verify
// exports.verifyPhoneNumber = async (req, res) => {
    
    
// };


 //register
exports.registerUser = async (req, res) => {
    console.log(req.body); // Check the request body in the console
    const { name, email, password, phoneNumber } = req.body;
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ message: 'Email already exists. Please try a  different one.' });
         }
    
         const newUser = new User({ name, email, password ,phoneNumber});
       await newUser.save();
         res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'sadasdasdasd' });
    }
}
//     const {  name,email, password, phoneNumber } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already exists. Please try a  different one.' });
//         }
    
//         const newUser = new User({ name, email, password ,phoneNumber});
//         await newUser.save();
//         res.status(201).json({ message: 'User signed up successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }


// updatepassword
exports.updatePassword = async (req, res) => {
    const { userId } = req.params; 
    const { oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };