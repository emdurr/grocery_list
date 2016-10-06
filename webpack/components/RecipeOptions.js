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
		this.chooseFavoriteButton = this.chooseFavoriteButton.bind(this)
		this.deleteFavorite = this.deleteFavorite.bind(this)
		this.belongsToUser = this.belongsToUser.bind(this);
		this.state = { modal: null }
	}

	chooseFavoriteButton() {
		if(this.props.favorite) {
			return(
				<button onClick={ () => this.deleteFavorite(this.props.favoriteId)} className='btn'>Unfavorite</button>
			)
		} else {
			return(
				<button className='btn' onClick={ () => this.setState( {modal: 'addToFavorites' } ) }>Favorite</button>
			)
		}
	}

	deleteFavorite(favoriteId) {
		$.ajax({
			url: `/api/v1/favorites/${favoriteId}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done(data => {
			this.props.updateFavorite()
		}).fail(data => {
			console.log(data)
		})
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
				<AddToFavorites closeModal={this.closeModal} recipeId={this.props.id}
				title={this.props.title} updateFavorite={this.props.updateFavorite} />
			)
		} else
			return null
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
					{this.chooseFavoriteButton()}
					<button className='btn' onClick={this.addToFavorites}>Favorite</button>
						{ this.belongsToUser() }
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
