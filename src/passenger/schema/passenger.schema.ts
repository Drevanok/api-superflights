import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, minlength: 3, maxlength: 50 },
})

PassengerSchema.index({ email: 1 }, { unique: true });
