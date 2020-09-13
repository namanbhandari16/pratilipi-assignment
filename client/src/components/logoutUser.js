import setAuthToken from './setAuthToken';
const logoutUser = () => {
   try{ localStorage.removeItem('jwtToken');
   setAuthToken(false);}
   catch(e){
     console.log(e);
   }
  };
  export default logoutUser;