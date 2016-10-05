import React from 'react';
import MenuSelect from './MenuSelect';
import AddRecipeIngredients from './AddRecipeIngredients';
import AddToFavorites from './AddToFavorites';

class RecipeOptions extends React.Component {
	constructor(props) {
		super(props)
		this.addToMenu = this.addToMenu.bind(this)
		this.addIngredients = this.addIngredients.bind(this)
		this.addToFavorites = this.addToFavorites.bind(this)
		this.createCustom = this.createCustom.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.addToFavorites = this.addToFavorites.bind(this)

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
		if(this.state.modal === 'addToFavorites') {
			return(
				<AddToFavorites closeModal={this.closeModal} recipeId={this.props.id} title={this.props.title} />
			)
		} else
			return null
	}

	createCustom() {
	}

	closeModal() {
		this.setState( { modal: null } )
	}



	render() {
		return(
			<div>
				<div>
					<button className='btn' onClick={ () => this.setState( {modal: 'addToMenu' } ) }>Add to Menu</button>
					<button className='btn' onClick={ () => this.setState( {modal: 'addIngredients' } ) }>Add Ingredients to Shopping List</button>
					<button className='btn' onClick={ () => this.setState( {modal: 'addToFavorites' } ) }>Favorite</button>
					<button className='btn' onClick={this.createCustom}>Create Custom Version</button>
				</div>
				<div>
					<div>
						{this.addToMenu()}
						{this.addIngredients()}
						{this.addToFavorites()}
					</div>
				</div>
			</div>
		)
	}
}

export default RecipeOptions;
