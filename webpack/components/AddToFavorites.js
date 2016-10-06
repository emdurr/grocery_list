import React from 'react';

let backdropStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  zIndex: '9998',
  background: 'rgba(0, 0, 0, 0.3)'
}

let modalStyle = {
  position: 'absolute',
  height: '50vh',
  width: '80vw',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#fff'
}

class addToFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
  }

  handleAddFavorite() {
    $.ajax ({
      url: '/api/v1/favorites',
      type: 'POST',
      dataType: 'JSON',
      data: { favorite: {comment: this.refs.favoriteComment.value, recipe_id: this.props.recipeId }}
    }).done( data => {
      console.log(data)
      this.props.closeModal()
      this.props.updateFavorite(data.id)
    }).fail(data =>{
      console.log(data)
    })
  }


  render() {
    return (
      <div style={ backdropStyle }>
        <div style={ modalStyle }>
          <h3>Adding To Favorites</h3>
          <p>{ this.props.title }</p>
          <input ref='favoriteComment' type='text' placeholder='Comments'/>
          <button className='btn' onClick={ this.handleAddFavorite }>Confirm</button>
          <button className='btn' onClick={ this.props.closeModal }>Cancel</button>
        </div>
      </div>
    )
  }
}

export default addToFavorites;
