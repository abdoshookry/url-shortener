import mongoose, { Schema, model, models } from "mongoose";

const urlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
});

const Url = models.Url || model("Url", urlSchema);

export default Url;
