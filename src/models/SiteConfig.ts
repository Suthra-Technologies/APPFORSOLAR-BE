import mongoose from 'mongoose';

const SiteConfigSchema = new mongoose.Schema({
  // Using Mixed type to elegantly hold the dynamically mutating deep recursive JSON of WhiteLabelConfig
  configData: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const SiteConfig = mongoose.model('SiteConfig', SiteConfigSchema);
