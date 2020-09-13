import React,{Component} from 'react';
import { Link} from 'react-router-dom';

class Landing extends Component{
    render(){
        return(
            <div className="mt-4">
                <center>
                <Link to="/register" style={{textAlign:'center'}} className="button btn-lg btn-info mr-2 ">Sign Up</Link>
                <Link to="/login" style={{textAlign:'center'}} className="button btn-lg btn-info mr-2 ">Login</Link>
                </center>
            </div>
        );
    }
}

export default Landing;