import React from 'react';
import RecipeIngredient from './RecipeIngredient';

class RecipeIngredients extends React.Component {
	constructor(props) {
		super(props)
		this.displayIngredients = this.displayIngredients.bind(this)
	}

	displayIngredients() {
		console.log('displayIngredients')
		console.log(this.props.recipeIngs)
		let ingredients = this.props.recipeIngs.map( ingredient => {
			return(
				<RecipeIngredient key={ingredient.id} {...ingredient} />
			)
		})
		return ingredients
	}

	render() {
		return(
			<div>
			<h5>Ingredients</h5>
				<ul>
					{this.displayIngredients()}
				</ul>
			</div>
		)
	}
}

export default RecipeIngredients;