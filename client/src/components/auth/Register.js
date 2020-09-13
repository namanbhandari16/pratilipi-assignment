import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'

class Register extends Component{
    constructor(){
		super();
		this.state={
			username:'',
			password:'',
			errors:{}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit =this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });	
    }
        onSubmit(e){
            e.preventDefault();
            const newUser = {
          username: this.state.username,
          password: this.state.password,
        };             
        console.log(newUser)
        axios.post('/api/users/register', newUser)
    	.then(res => this.setState({reg:true}))
    	.catch(err => 
    		console.log(err)
    );
        }
    render(){if(this.state.reg){
        return <Redirect to="/login" />
    }
        return(
            <div className="register">
    <div className="container">
    <div><br /><br /></div>
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
                  placeholder="Enter E-mail for username"
                  name="username"
                  type="email"
                  value={this.state.username}
                  onChange={this.onChange}
                  //error={errors.email}
                />
                </div>
                <div className="form-group">
            <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  //error={errors.password}
                  
                />
                </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
            <p style={{textAlign:'center'}}>Already on Stories?<Link style={{color:'#2977c9'}} className="nav-link" to="/login">Login </Link></p>
          </form>
        </div>
      </div>
    </div>
  </div>
        );
    }
}

export default Register;