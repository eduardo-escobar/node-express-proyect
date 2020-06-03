const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, require: true }], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
