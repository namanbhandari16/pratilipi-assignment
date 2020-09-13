import logoutUser from './logoutUser';
import jwt_decode from 'jwt-decode';

const isloggedin = () => {
    var loggedin=false;
    if(localStorage.jwtToken===undefined){
      loggedin=false
    }
    else{
      const decoded = jwt_decode(localStorage.jwtToken);
        const currentTime = Date.now()/1000;
        if(decoded.exp>currentTime){
          loggedin=true;
        }
        else {logoutUser();
          loggedin=false}
    }
      return loggedin;
};

export default isloggedin;