//require mongooose
const mongoose = require('mongoose');
//require bcrypt
const bcrypt = require('bcryptjs');
//require jwt
const jwt = require('jsonwebtoken');
//require validator
const validator = require('validator');

//create schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 9,
        match: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    addressess: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    phone: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) {
                throw new Error('only Egyptian numbers are accepted');
            }
        }
    },
    gender: {
        type: Boolean, // 0 male, 1 female
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    activateToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

//create user model


//pre save password hash before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//user login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

//generate token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token;
};

//generate activation token 
userSchema.methods.generateActivationToken = async function () {
    const user = this;
    //generate token that is valid for 24h
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_ACTIVATE, { expiresIn: '24h' });
    user.activateToken = token;
    await user.save();
    return token;
};

// check if activationtoken expirded
userSchema.methods.activateTokenExpired = async function () {
    const user = this;
    const token = user.activateToken;
    if (!token) {
        return true;
    }
    const decoded =  jwt.decode(token, process.env.JWT_SECRET_ACTIVATE);
    console.log(decoded.exp <= parseInt(Date.now() / 1000))
    if (decoded.exp <= parseInt(Date.now() / 1000)) {
        return true;
    }
    return false;
};

//generate deactivate token
userSchema.methods.generateDeactivateToken = async function () {
    const user = this;
    //generate token that is valid for 24h
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_DEACTIVATE, { expiresIn: '24h' });
    user.deactivateToken = token;
    await user.save();
    return token;
};

// check if deactivate token expired
userSchema.methods.deactivateTokenExpired = async function () {
    const user = this;
    const token = user.deactivateToken;
    if (!token) {
        return true;
    }
    const decoded =  jwt.decode(token, process.env.JWT_SECRET_DEACTIVATE);
    console.log(decoded.exp <= parseInt(Date.now() / 1000))
    if (decoded.exp <= parseInt(Date.now() / 1000)) {
        return true;
    }
    return false;
};

//deactivate user
userSchema.methods.deactivate = async function () {
    const user = this;
    user.isActive = false;
    await user.save();
};

//activate user 
userSchema.methods.activate = async function () {
    const user = this;
    user.isActive = true;
    user.activateToken = null;
    await user.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
