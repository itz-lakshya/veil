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
        const confessions = await Conff.find()
            .sort({ date: -1 });

        res.json(confessions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch confessions' });
    }
});

// Loading confessions of a particular topic in our UI
app.get('/api/confessions/:topic', async (req, res) => {
    try {
        const topic = req.params.topic;

        let confessions;
        if(topic === 'All'){
            confessions = await Conff.find()
                .sort({ date: -1 });
        }
        else{
            confessions = await Conff.find({topic: topic})
                .sort({ date: -1 });
        }

        res.json(confessions);

        // This works too :)
        // const a = await db.collection('conffs').find({ topic: topic })
        //         .sort({ date: -1 }).toArray();
        // res.json(a);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch topics confessions'});
    }
});

app.get('/api/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const confessions = await Conff.find({
            title: {
                $regex: query,
                $options: 'i'
            }
            // $or: [
            //     { title: { $regex: query, $options: 'i' } },
            //     { topic: { $regex: query, $options: 'i' } }
            // ]
        })
        .sort({ date: -1 });

        res.json(confessions);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Search failed'});
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

