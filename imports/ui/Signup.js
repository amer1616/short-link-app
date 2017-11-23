import React from 'react';
import { Link } from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    // declare states
    this.state = {
      error: ''
    }
  }
  // lifecycle for the current component for 

  // adding all methods here
  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password < 9){
      return this.setState({error: 'Password must be more than 8 characters long.'})
    }
    Accounts.createUser({email, password}, (err) => {
      console.log('Signup callback', err);
      // printing error
      if (err){
        this.setState({ error: err.reason })
      } else {
        this.setState({error: ''})
      }
    });
    
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
        <h1>Join Short Lnk</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined} 
        {/* undefined value ignored by jsx */}
        <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form" noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button className="btn">Create Account</button>
        </form>
        <br/>
        <Link to="/">Already have an account?!</Link> <br />
       
      </div>
      </div>
    )
  }
}