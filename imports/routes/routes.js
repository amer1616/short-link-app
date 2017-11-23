import { Meteor } from 'meteor/meteor';
import React from 'react';
import createHistory from 'history/createBrowserHistory'
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createHistory();
const unAuthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  // check if user on isUnauthenticatedPage & isAuthenticated, redirect him to '/links', else redirect to main page '/'
  if (isUnauthenticatedPage && isAuthenticated) {
    // using replace instead of push, so for replacing url, for easy url navigation back & forward
     history.replace('/links');
  }else if (isAuthenticatedPage && !isAuthenticated){
     history.replace('/');
  }
}
/**
 * protecting page, Auth on Entering public/private page with isLoggedIn() method
 */
const isLoggedIn = () => {
 return Meteor.userId() !== null;
}

export const routes = (
  <Router history={history}>
   
     <Switch>
        <Route exact path="/"  render={ () =>  (
          isLoggedIn() ? ( < Redirect to ="/links" /> )
        : ( <Login /> ) 
        )} />
        <Route path="/login" render={ () =>  (
          isLoggedIn() ? <Redirect to ="/links" /> 
        :  <Login  /> 
        )} />
        <Route path="/signup" render={ () =>  (
          isLoggedIn() ? <Redirect to ="/links" /> 
          :  <Signup /> 
          )} />
        <Route path="/links" render={ () =>  (
          !isLoggedIn() ?  <Login /> 
        : <Link history={history} /> 
          )} />
        <Route path="*" component={NotFound} />
      </Switch>
      
  </Router>
)

