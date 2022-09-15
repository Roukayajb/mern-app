const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]

    }
});

//check if password field has been modified
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

// If the pw has been modified, then encrypt it again before save
userSchema.methods.comparePasswords = function (password) {
    console.log(this.password, password);
    return new Promise((resolve, reject) => {

        bcrypt.compare(password, this.password, (err, isMatch) => {
            console.log(isMatch);
            if (err) return reject(err);
            if (!isMatch) return reject(false);

            return resolve(true);
        })
    })
}

mongoose.model('User', userSchema);