const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, require: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
