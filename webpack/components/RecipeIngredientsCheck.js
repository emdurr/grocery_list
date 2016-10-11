import React from 'react';
import IngredientCheck from './IngredientCheck';

var removableIngredients = 0;

const styles = {
	button: {
		backgroundColor: 'transparent',
		color: 'black'
	}
}

class RecipeIngredientsCheck extends React.Component {
	constructor(props) {
		super(props)
		this.displayIngredients = this.displayIngredients.bind(this);
		this.incrementRemovableIngredients = this.incrementRemovableIngredients.bind(this)

		this.state = { view: false, ingredients: null, removeButton: false }
	}

	showIngredientsView(recipeId) {
		$.ajax({
			url: '/api/v1/recipe_ings/recipe_ings_preview',
			type: 'GET',
			dataType: 'JSON',
			data: { recipe_id: recipeId }
		}).done( data => {
			this.setState( {ingredients: data.ingredients, view: true } )
		}).fail( data => {
			console.log(data)
		})
	}

	displayIngredients() {
		let ingredients = this.state.ingredients.map( (ingredient, i) => {
			return(
				<IngredientCheck key={ingredient.id} ref={'ingredient' + i} ingredient={ingredient} increment={this.incrementRemovableIngredients}/>
			)

		})
		return ingredients
	}

	incrementRemovableIngredients(boolean) {
		if (boolean) {
			removableIngredients += 1
		} else {
			removableIngredients -= 1
		}
		if (removableIngredients > 0) {
			this.setState( {removeButton: true } )
		} else {
			this.setState( {removeButton: false } )
		}
	}

	removePantryIngredients() {
		let ingsCount = this.state.ingredients.length
		for (let i = 0; i < ingsCount; i++) {
			this.refs['ingredient' + i].removeFromPantry()
		}
		removableIngredients = 0;
		this.setState( {removeButton: false } )
		this.setState( { view: false } );
	}



	render() {
		let recipeId = this.props.recipeId
		if(this.state.view) { 
			return(
				<div>
				<h5>Required Ingredients</h5>
					<div className='row'>
						{this.displayIngredients() }
					</div>
					{this.state.removeButton ? <button className='btn' style={styles.button} onClick={ () => this.removePantryIngredients() }>
						Remove Marked Ingredients
					</button> : null }
					<button className='btn' style={styles.button} onClick={ () => this.setState( {view: false } ) }>Cancel</button>
				</div>
			)
		} else {
			return(
				<div className='row'>
						<button className='btn col s12 m4 offset-m4' style={styles.button} onClick={ () => this.showIngredientsView(recipeId) }>See Required Ingredients</button>
				</div>
			)
		}
	}
}

export default RecipeIngredientsCheck;