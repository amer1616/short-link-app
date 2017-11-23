import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
  constructor() {
    super();
    // declare states
    this.state = {
      error: ''
    }
  }
  // adding all methods here
  nextPath(){ }
  
  onSubmit(e){
    e.preventDefault();  
    
    // history.replace('/links');
    // setting inputs refs
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      console.log('Login callback', err);
      // printing error
      if(err){
        this.setState({error: 'Unable to Login. Check email and password.'})
      }else{
        this.setState({error: ''})
      }
    });
     // or u can use| this.props.history.replace('/links')
  }

  render() {
    return (
      <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Short Lnk</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined} 
        {/* undefined value ignored by jsx */}
        <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form" noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button className="btn">Login</button>
        </form>
          <Link to="/signup">You don't have an account?! Signup</Link>
      </div>
      </div>
    )
  }
}


