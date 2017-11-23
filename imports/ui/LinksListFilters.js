import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

export default class linksListFilters extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showVisible: true
    }
  }
  componentDidMount(){
    // mount the state, showVisible to be equal to Session, variable 'showVisible'
    this.tracker = Tracker.autorun( () => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    })
  }

  componentWillUnmount(){
    //stop tracker
    this.tracker.stop()
  }
  render(){
    return(
      <div>
        <label className="page-content__checkbox" htmlFor="">
        <input className="page-content__checkbox-box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
          // console.log(e.target.checked);
          // flipping hide/unhide buttons according to checkbox whether checked/unchecked
          Session.set('showVisible', !e.target.checked);
        }} /> 
        Show hidden links
        </label>
      </div>
    )
  }
  
}
