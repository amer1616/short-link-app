import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {

  // code to run on server at startup
  // WebApp used to connect to node http status, so u can access middlewares, e.g. req.url, req.method, req.headers 

  //creating & registering new middleware function
  // Set HTTP status code to 302
  // Set Location header to link.url stored in database
  // End the request

  WebApp.connectHandlers.use((req, res, next) => {
    console.log(req.url);
    // extracting url id without '/'
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id }); // .findOne() --only fetching single matched _id 

    // check if link is matched to _id, set location header to be link.url matched in database 
    if (link){
      res.statusCode = 302;
      res.setHeader('Location', link.url)
      res.end();
      // call for tracking visits of the links 
      Meteor.call('links.trackVisit', _id)
    }else{
      next();
    }
   
  })

  WebApp.connectHandlers.use((req, res, next) => {
    console.log('this is from custom middleware!');
    console.log(req.url, req.method, req.headers, req.query);

    // // Set http status code
    // res.statusCode = 404;
    // // Set http header
    // res.setHeader('my-custom-header', 'Amer was here')
    // // Set http body, overwriting the existent html content
    // res.write('<h1>This my middleware at work!</h1>')
    // // End Http request
    // res.end();
    next();
  })
});