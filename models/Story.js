const mongoose= require('mongoose');
const Schema =mongoose.Schema;

//create schmea
const StorySchema = new Schema({
title:{
	type: String,
	required:true
},
date:{
	type: Date,
	default:Date.now
},
post:{
	type: String,
	required:true
},
createdby:{
    type: Schema.Types.ObjectId,
    ref: 'users'
},
readby:[{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
currentreader:[{
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}]
});
module.exports=Post=mongoose.model('stories',StorySchema);