import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(){
    super()
    this.state = {
      links: []
    }
  }
  // after mounting component, load data
  componentDidMount(){
    console.log('componentDidMount LinksList')
    this.linksTracker = Tracker.autorun( () => {
      // subscribe the publish, 'links' from api/links, so it can be loaded on client component
      Meteor.subscribe('links');
      const links = Links.find({
        // Session used for storing key:value pairs so it can be called with.set() dynamically & reactively
        visible: Session.get('showVisible')
      }).fetch()
      this.setState({links})
      
    });
  }
  // when unmont componet stop loading data
  componentWillUnmount(){
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems(){
    if (this.state.links.length === 0 ){
      return (
        <div className="item">
          <p className="item__message-status">No Links found</p>
        </div>
      )
    }
    return this.state.links.map( (link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
      // {... link} means copy all of link props to LinkListItem comp
    })
  }
  render(){
    return (
      <div>
       
        <div>
          <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
}