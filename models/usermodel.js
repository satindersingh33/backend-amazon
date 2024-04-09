// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
      },
   email :{
    type :String,
    required :true,
    //  unique: true,
   },
   passwordHash: {
    type:String,
    required:true
   }
});
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
