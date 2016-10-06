import React from 'react';
import MenuSelect from './MenuSelect'
import AddRecipeIngredients from './AddRecipeIngredients'


class RecipeOptions extends React.Component {
	constructor(props) {
		super(props);
		this.addToMenu = this.addToMenu.bind(this);
		this.addIngredients = this.addIngredients.bind(this);
		this.addToFavorites = this.addToFavorites.bind(this);
		this.createCustom = this.createCustom.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.belongsToUser = this.belongsToUser.bind(this);
		this.state = { modal: null }
	}

	addToMenu() {
		if(this.state.modal === 'addToMenu') {
			return(
				<MenuSelect closeModal={this.closeModal} recipeId={this.props.id} />
				)
		} else
			return null
	}

	addIngredients() {
		if(this.state.modal === 'addIngredients') {
			return(
				<AddRecipeIngredients closeModal={this.closeModal} recipeId={this.props.id} />
			)
		} else
			return null
	}

	addToFavorites() {
	}

	createCustom() {
		this.props.duplicateRecipe()
	}

	closeModal() {
		this.setState( { modal: null } )
	}

	belongsToUser() {
		if (this.props.user) {
			return( null )
		} else {
			return(
				<button className='btn' onClick={this.createCustom}>Create Custom Version</button>
			)
		}
	}

	render() {
		return(
			<div>
				<div>
					<button className='btn' onClick={ () => this.setState( {modal: 'addToMenu' } ) }>Add to Menu</button>
					<button className='btn' onClick={ () => this.setState( {modal: 'addIngredients' } ) }>Add Ingredients to Shopping List</button>
					<button className='btn' onClick={this.addToFavorites}>Favorite</button>
						{ this.belongsToUser() }
				</div>
				<div>
					<div>
						{this.addToMenu()}
						{this.addIngredients()}
					</div>
				</div>
			</div>
		)
	}
}

export default RecipeOptions;