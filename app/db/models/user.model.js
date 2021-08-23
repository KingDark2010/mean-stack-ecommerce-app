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
        required: false
    },
    isAdmin: {
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
    activateTokens: [{
        token: {
            type: String
        }
    }],
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
    //token should be expire after 24 hours
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_ACTIVATE, {expiresIn: '24h'});
    user.activateTokens = user.activateTokens.concat({token});
    await user.save()
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;