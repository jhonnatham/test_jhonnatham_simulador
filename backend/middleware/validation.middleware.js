const security = require('../utils/security.util.js')

const nonSecurePaths = [
    '/api/users/validate',
    '/api/users/create',
]

const validateToken = async (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()

    const jwtToken = req.header('authorization') || ""

    if (!jwtToken) return res.status(401).end('Invalid Access')

    try {
        const payload = await security.verifyToken(jwtToken)
        res.user = payload
        next()
    } catch (e) {
        console.error(e.message)
        return res.status(401).send('Invalid Access')
    }
}

module.exports = validateToken