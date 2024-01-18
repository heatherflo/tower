import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  body: { type: String, required: true, minlength: 3, maxlength: 200 },

},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)