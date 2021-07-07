const db = require('@app/core/db')
const hash = require('@app/core/hash')

module.exports = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email.trim() || !password.trim()) return res.status(400).json({status: false, error: 'Барлық жолдарды толтырыңыз!'})
        
        const checkUser = (await db.query('SELECT id FROM "user".users WHERE email = $1 AND password = $2', [email, password])).rows
        if(checkUser.length !== 1) return res.status(200).json({status: false, error: 'E-mail немесе құпия сөз сәйкес келмейді!'})

        const token = await createToken(checkUser[0].id, req.connection.remoteAddress)
        if(!token) return res.status(200).json({status: false, error: 'Белгісіз қате!'})
        return res.json({status: true, data: {user_id: checkUser[0].id, token: token}})
    } catch (e) {
        res.status(500).send('500 Internal Server Error')
        console.log(e)
    }
}

const createToken = async (user_id, ip) => {
    const token = hash(128)
    const session = await db.query('INSERT INTO "user".sessions (user_id, token, ip) VALUES ($1, $2, $3)', [user_id, token, ip])
    if(session) return token;
    return false;
}