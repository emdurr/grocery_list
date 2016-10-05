import React, { Component } from 'react';
import { Link } from 'react-router';
import Recipes from './Recipes';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import Dropzone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request);

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
    this.onDrop = this.onDrop.bind(this);
    this.state = { showAddIngredients: false, recipeHeaderInfo: null, files: [] }
  }

  displayRecipe(id) {
  		this.props.history.push(`/recipes/${id}/edit`)
    }


  handleNewRecipe(e) {
    e.preventDefault();
    let title = this.refs.addName.value;
    let ready_in_minutes = this.refs.addReadyInMinutes.value;
    let servings = this.refs.addServings.value;
    let credit_text = this.refs.addCreditText.value;
    let file = this.state.files[0];

    $.ajax({
      url: '/api/v1/recipes',
      type: 'POST',
      dataType: 'JSON',
      data: { recipe: { title, ready_in_minutes, servings, credit_text}}
    }).done( recipe => {
      if (file) {
        let req = request.post(`/api/v1/recipes/${recipe.id}/image`);
        req.setCsrfToken();
        req.attach('image', file);
        req.end( (err, res) => {
          this.displayRecipe(recipe.id);
        });
      } else {
        this.displayRecipe(recipe.id);
      }
    }).fail( data => {
      console.log(data);
    });
  }

  onDrop(files) {
    this.setState({ files })
    // let req = request.post('/to/a/rails/route');
    // .setCsrfToken()
    // req.attach('file', file)
    // req.end( (err, res) => {
    //   //res.body
    // });
  }

  recipeAddForm() {
    return(
      <div>
        <form id='addRecipeForm' onSubmit={this.handleNewRecipe}>
          <input type='text' ref='addName' placeholder='Recipe Name' required/>
          <input type='number' ref='addReadyInMinutes' placeholder='Will be ready in how many minutes?' />
          <input type='number' ref='addServings' placeholder='How many servings?'/>
          <input type='text' ref='addCreditText' placeholder='Who gets the credit for this wonderful recipe?'/>
          <Dropzone ref='addImage' style={{border: 'none', textAlign: 'left'}} onDrop={this.onDrop} multiple={false}><div>Click to upload image</div></Dropzone>
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
