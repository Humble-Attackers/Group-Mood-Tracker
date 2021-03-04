const orm = require("./orm");

function router(app) {
  app.get("/api/notes", async (req, res) => {
    const data = await orm.getNotes();

    res.send(data);
  });

  app.get("/api/notes/:id", async function (req, res) {
    const id = req.params.id;
    const notesData = await orm.getOne(id);
    if (notesData.length === 1) {
      console.log(`[GET /api/quotes/${id}] notesData`, notesData);
      res.send(notesData[0]);
    } else {
      res.status(404).end();
    }
  });

  app.get(`/api/dates/:range`, async (req, res) => {
    let range = req.params.range;
    const desiredData = await orm.getDesired(range)

    res.send(desiredData);
  });

  app.post("/api/notes", async (req, res) => {
    const noteData = req.body
    await orm.postNote(noteData.emotion, noteData.title, noteData.note)

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
  
    const data = await orm.getCalendar()
    res.send(data)
  });
}



module.exports = router;
