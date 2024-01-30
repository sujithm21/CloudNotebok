const express = require("express")
const router = express.Router()
var fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator")

// Ropute:1 Get all the notes using : GET "/api/notes/fetchallnotes" .Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Ropute:2 Add a new note using : POST "/api/notes/addnote" .Login required
router.post("/addnote",fetchuser,[
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description","Description must be atleast 5 characters").isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body

            //If there are errors, return Bad Request and errors
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            })
            const savednote = await note.save()
            res.json(savednote)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }
    },
)

// Ropute:3 Updating a note using : PUT "/api/notes/updatenote" .Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        
    
    // Creating a new note object to use it for updating
    const newnote = {};
    if (title) { newnote.title = title; }
    if (description) { newnote.description = description; }
    if (tag) { newnote.tag = tag; }

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(403).send("Unauthorized");
    }

    // Update the note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json({ note });

} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error")
}
});


// Route:4 Deleting a note using : DELETE "/api/notes/deletenote" .Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    //Find note to be deleted
    try {
        
    
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found");
    }

    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed!");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send({"success" : "Note has been deleted", note:note})}
    catch (error) {
        console.log(error.message)
            res.status(500).send("Internal server error")
    }
})  

module.exports = router
