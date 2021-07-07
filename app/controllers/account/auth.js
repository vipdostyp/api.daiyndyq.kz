const db = require('@app/core/db');

module.exports = async (req, res) => {
    try {
        const {user_id, token} = req.body

        if(!user_id || !token.trim()) return res.status(400).json({status: false, error: 'Bad request'})

        const checkToken = (await db.query('SELECT id FROM "user".sessions WHERE user_id = $1 AND token = $2', [user_id, token])).rows
        if(checkToken.length === 1) return res.json({status: true})

        return res.json({status: false})
    } catch (e) {
        res.status(500).send('500 Internal Server Error')
        console.log(e)
    }
}