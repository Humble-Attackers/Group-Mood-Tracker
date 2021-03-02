// const orm = require('./orm');
const db = require('./connection')('mood_db','Password4SQL')

function router( app ){
    // app.get()

    app.post('/api/notes', async ( req, res ) => {
        await db.query('INSERT INTO notes (emotion, title, note) VALUES (?,?,?)', [req.body.emo, req.body.title, req.body.note])
        res.redirect('/')
    })

    app.get(`/api/dates/:range`, async (req, res) => {
        let range = req.params.range
        let desiredData = await db.query(`SELECT * FROM notes WHERE TIMESTAMPDIFF(day,time,CURRENT_TIMESTAMP between 0 and ${range}`) 
        res.send(desiredData)
    })
    // app.put();

    // app.delete();
}

module.exports = router
