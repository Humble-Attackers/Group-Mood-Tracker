// const orm = require('./orm');
const db = require('./connection')('mood_db','rootroot')

function router( app ){
    app.get('/api/notes', async ( req,res ) => {
        const data = await db.query('SELECT * FROM notes')
        res.send(data)
    })

    app.post('/api/notes', async ( req, res ) => {
        await db.query('INSERT INTO notes (emotion, title, note) VALUES (?,?,?)', [req.body.emo, req.body.title, req.body.note])
        res.redirect('/')
    })

    // app.put();

    // app.delete();
}

module.exports = router
