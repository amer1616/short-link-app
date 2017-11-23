import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
  // publish/subscribe for reading data fetched from collection
  // remove autopublish package before apply publish/subscribe 
  Meteor.publish('links', function (){
    // finding only links belonging to loggedin userId, by passing Meteor.userId()
    return Links.find({userId: this.userId})
    // return Links.find({url: '2'}) //query specific data
  })
}
/**
 * Meteor.methods, used for writing data | create/update/remove.
 * Calling those methods on client by using Meteor.call() 
 * Before using methods, remove insecure package, so disabling writing data from client
 */
 Meteor.methods({
  'links.insert'(url){
    // valid userId
    if(!this.userId){
      throw new Meteor.Error('Not Authorized User!')
    }
    // Validating url with SimpleSchema
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your Link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({url})
    
      // insert Links data
    Links.insert({
      _id: shortid.generate(), //using shortid to add short id, 
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },
  // set visibility of links
  'links.setVisibility'(_id, visible){
    // check user auth
    if(!this.userId){
      throw new Meteor.Error('Not Authorized User!')
    }
    // validate _id, visible w/ new SimpleSchema
    new SimpleSchema({
      _id:{
        type: String,
        min: 1
      },
      visible:{
        type: Boolean
      }
    }).validate({_id, visible})

    // updating Links with update
    Links.update({
      _id,
      userId: this.userId
    },{
      $set : { visible }
    }
  )
  },
  // tracking visits
  'links.trackVisit'(_id){
    new SimpleSchema({
      _id:{
        type: String,
        min: 1
      }
    }).validate({ _id })

    // updating after validating
    Links.update({_id}, {
      $set:{
        lastVisitedAt: new Date().getTime()
      },
      // increment visit by one
      $inc:{
        visitedCount: 1
      }
    })
  }
 })
