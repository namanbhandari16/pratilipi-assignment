import React,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import jwt_decode from 'jwt-decode';
import setAuthToken from './components/setAuthToken';
import logoutUser from './components/logoutUser';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Stories from './components/story/Stories';
import isloggedin from './components/isloggedin';
import Create from './components/story/Create';
import Read from './components/story/Read';

if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	//check for expried token
	const currentTime = Date.now()/1000;
	if(decoded.exp<currentTime){
	  //logout user
	  logoutUser();
	  window.location.href='/login';
	}
  }
   

class  App extends Component {
	render(){
  return (
  		<Router>
    		<div className="App">
    		<Navbar loggedin={isloggedin()}/>
  			<Route exact path="/" component={Landing} />
  			<div className="container">
  				<Route exact path="/register" component={Register} />
   				<Route exact path="/login" component={Login} />
				<Route exact path="/create" component={Create} />
          		<Route exact path="/stories" component={Stories} />
				<Route exact path="/read" component={Read} />
  			</div>
    		</div>
    	</Router>
  );
}
}

export default App; 
