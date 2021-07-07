const db = require('@app/core/db')
const dateFormat = require('dateformat')

module.exports = async (req, res) => {
    try {
        const query = (await db.query('SELECT posts.id, posts.title, posts.poster, posts.pub_date, (SELECT COUNT(*) FROM "posts".comments WHERE comments.post_id = posts.id) as comments_count FROM "posts".posts ORDER BY posts.id DESC')).rows
        const posts = []
        const monthes = {
            '01': 'Қаңтар',
            '02': 'Ақпан',
            '03': 'Наурыз',
            '04': 'Сәуір',
            '05': 'Мамыр',
            '06': 'Маусым',
            '07': 'Шілде',
            '08': 'Тамыз',
            '09': 'Қыркүйек',
            '10': 'Қазан',
            '11': 'Қараша',
            '12': 'Желтоқсан'
        }
        query.map((post, i) => {
            posts[i] = Object()
            posts[i].id = post.id
            posts[i].title = post.title
            posts[i].comments = post.comments_count
            posts[i].poster = post.poster
            posts[i].pub_date = dateFormat(post.pub_date, 'mm').replace(/^0/, '')

            Object.keys(monthes).map(month => {
                if(month == dateFormat(post.pub_date, 'mm')) {
                    posts[i].pub_date += ' ' + monthes[month]
                }       
            })
        })

        return res.json({status: true, data: posts})
    } catch (e) {
        res.status(500).send('500 Internal Server Error')
        console.log(e)
    }
}