const express = require('express')
const router  = express.Router()
const db = require('@app/core/db')

router.post('/auth', require('../controllers/account/auth'))
router.post('/login', require('../controllers/account/login'))

// middleware start
router.use(async (req, res, next) => {
    try {
        const {token} = req.body
        const user = (await db.query('SELECT * FROM "user".sessions WHERE token = $1', [token])).rows

        if(user.length === 0) return res.status(403).json({status: false, description: '403 Forbidden'})

        global.global_user_id = user[0].user_id
        return next()
    } catch (e) {   
        return res.status(500).json({status: false, description: '500 Internal Server Error'})
    }
})
// middleware end

router.post('/get/:id', require('@app/controllers/account/get'))

module.exports = router;