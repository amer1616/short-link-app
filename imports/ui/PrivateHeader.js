import React from 'react'; 
import {Accounts} from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {

  onLogout(){
    // this.props.history.replace('/');
    console.log(this.props.history);
    
    // logout from accounts
    Accounts.logout();
   }

  render() {
    return (
      <div className="header">
      <div className="header__content">
        <h1 className="header__brand">{this.props.title}</h1>
         {/* <button onClick={() => this.nexPath('/')}>Logout</button> */}
         <button className="btn btn--link-text" onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
       
      </div>
    )
  }
}

// // Stateless functional component example
// const PrivateHeader = (props) => {
//   return (
//     <div>
//       <h1>{props.title}</h1>
//       <button onClick={() => Accounts.logout() }>Logout</button>
//     </div>
//   )
// }
// export default PrivateHeader; // important to add export default, as exporting string not object
