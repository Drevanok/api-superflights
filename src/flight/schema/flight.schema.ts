import * as mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema(
  {
    pilot: { type: String, required: true, minlength: 3, maxlength: 30 },
    airplane: { type: String, required: true, minlength: 3, maxlength: 50 },
    destinationCity: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    flightDate: { type: Date, required: true },

    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passengers' }],
  },
  { timestamps: true },
);
