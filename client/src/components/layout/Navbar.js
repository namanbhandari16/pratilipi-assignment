import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import logoutUser from '../logoutUser';
import isloggedin from '../isloggedin';

class Navbar extends Component{
  constructor(){
		super();
		this.state={
		};
    }
      onLogoutClick(){
        logoutUser();
        var p=isloggedin()
        this.setState({isloggedin:p})
      }
      componentDidMount(){
        var p=isloggedin()
        this.setState({isloggedin:p})
      }
    render(){
      const authLinks =(
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/create">Create a new post</Link>
          </li>
          <li className="nav-item">
            <Link onClick={this.onLogoutClick.bind(this)} className="nav-link" to="/">Logout</Link>
          </li>
        </ul>
      );
      const guestLinks =(
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      );
        return(
            <nav className="navbar navbar-expand-sm bg-dark">
    <div className="container">
      <Link className="nav-link navbar-brand font-weight-bolder font-italic" style={{fontSize:'30px' }} to="/stories">Stories</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>
       {this.state.isloggedin ? authLinks : guestLinks}     
    </div>
  </nav>
        );
    }
}

export default Navbar;