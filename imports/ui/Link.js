import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';


export default class Link extends React.Component {
  constructor(){
    super()
  }
 
  render() {
    return (
      <div>
        <PrivateHeader title="My Links" />
        <div className="page-content">
        <LinksListFilters />
        <AddLink />
        <LinksList />
        </div>
      </div>
    )
  }
}

