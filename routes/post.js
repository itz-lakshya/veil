// Anything in main.js related to Posting something is here


import express from "express";
import { Conff } from "../models/Confession.js";

const router = express.Router();

// Posting a confession
router.post('/', async (req, res) => {
    try {
        const title = (req.body.titleArea || req.body.title || '').toString().trim()
        if (!title) return res.status(400).json({ ok: false, error: 'Empty confession' })
        // if (!title) return res.redirect('/')
        const conff = new Conff({ title, topic: req.body.topic || 'General' })
        await conff.save()
        console.log('Saved confession', conff._id)
        res.json({ ok: true, message: 'Saved', id: conff._id })
    } catch (err) {
        console.error('POST / error', err)
        res.status(500).json({ ok: false, error: 'Server error' })
    }
});

export default router;

// 