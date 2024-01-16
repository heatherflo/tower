import {Schema} from "mongoose";

export const EventSchema = new Schema(
  {
    creatorId: {type: EventSchema.Types.ObjectId, required: true, ref: 'Account'},
    name: {type: String, required: true, maxlength: 30 },
    description: {type: String, required: true, maxlength: 1000},
    coverImg: {type: String, required: true, maxlength: 500},
    location: {type: String, required: true, maxlength: 50},
    capacity: {type: Number, required: true, minlength: 3, maxlength: 2000 },
    startDate: {type: String, required: true, maxlength: 20},
    isCanceled: {type: Boolean, required: false, },
    type: {type: String, enum: ['concert', 'convention', 'sport', 'digital']}
  },
  {
    timestamps: true, 
    toJSON: {virtuals: true}
  }
)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
});
// TODO do this later
// EventSchema.virtual('ticketCount', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   ref: 'Account',
  
// }
// )