import React from 'react';
import RecipeIngredient from './RecipeIngredient';
import EditRecipe from './EditRecipe';

const styles = {
	spacing: { margin: '40px'},
	heading: { borderBottom: '1px solid #414E49', paddingBottom: '4px'},
}

class RecipeIngredients extends React.Component {
	constructor(props) {
		super(props)
		this.displayIngredients = this.displayIngredients.bind(this);
		this.handlePreventDefault = this.handlePreventDefault.bind(this);
	}

	displayIngredients() {
		let ingredients = this.props.recipeIngs.map( ingredient => {
			if (this.props.edit) {
				return(
					<div key={ingredient.id} >
						<RecipeIngredient  {...ingredient} />
						<button className='col s1' onClick={ () => this.props.deleteIngredient(ingredient)}>x</button>
					</div>
				)
			} else {
				return(
					<div key={ingredient.id} >
						<RecipeIngredient  {...ingredient} />
					</div>
				)
			}
		})
		return ingredients
	}

	handlePreventDefault(e) {
		e.preventDefault();
		this.props.handleAddNewIngredient(this.refs);
		this.refs.addIngredientAmount.value = '';
		this.refs.addIngredientUnit.value = '';
		this.refs.addAnotherIngredient.value = '';
		this.refs.addIngredientAmount.focus();
	}

	addIngredientForm() {
		if (this.props.edit) {
			return(
				<div className='row'>
					<form id='addRecipeIngredientForm' onSubmit={ this.handlePreventDefault }>
			      <div className='col s1'>
			  			<input type='text' ref='addIngredientAmount' placeholder='Amnt' required />
			      </div>
			      <div className='col s2'>
			      	<input type='text' ref='addIngredientUnit' placeholder='Cup, Tsp, etc' required />
			   		</div>
						<div className='col s8'>
			      	<input type='text' ref='addAnotherIngredient' placeholder='Ingredient Name' required />
			   		</div>
			   		<div className='col s1'>
							<button type="submit" className=" btn-floating btn-medium waves-effect waves grey"><i className="material-icons">add</i>
							</button>
			  		</div>
			   	</form>
				</div>
			)
		} else {
			return( null )
		}
	}

	render() {
		return(
			<div>
				<div style={ styles.spacing }>
					<h5 style={ styles.heading }>Ingredients</h5>
					<div>
						{this.addIngredientForm()}
						<ul>
							<div className='row'>
								{this.displayIngredients()}
							</div>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default RecipeIngredients;
