// Anything related to likes in main.js is here 


import express from "express";
import { Conff } from "../models/Confession.js";

const router = express.Router();

// Like Update and Downgrade 
router.post('/likeUpd/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
        await Conff.findByIdAndUpdate(id, {
            $inc: { likes: 1 }
        });


        console.log('Like registered', id);
        res.json({ ok: true }); // ‼️ Important cuz without this the async function won't return anything and thus whatever function waiting for it keeeeeps waiting for it forever
    } catch (err) {
        console.error('POST / error', err)
        res.status(500).json({ ok: false, error: 'Like Count error' })
    }
});
router.post('/likeDwn/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
        await Conff.findByIdAndUpdate(id, {
            $inc: { likes: -1 }
        });


        console.log('UnLike registered', id);
        res.json({ ok: true }); // ‼️ Important cuz without this the async function won't return anything and thus whatever function waiting for it keeeeeps waiting for it forever
    } catch (err) {
        console.error('POST / error', err)
        res.status(500).json({ ok: false, error: 'UnLike Count error' })
    }
});

export default router;