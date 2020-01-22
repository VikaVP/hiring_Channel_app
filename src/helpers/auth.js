require('dotenv/config')
const JWT = require('jsonwebtoken')
module.exports = {
  Check: (req, res, next) => {
    const { authorization, username, id } = req.headers
    if (!authorization || !username || !id) {
      return res.status(404).json({
        message: 'Unauthorized'
      })
    }
    const token = authorization.split(' ')[1]
    JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (!decoded) {
        return res.status(403).json({
          message: 'Token undefined', err
        })

      }
      if (err && err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          message: 'Invalid token', err
        })
      }
      if (err && err.name === 'TokenExpiredError') {
        console.log(decoded);

        return res.status(403).json({
          message: 'Expired token', err
        })
      }
      if (username !== decoded.username || parseInt(id) !== decoded.dataId) {
        console.log(decoded);

        return res.status(403).json({
          message: 'Token not valid for selected id/username'
        })
      }
      next()
    })
  }
}
