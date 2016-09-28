import React from 'react';
import RecipeIngredient from './RecipeIngredient';

const styles = {
	spacing: { margin: '40px'},
	heading: { borderBottom: '1px solid #414E49', paddingBottom: '4px'},
}

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
				<div style={ styles.spacing }>
					<h5 style={ styles.heading }>Ingredients</h5>
				<div>
					<ul>
						{this.displayIngredients()}
					</ul>
				</div>
				</div>
			</div>
		)
	}
}

export default RecipeIngredients;
