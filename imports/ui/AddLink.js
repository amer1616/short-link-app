import React from 'react'; 
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }
  onSubmit(e){
    // using controlled form control for dynamic adding input and error handler
    const {url} = this.state;

    e.preventDefault();
      // call Meteor.methods by using Meteor.call, accepting ('method_name', args)
     Meteor.call('links.insert', url, (err, res) => {
      if(!err){
        this.setState({ url: '', isOpen: false, error: '' })
      }else{
        this.setState({ error: err.error });
      }
     })
    }
  onChange(e){
    this.setState({
      url: e.target.value
    })
   }
   handleModalClose(){
    this.setState({
      isOpen: false,
      url: '', 
      error: ''})
   }

  render() {
    return (
      <div>
        <button className="btn" onClick={ () => this.setState({isOpen: true})} >+ Add Link</button>
        <Modal 
        isOpen={ this.state.isOpen } 
        contentLabel="Add Label"
        onAfterOpen={() => this.refs.url.focus()} 
        onRequestClose={this.handleModalClose.bind(this)} 
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal">
         <h1>Add Link</h1>

        { this.state.error ? <p>{this.state.error}</p> : undefined }

        <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" 
          ref="url" 
          placeholder="URL"
          value= {this.state.url}
          onChange={this.onChange.bind(this)}  />
          <button className="btn">Add Link</button>
          <button type="button" className="btn btn--default" onClick={ this.handleModalClose.bind(this) } >Cancel</button>
        </form>
        
        </Modal>
      </div>
    )
  }
}