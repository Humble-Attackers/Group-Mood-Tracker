// an external npm package we are using

const db = require( './connection' )(process.env.DB_NAME,process.env.DB_PWD)

function getNotes(){
    return db.query('SELECT * FROM notes')
}

function getOne( id='' ){
    return db.query( "SELECT * FROM notes"+( id ? ` WHERE id='${id}'` : '' ) )
}

function getDesired( range ){
    return db.query(`SELECT * FROM notes WHERE TIMESTAMPDIFF(day,time,CURRENT_TIMESTAMP) between 0 and ${range}`)
}

function postNote( emo, title, note ){
    return db.query('INSERT INTO notes (emotion, title, note) VALUES (?,?,?)',
    [emo, title, note,])
}

function updateNote( emotion, title, note, id ){
    return db.query( `UPDATE notes SET emotion=?,title=?,note=? WHERE id=?`, 
    [emotion, title, note, id] )
}

function deleteNote( id ){
    return db.query( `DELETE FROM notes WHERE id='${id}'`)
}

module.exports = { getNotes, getOne, getDesired, postNote, updateNote, deleteNote }