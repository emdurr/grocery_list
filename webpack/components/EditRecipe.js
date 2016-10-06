import React, { Component } from 'react';
import { Link } from 'react-router';
import Recipes from './Recipes';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' },
	buttons: { margin: '30px'},
}

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleAddNewIngredient = this.handleAddNewIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.handleAddNewStep = this.handleAddNewStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.state = { recipeHeaderInfo: null, recipeIngredients: null, recipeSteps: null	 };
  }

  componentWillMount() {
  	$.ajax({
  		url: `/api/v1/recipes/${this.props.params.id}`,
  		type: 'GET',
  		dataType: 'JSON'
  	}).done( data => {
  		this.setState({recipeHeaderInfo: data.recipeHeaderInfo,
				recipeIngredients: data.recipeIngredients,
				recipeSteps: data.recipeSteps
			});
  	}).fail( data => {
  		console.log('Get Failed')
  	})
  }

  handleAddNewIngredient(formRefs) {
    let name = formRefs.addAnotherIngredient.value;
    let amount = formRefs.addIngredientAmount.value;
    let unit = formRefs.addIngredientUnit.value;
    let recipe_id = this.props.params.id;
    let recipeIngredients = this.state.recipeIngredients;
    $.ajax({
      url: `/api/v1/recipe_ings`,
      type: 'POST',
      dataType: 'JSON',
      data: { recipe_id: recipe_id, ingredient: { name }, recipe_ing: { amount, unit }}
    }).done( recipe => {
      let recipeIngredient = { amount: recipe.ingredient.recipe_ingredients.amount,
                               name: recipe.ingredient.name,
                               unit: recipe.ingredient.recipe_ingredients.unit,
                               id: recipe.ingredient.id
                              }
      let findIngredient = recipeIngredients.findIndex( ingredient => ingredient.id === recipeIngredient.id );
      if (findIngredient === -1) {
        this.setState({ recipeIngredients: [recipeIngredient, ...recipeIngredients] })
      } else {
        this.setState({ recipeIngredients: [...recipeIngredients.slice(0, findIngredient),
                                            recipeIngredient,
                                            ...recipeIngredients.slice(findIngredient + 1, recipeIngredients.length)]})
      }
    }).fail( data => {
      console.log('Post failed');
    });
  }

  deleteIngredient(ingredientData) {
    let recipeIngredients = this.state.recipeIngredients;
    $.ajax({
      url: `/api/v1/recipe_ings/${ingredientData.id}`,
      type: 'DELETE',
      dataType: 'JSON',
      data: { recipe_id: this.props.params.id }
    }).done( () => {
      let deleteIndex = recipeIngredients.findIndex( recipeIngredient => recipeIngredient.id === ingredientData.id);
      this.setState({
        recipeIngredients: [
          ...recipeIngredients.slice(0, deleteIndex),
          ...recipeIngredients.slice(deleteIndex + 1, recipeIngredients.length)
        ]
      });
    }).fail( data => {
      console.log(data);
    });
  }

  handleAddNewStep(formRefs) {
  	let number = formRefs.addStepNumber.value;
  	let step_text = formRefs.addStepText.value;
  	let recipe_id = this.props.params.id;
  	let recipeSteps = this.state.recipeSteps;
  	$.ajax({
  		url: `/api/v1/steps`,
  		type: 'POST',
  		dataType: 'JSON',
  		data: { recipe_id: recipe_id, steps: { number, step_text }}
  	}).done( step => {
    	this.setState({ recipeSteps: [...recipeSteps, step.step] })
  	}).fail( data => {
  		console.log('Post failed');
  	});
  }

  deleteStep(stepData) {
    let recipeSteps = this.state.recipeSteps;
    $.ajax({
      url: `/api/v1/steps/${stepData.id}`,
      type: 'DELETE',
      dataType: 'JSON',
      data: { recipe_id: this.props.params.id }
    }).done( () => {
      let deleteIndex = recipeSteps.findIndex( recipeStep => recipeStep.id === stepData.id);
      this.setState({
        recipeSteps: [
          ...recipeSteps.slice(0, deleteIndex),
          ...recipeSteps.slice(deleteIndex + 1, recipeSteps.length)
        ]
      });
    }).fail( data => {
      console.log(data);
    });
  }

  render() {
  	if (this.state.recipeHeaderInfo) {
	    return(
  	    <div className='container'>
					<div className='card'>
						<RecipeHeader recipeHeaderInfo={this.state.recipeHeaderInfo} edit={true}/>
						<RecipeIngredients recipeIngs={this.state.recipeIngredients}
                               handleAddNewIngredient ={ this.handleAddNewIngredient }
                               deleteIngredient ={ this.deleteIngredient }
                               edit ={ true } />
						<RecipeSteps steps={this.state.recipeSteps}
                         handleAddNewStep ={ this.handleAddNewStep }
                         deleteStep ={ this.deleteStep }
												 edit ={ true }/>
						<div className='center'>
            	<a className='btn' style={ styles.buttons } href={'/recipes/' + this.props.params.id}>Done</a>
						</div>
					</div>
				</div>
      )
  	} else {
  		return(
	  		<div>Loading...</div>
	  	)
  	}
  }
}

export default EditRecipe;
