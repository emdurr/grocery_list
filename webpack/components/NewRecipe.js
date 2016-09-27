import React, { Component } from 'react';
import { Link } from 'react-router';
import Recipes from './Recipes';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
}

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleNewRecipe = this.handleNewRecipe.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
  }

  displayRecipe(id) {
  		this.props.history.push(`/recipe/${id}`)
    }


  handleNewRecipe(e) {
    e.preventDefault();
    let name = this.refs.addName.value;
    let description = this.refs.addDescription.value;
    let directions = this.refs.addDirections.value;
    $.ajax({
      url: '/api/v1/recipes',
      type: 'POST',
      dataType: 'JSON',
      data: { recipe: { name, description, directions}}
    }).done( recipe => {
      this.props.history.push(`/recipe/${recipe.id}`)
    }).fail( data => {
      console.log(data);
    });
  }


  render() {
    return(
      <div className='center container'>
				<h1>Build Your Recipe</h1>
        <form id='addForm' onSubmit={this.handleNewRecipe}>
          <input type='text' ref='addName' placeholder='Recipe Name'/>
          <input type='text' ref='addDescription' placeholder='Ingredients' />
          <input type='text' ref='addDirections' placeholder='Directions'/>
          <button type='submit'>Add</button>
        </form>
        <p></p>
      </div>
    )
  }
}

export default NewRecipe;
