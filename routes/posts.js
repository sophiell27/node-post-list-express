const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('', async (req, res) => {
    try {
        const data = await Post.find();
        res.status(200).send({ data });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('', async (req, res) => {
    try {
        const data = req.body;
        if (!data.title || !data.content || !data.author) {
            res.status(400).send({
                message: 'Title, author and content are required'
            });
        } else {
            const newData = await Post.create(data);

            res.status(200).send({ data: newData });
        }
    } catch (error) {
        res.status(400).send({ message: 'Title, author and content are required' });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (id) {
        try {
            const updatedData = await Post.findByIdAndUpdate(id, data, {
                new: true
            });
            if (updatedData) {
                res.status(200).send({ data: updatedData });
            } else {
                res.status(400).send({ message: 'data or id is incorrect' });
            }
        } catch (error) {
            res.status(400).send({ message: 'data or id is incorrect' });
        }
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Post.findByIdAndDelete(id);
        if (result) {
            res.status(200).send({ message: 'Post deleted' });
        } else {
            res.status(400).send({ message: 'id is not valid' });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});
router.delete('', async (req, res) => {
    try {
        await Post.deleteMany({});
        res.status(200).send({ message: 'Post deleted' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
