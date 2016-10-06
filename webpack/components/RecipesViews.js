import React from 'react';

class RecipesViews extends React.Component {
  constructor(props){
    super(props)
  }



  render() {
    return(
      <div>
        <button className='btn' onClick={ () => this.props.changeView('favorites')}>Favorites</button>
        <button className='btn' onClick={ () => this.props.changeView('search')}>Search</button>
        <button className='btn' onClick={ () => this.props.changeView('suggest')}>Suggest</button>
      </div>
    )
  }
}

export default RecipesViews;
