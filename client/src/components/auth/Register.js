import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'

class Register extends Component{
    constructor(){
		super();
		this.state={
			username:'',
			password:'',
            errors:{},
            msg:''
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
        axios.post('http://localhost:5000/api/users/register', newUser)
    	.then(res => this.setState({reg:true}))
    	.catch(err => 
            {console.log(err.response.data)
            this.setState({msg:err.response.data.msg})
        }
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
                  style={{width:'50%'}}
                />
                </div>
                <div className="form-group">
            <input
                  placeholder="Password (betwen 6 and 10 characters)"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  style={{width:'50%'}}
                  
                />
                </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
            <p style={{textAlign:'center'}}>Already on Stories?<Link style={{color:'#2977c9'}} className="nav-link" to="/login">Login </Link></p>
         <p style={{textAlign:'center', color:'red'}}><b>{this.state.msg}</b></p>
          </form>
        </div>
      </div>
    </div>
  </div>
        );
    }
}

export default Register;