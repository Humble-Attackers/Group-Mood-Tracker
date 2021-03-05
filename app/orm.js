const db = require( './connection' )(process.env.DB_NAME,process.env.DB_PWD)



function getNotes( username ){
    return db.query(`SELECT notes.emotion, notes.title, notes.note FROM notes LEFT JOIN userSchema ON userSchema_username = userSchema.${username};`)
}

function getOne( id='' ){
    return db.query( "SELECT * FROM notes"+( id ? ` WHERE id='${id}'` : '' ) )
}

function getDesired( range ){
    return db.query(`SELECT * FROM notes WHERE TIMESTAMPDIFF(day,time,CURRENT_TIMESTAMP) between 0 and ${range}`)
}

function signup( username, hash ){
    return db.query('INSERT INTO userSchema (username, password) VALUES (?,?)', [username, hash])
}

function postNote( emotion, title, note ){
    return db.query('INSERT INTO notes (emotion, title, note) VALUES (?,?,?)',
    [emotion, title, note])
}

function updateNote( emotion, title, note, id ){
    return db.query( `UPDATE notes SET emotion=?,title=?,note=? WHERE id=?`, 
    [emotion, title, note, id] )
}

function deleteNote( id ){
    return db.query( `DELETE FROM notes WHERE id='${id}'`)
}

module.exports = { getNotes, getOne, getDesired, signup, postNote, updateNote, deleteNote }