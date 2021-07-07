const db = require('@app/core/db')
const fs = require('fs')

module.exports = async (req, res) => {
    try {
        const {id} = req.params || global_user_id;
        const user = (await db.query('SELECT * FROM "user".users WHERE id = $1', [id])).rows[0]
        const data = {};

        data.id = user.id;
        data.first_name = user.first_name;
        data.last_name = user.last_name;
        data.email = user.email;
        data.avatar = '/images/users/null.jpg';

        if(fs.existsSync('public/images/users/' + user.id + '.jpg')) {
            data.avatar = '/images/users/' + user.id + '.jpg';
        }
        return res.json({status: true, data: data});
    } catch (e) {
        res.status(500).send('500 Internal Server Error')
        console.log(e)
    }
}