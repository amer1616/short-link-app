import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import '../imports/startup/simple-schema-config';

import {routes, onAuthChange} from '../imports/routes/routes';


// tracking whether user isAuthenticated
Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId(); // truthy isAuthenticated
  onAuthChange(isAuthenticated);
})

// Stateless functional components
// const MyComponent = (props) => {
//   return (
//     <div>
//       <h1>MyComponent is here! {props.name}</h1>
//     </div>
//   )
// }

Meteor.startup(() => {
  Session.set('showVisible', true);
  // render the Stateless functional components
  // ReactDOM.render(<MyComponent name="Mike"/>, document.getElementById('app'))
  ReactDOM.render(routes, document.getElementById('app'))
})