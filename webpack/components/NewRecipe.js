import React, { Component } from 'react';
import { Link } from 'react-router';
import Recipes from './Recipes';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
}

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleNewRecipe = this.handleNewRecipe.bind(this);
    this.recipeAddForm = this.recipeAddForm.bind(this);
    this.ingredientAddForm = this.ingredientAddForm.bind(this);
    this.recipeStepAddForm = this.recipeStepAddForm.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.state = { showAddIngredients: false, recipeHeaderInfo: null }
  }

  displayRecipe(id) {
  		this.props.history.push(`/recipe/${id}`)
    }


  handleNewRecipe(e) {
    e.preventDefault();
    let title = this.refs.addName.value;
    let ready_in_minutes = this.refs.addReadyInMinutes.value;
    let servings = this.refs.addServings.value;
    let credit_text = this.refs.addCreditText.value;
    $.ajax({
      url: '/api/v1/recipes',
      type: 'POST',
      dataType: 'JSON',
      data: { recipe: { title, ready_in_minutes, servings, credit_text}}
    }).done( recipe => {
      this.setState({ showAddIngredients: true,
                      recipeHeaderInfo: { recipe }
      })
    }).fail( data => {
      console.log(data);
    });
  }

  recipeAddForm() {
    return(
      <div>
        <form id='addRecipeForm' onSubmit={this.handleNewRecipe}>
          <input type='text' ref='addName' placeholder='Recipe Name'/>
          <input type='number' ref='addReadyInMinutes' placeholder='Will be ready in how many minutes?' />
          <input type='number' ref='addServings' placeholder='How many servings?'/>
          <input type='text' ref='addCreditText' placeholder='Who gets the credit for this wonderful recipe?'/>
          <button type='submit'>Add Ingredients and Steps</button>
        </form>
      </div>
    )
  }

  ingredientAddForm() {
    return(
      <div>
        <form id='addRecipeIngredientForm' onSubmit={this.handleAddNewIngredient}>
          <input type='text' ref='addAnotherIngredient' placeholder='Ingredient Name' />
        </form>
      </div>
    )
  }

  recipeStepAddForm() {
    return(
      <div>
        <form id='addRecipeStep' onSubmit={this.handleAddRecipeStep}>
          <input type='number' ref='addStepNumber' placeholder='Step Number' />
          <input type='text' ref='addStep' placeholder='Step Add' />
        </form>
      </div>

    )
  }


  render() {
    if (this.state.showAddIngredients) {
      return(
        <div className='center container'>
          <RecipeHeader {...this.state.recipeHeaderInfo.recipe}/>
          { this.ingredientAddForm() }
          { this.recipeStepAddForm() }
          <p></p>
        </div>
      )
    } else {
      return(
        <div className='center container'>
          <h1>Build Your Recipe</h1>
          { this.recipeAddForm() }
        </div>
      )
    }
  }
}

export default NewRecipe;
