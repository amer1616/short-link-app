import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// catching any error for SimpleSchema types for the whole project, so no need to use try().catch() method
SimpleSchema.defineValidationErrorTransform(e => {
  return new Meteor.Error(e.message)
})