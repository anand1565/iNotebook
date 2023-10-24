const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes using GET: "/api/notes/getallnotes". Login required
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error = error.message;
        res.status(500).send("Internal server error");
    }
})

// Route 2: Add a note using a POST: "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', "Notes cannot be empty,minimum length should be 10 characters").isLength({ min: 10 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            user: req.user.id, title, description, tag
        })
        const savednotes = await notes.save();
        res.send(savednotes)
    } catch (error) {
        console.error = error.message;
        res.status(500).send("Internal server error");
    }
})

// Route 3: Update the exisiting note using a PUT: "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        //find the note to be updated and update.....

        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Not found")
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json({ notes });
    } catch (error) {
        console.error = error.message;
        res.status(500).send("Internal server error");
    }
})

// Route 4: Delete the exisiting note using a DELETE: "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //find the note to be delete and delete.....

        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Not found")
        }
        // Allow deletion only if the user owns the Note
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", notes: notes });
    } catch (error) {
        console.error = error.message;
        res.status(500).send("Internal server error");
    }
})


module.exports = router;
