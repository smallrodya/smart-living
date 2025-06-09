import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  src: { type: String, required: true },
  hoverSrc: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String, required: true },
  discount: { type: String, required: true },
  isHot: { type: Boolean, default: false },
  isSoldOut: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  description: { type: String, default: '' },
  features: [{ type: String }]
});

const reduceSpaceSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  products: [productSchema]
}, { timestamps: true });

export default mongoose.models.ReduceSpace || mongoose.model('ReduceSpace', reduceSpaceSchema); 