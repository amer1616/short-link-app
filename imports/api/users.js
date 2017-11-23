import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';


Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
    
  new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({email})

  return true;
});

 // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true
  //   },
  //   age: {
  //     type:Number,
  //     min: 0
  //   },
  //   contactNumber:{
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // })
  // petSchema.validate({
  //   name: 'Amer',
  //   age: 20,
  //   contactNumber: '233344'
  // })