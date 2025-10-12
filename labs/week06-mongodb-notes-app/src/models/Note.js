const { Schema, model } = require('mongoose');

const ContentSchema = new Schema(
  {
    noteTitle: { type: String, required: true, trim: true },
    noteDescription: { type: String, required: true },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
    dateAdded: { type: String, required: true },
    dateUpdated: { type: String, required: true }
  },
  { _id: false }
);

const NoteSchema = new Schema(
  {
    content: { type: ContentSchema, required: true }
  },
  { timestamps: true }
);

module.exports = model('Note', NoteSchema);
