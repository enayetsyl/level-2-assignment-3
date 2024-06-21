import { Schema, model } from "mongoose";
import { TRoom } from "./RoomType";

const roomSchema = new Schema<TRoom>({
  name: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  floorNo: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerSlot: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

roomSchema.pre("find", function(next) {
  this.find({idDeleted: {$ne: true}})
  next()
})

roomSchema.pre("findOne", function(next) {
  this.findOne({isDeleted: {$ne: true}})
  next()
})

roomSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({
    $match: { isDeleted: {$ne: true}}
  })
  next()
})

export const Room = model<TRoom>("Room", roomSchema);
