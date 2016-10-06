import React from 'react';

let backdropStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  zIndex: '9998',
  background: 'rgba(0, 0, 0, 0.3)'
}

let modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#fff',
  padding: '20px',
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
      this.props.updateFavorite(data.id, data.comment)
    }).fail(data =>{
      console.log(data)
    })
  }


  render() {
    return (
      <div style={ backdropStyle }>
        <div style={ modalStyle }>
          <h5>Adding Recipe To Favorites</h5>
          <h4>{ this.props.title }</h4>
            <input ref='favoriteComment' type='text' placeholder='Comments'/>
            <button className='btn' onClick={ this.handleAddFavorite }>Confirm</button>
            <button className='btn' onClick={ this.props.closeModal }>Cancel</button>
        </div>
      </div>
    )
  }
}

export default addToFavorites;
