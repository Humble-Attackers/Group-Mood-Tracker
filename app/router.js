const orm = require("./orm");
const bcrypt = require('bcrypt');
require( 'dotenv' ).config()
const db = require( './connection' )(process.env.DB_NAME,process.env.DB_PWD)



function router(app) {
  app.get("/api/notes", async (req, res) => {
    const thing = req.headers.session
    const data = await orm.getNotes(thing);

    res.send(data);
  });

  app.get("/api/notes/:id", async function (req, res) {
    const id = req.params.id;
    const notesData = await orm.getOne(id);
    if (notesData.length === 1) {
      res.send(notesData[0]);
    } else {
      res.status(404).end();
    }
  });

  app.get(`/api/dates/:range`, async (req, res) => {
    let range = req.params.range;
    let username = req.headers.session
    const desiredData = await orm.getDesired( username, range )

    res.send(desiredData);
  });

//user sign-up
app.post('/signup', async (req,res) => {
const pass = req.body.password
const name = req.body.username
const data = await db.query(`SELECT * FROM userSchema WHERE username = '${name}'`)
  if ( data.length < 1 ){
    if ( pass.length > 3 && name.length > 2 ){
      await bcrypt.hash(pass, 10, async (err,hash) => {
          if (err) {
              return res.status(500).json({
                  error: err
              })
          } else {
              await orm.signup(req.body.username, hash)
          }
      })
      res.send( { message: "Signup successful!"} );
    } else if ( pass.length < 4 ){
      res.status(401).json('Too short!')
    } else if ( name.length < 3 ){
      res.status(401).json('3 or more!')
    }
  } else {
    return res.status(401).json('Already taken!')
  }
})


//user sign-in
app.post('/login', async ( req, res ) => {
  const data = await db.query(`SELECT * FROM userSchema WHERE username = '${req.body.username}'`)

    if (data.length < 1){
      return res.status(401).json('No such being!')
    }
    
    bcrypt.compare(req.body.password, data[0].password, (err,result) => {
      if (result) { console.log('Success')
                    console.log(req.body.username)
                    res.send({message:'Auth successful!'})
      } else {
        return res.status(401).json('Try again!')
      }
    })
  })


  app.post("/api/notes", async (req, res) => {
    const noteData = req.body
    await orm.postNote( noteData.emotion, noteData.title, noteData.note, noteData.username )

    res.send({ message: "Note Saved!" });
  });

  app.put("/api/notes/:id", async (req, res) => {
    const noteData = req.body;
    const id = req.params.id;
    await orm.updateNote(noteData.emotion, noteData.title, noteData.note, id);

    res.send({ message: "Note Updated!" });
  });

  app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    await orm.deleteNote(id);

    res.send({ message: `Delete ${id}` });
  });

  app.get(`/api/calendar`, async (req, res) => {
    const username = req.headers.session
    const data = await orm.getCalendar( username )
    res.send(data)
  });

  // app.get(`/api/list/:date`, async (req, res) => {
  //   const username = req.headers.session
  //   const date = req.params.date
  //   const data = await orm.getDateData( username, date )
  //   res.send(data)
  // })
}



module.exports = router;
