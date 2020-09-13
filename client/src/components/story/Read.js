import React, {Component} from 'react'
import axios from 'axios';
import isloggedin from '../isloggedin';
import {Redirect} from 'react-router-dom'
import jwt_decode from 'jwt-decode';

class Read extends Component{
    constructor(){
        super();
        this.state={
            title:'',
            post:'',
            currentreader:0
        }
        this.handleVisibilityChange=this.handleVisibilityChange.bind(this)
        this.addReader=this.addReader.bind(this)
        this.remreader=this.remreader.bind(this)
    }
    addReader(){
            const readby={
                user:this.state.userid,
                post:this.state.postid
            }
            console.log('readby'+readby.user)
            console.log(this.state.userid)
            axios.put('/api/stories/addreader',readby)
            .then(current=>{
                this.setState({currentreader:current.data.currentreader})
                this.setState({people:current.data.people})
                console.log(this.state.people)
            })
    }
    remreader(){
        const readby={
            user:this.state.userid,
            post:this.state.postid
        }
        console.log('readby'+readby.user)
        console.log(this.state.userid)
        axios.put('/api/stories/remreader',readby)
        .then(current=>{
            this.setState({currentreader:current.data.currentreader})
            this.setState({people:current.data.people})
            console.log(this.state.people)
        })
    }
    remreader1(){
        const readby={
            user:this.state.userid,
            post:this.state.postid
        }
        return new Promise(function (resolve, reject) { 
            axios.put('/api/stories/remreader',readby)
            .then(current=>{
            return current.data.people
            })
        });
    }
    handleVisibilityChange(){
        if(document.hidden){
            this.remreader()
        }
        else this.addReader()
    }
    componentDidMount(){
        if(isloggedin()){
            document.addEventListener("visibilitychange", this.handleVisibilityChange, false);
            this.setState({postid:this.props.location.state.id})
             this.addReader()
        const str='/api/stories/read/'.concat(String(this.props.location.state.id));
        axios.post(str)
        .then(res=>{
            this.setState({title:res.data.title,post:res.data.post});
            const decoded = jwt_decode(localStorage.jwtToken);
            this.setState({userid:decoded.id})
            const readby={
                user:decoded.id,
                post:this.props.location.state.id
            }
            axios.put('/api/stories/readby',readby)
            .then(count=>{
                this.setState({count:count.data.read})
            })
        })
        .catch(err=>
            console.log(err))
        }
        
    }
     async componentWillUnmount(){
         
            var res = await this.remreader1();
        document.removeEventListener("visibilitychange", this.handleVisibilityChange)
    }
    render(){
        if(!isloggedin())
        return <Redirect to="/" />
    else return(<div className="container p-4">
            <h3 className="text-center">{this.state.title}</h3>
            {this.state.count && <h4 className="text-center">Total reads: {this.state.count} users</h4>}
            {this.state.currentreader && <h4 className="text-center">Currently read by {this.state.currentreader} users</h4>}
            {/* {this.state.people} */}
            <p className="text-left p-2 mt-4" style={{"whiteSpace": "pre-line"}}>{this.state.post}</p>
        </div>
        );
    }
}
export default Read;