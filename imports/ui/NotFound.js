import React from 'react';
import {Link} from 'react-router-dom';

// export default class NotFound extends React.Component{
//   render(){
//     return(
//       <h1>NotFound Component</h1>
//     )
//   }
// }

// Stateless functional component
export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
      <h1>Page Not Found</h1>
      <p>We are unable to find that page.</p>
      <Link to="/" className="btn btn--link">HEAD HOME</Link>
      </div>
    </div>
  )
}