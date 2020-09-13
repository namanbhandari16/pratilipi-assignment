const validator= require('validator');
const isEmpty =require('./is-empty');
module.exports= function validateInput(data){
	let errors={};
	data.username 		= !isEmpty(data.username) 		? data.username: '';
	data.password 	= !isEmpty(data.password) 	? data.password: '';

	if(validator.isEmpty(data.username)){
		errors.username='Username is required';
	}
	else if(!validator.isEmail(data.username)){
		errors.username='Invalid email';
	}
	if(validator.isEmpty(data.password)){
		errors.password='password field is required';
	}
	return{
		errors:errors,
		isValid:isEmpty(errors)
	}
}