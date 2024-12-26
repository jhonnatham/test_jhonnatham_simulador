const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const salt = 15
const secretKey = process.env.SECRET_KEY
const expired = '1h'

const generatePassword = async (password) => {
    const hashCode = await new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashCode
}

const validatePassword = async(password, hash) => {
    const validate = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, async (err, result) => {
            if (result) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })

    return validate
}

const generateJWT = async (data) => {
    const token = jwt.sign(data, secretKey, { expiresIn: expired })
    return token
}

const verifyToken = async (token) => {
    const payload = jwt.verify(token, secretKey);
    return payload
}

module.exports = {
    generatePassword,
    validatePassword,
    generateJWT,
    verifyToken
}