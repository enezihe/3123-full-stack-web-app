const router = require('express').Router();
const mongoose = require('mongoose');
const Note = require('../models/Note');

router.post('/', async (req, res) => {
  try {
    if (!req.body?.content) return res.status(400).json({ error: 'content is required' });
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, priority } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { 'content.noteTitle': new RegExp(search, 'i') },
        { 'content.noteDescription': new RegExp(search, 'i') }
      ];
    }
    if (priority) filter['content.priority'] = String(priority).toUpperCase();
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: 'not found' });
    res.json(note);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
    if (!req.body?.content) return res.status(400).json({ error: 'content is required' });
    const updated = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
    const updated = await Note.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'not found' });
    res.json({ message: 'deleted', id: deleted._id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
