const validator= require('validator');
const isEmpty =require('./is-empty');
module.exports= function validateInput(data){
	let errors={};
	data.username 		= !isEmpty(data.username) 		? data.username: '';
	data.password 	= !isEmpty(data.password) 	? data.password: '';

	if(validator.isEmpty(data.username)){
		errors.msg='Username is required';
	}
	else if(!validator.isEmail(data.username)){
		errors.msg='Invalid email';
	}
	else if(validator.isEmpty(data.password)){
		errors.msg='password field is required';
	}
	else if(data.password.length<7 ||data.password.length>11){
		errors.msg='password should be between 6 and 10';
	}
	return{
		errors:errors,
		isValid:isEmpty(errors)
	}
}