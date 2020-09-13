import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import isloggedin from '../isloggedin';

class Login extends Component{
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
    componentDidMount(){
      if(isloggedin())
        this.setState({isloggedin:true});
          }
    

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });	
    }
    onSubmit = e => {
        e.preventDefault();
    
        const userData = {
          username: this.state.username,
          password: this.state.password
        };
        axios.post('/api/users/login', userData)
            .then(res => {                
                const { token } = res.data;
                // Set token to ls
              localStorage.setItem('jwtToken', token);
              // Set token to Auth header
              setAuthToken(token);
              // Decode token to get user data
              const decoded = jwt_decode(token);
              console.log(decoded);
              window.location.reload(true);
              this.setState({isloggedin:true})
            })
            .catch(err => {console.log(err.response.data)
            this.setState({isloggedin:false, msg:err.response.data.msg})
          })
      }
    render(){
      //const isloggedin=isloggedin();
        if(this.state.isloggedin){
            return <Redirect to="/stories"/>
        }
        else
        return(
            <div className="login">
    <div className="container">
    <div><br /><br /></div>
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
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
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  style={{width:'50%'}}                  
                />
                </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
            <p style={{textAlign:'center', color:'red'}}><b>{this.state.msg}</b></p>
          </form>
        </div>
      </div>
    </div>
  </div>
        );
    }
}

export default Login;