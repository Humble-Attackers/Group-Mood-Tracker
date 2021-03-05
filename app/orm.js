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

function getCalendar(){
    return db.query("SELECT emotion, DATE(time) FROM  notes ORDER BY DATE(time) ASC")
}
function getDateData(date){
    return db.query(`Select * from notes where DATE(time) = "${date}"`)
}

module.exports = { getNotes, getOne, getDesired, postNote, updateNote, deleteNote, getCalendar, getDateData }