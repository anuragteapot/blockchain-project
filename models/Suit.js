const mongoose = require("mongoose");
const Guid = require("guid");
const { Schema } = mongoose;

const SuitSchema = new Schema({
  _id: {
    type: String,
    default: () => Guid.raw()
  },
  userId: {
    type: String,
    required: true
  },
  userIdAccused: {
    type: String
  },
  suitTitle: {
    type: String
  },
  content: {
    type: String
  },
  accusedContent: {
    type: String
  },
  policeContent: {
    type: String
  },
  documentFile: {
    type: Object
  },
  accusedDocumentFile: {
    type: Object
  },
  policeDocumentFile: {
    type: Object
  },
  info: {
    type: Object
  },
  openDate: {
    type: Date
  },
  closeDate: {
    type: Date
  },
  category: {
    type: String
  },
  verdict: {
    type: String
  }
});

mongoose.model("Suit", SuitSchema);
