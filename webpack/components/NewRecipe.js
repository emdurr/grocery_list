import React, { Component } from 'react';
import { Link } from 'react-router';
import Recipes from './Recipes';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import logoImg from '../images/ilarder_logo.png';
require('superagent-rails-csrf')(request);

const styles = {
	head: { backgroundColor: '#f3f3f3', marginTop: '20px'},
	recipeCard: { padding: '30px', margin: '30px'},
	lhead: { backgroundColor: '#3B4743', padding: '10px', color: 'white', margin: '0'},
	logo: { paddingRight: '10px'},
	imagebtn: { backgroundColor: 'transparent', margin: '10px 20px'}
}

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleNewRecipe = this.handleNewRecipe.bind(this);
    this.recipeAddForm = this.recipeAddForm.bind(this);
    this.ingredientAddForm = this.ingredientAddForm.bind(this);
    this.recipeStepAddForm = this.recipeStepAddForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = { showAddIngredients: false, recipeHeaderInfo: null, files: [], checked: false }
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
    let published = this.state.checked;

    $.ajax({
      url: '/api/v1/recipes',
      type: 'POST',
      dataType: 'JSON',
      data: { recipe: { title, ready_in_minutes, servings, credit_text, published}}
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

  handleClick() {
    this.setState({ checked: !this.state.checked })
  }

  recipeAddForm() {
    return(
      <div>
        <form id='addRecipeForm' onSubmit={this.handleNewRecipe}>
          <input type='text' ref='addName' placeholder='Recipe Name' required/>
          <input type='number' ref='addReadyInMinutes' placeholder='Will be ready in how many minutes?' />
          <input type='number' ref='addServings' placeholder='How many servings?'/>
          <input type='text' ref='addCreditText' placeholder='Who gets the credit for this wonderful recipe?'/>
          <input
                 id="publish"
                 type='checkbox'
                 name='check'
                 defaultChecked={this.state.checked}
                 onChange={this.handleClick}
                 value={ false }
          />
          <label htmlFor='publish'>Would you like to pubish for others to enjoy?
          </label>
					<div className='row'>
	          <Dropzone className='col s10 m4 push-m1 btn black-text'
											style={ styles.imagebtn }
											ref='addImage'
	                    onDrop={this.onDrop}
	                    multiple={false}><div>Upload image</div>
	          </Dropzone>
	          <button style={ styles.imagebtn } className='col s10 m4 push-m1 btn black-text' type='submit'>Next Steps</button>
					</div>
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
        <div className='center container' style={ styles.head }>
          <h3  style={ styles.lhead } ><img src={ logoImg }/> Build Your Recipe</h3>
					<div className='card' style={ styles.recipeCard }>
					<div>
					</div>
          	{ this.recipeAddForm() }
					</div>
        </div>
      )
    }
  }
}

export default NewRecipe;
