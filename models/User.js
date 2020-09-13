const mongoose= require('mongoose');
const Schema =mongoose.Schema;

//create schmea
const UserSchema = new Schema({
username:{
	type: String,
	required:true
},
password:{
	type: String,
	required:true
}
});
module.exports=Post=mongoose.model('users',UserSchema);