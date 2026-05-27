// https://www.npmjs.com/package/mongodb
import mongoose from "mongoose";
import express from "express";
import {Conff} from "./models/Confession.js";
import path from "path";
import likeRoutes from "./routes/like.js";
import postRoutes from "./routes/post.js";

let conn = await mongoose.connect("mongodb://localhost:27017/confess")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.resolve('.')))
app.use(express.static('public'))
// whatever routes are inside likeRoutes, attach '/api' before them : it means this 
app.use('/api', likeRoutes);
app.use('/', postRoutes);

app.get('/', (req, res) => {
    console.log('GET /')
    res.sendFile(path.resolve('index.html'))
})

// Loading confessions form DataBase to our UI
app.get('/api/confessions', async (req, res) => {
    try {
        const topic = req.query.topic || 'All';
        const search = req.query.search || '';
        const mode = req.query.mode || 'latest';

        let query = {};

        if(topic !== 'All'){
            query.topic = topic;
        }

        if(search.trim() !== ''){
            query.title = {
                $regex: search,
                $options: 'i'
            };
        }

        // For "Trending or latest feed `mode`"
        let sortOption = { date: -1 };

        if(mode === 'trending'){
            sortOption = { likes: -1 };
        }

        const confessions = await Conff.find(query)
            .sort(sortOption);

        res.json(confessions);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch confessions'});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})