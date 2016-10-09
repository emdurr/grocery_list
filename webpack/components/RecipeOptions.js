import React from 'react';
import MenuSelect from './MenuSelect';
import AddBulkIngredients from './AddBulkIngredients';
import AddToFavorites from './AddToFavorites';

const styles = {
	floatbtn: { margin: '10px'}
}

class RecipeOptions extends React.Component {
	constructor(props) {
		super(props)
		this.addToMenu = this.addToMenu.bind(this)
		this.addBulkIngredients = this.addBulkIngredients.bind(this)
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
				<button  style={ styles.floatbtn } onClick={ () => this.deleteFavorite(this.props.favoriteId)} className="btn-floating btn-medium waves-effect waves grey"><i className="material-icons">star</i></button>
			)
		} else {
			return(
				<button  style={ styles.floatbtn } className="btn-floating btn-medium waves-effect waves yellow" onClick={ () => this.setState( {modal: 'addToFavorites' } ) }><i className="material-icons">star</i></button>
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

	addBulkIngredients() {
		if(this.state.modal === 'addBulkIngredients') {
			return(
				<AddBulkIngredients closeModal={this.closeModal} recipeId={this.props.id} />
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
				<button  style={ styles.floatbtn } className="btn-floating btn-medium waves-effect waves grey" onClick={this.createCustom}><i className="material-icons">C</i></button>
			)
		}
	}



	render() {
		return(
			<div>
				<div className='center'>
					<button style={ styles.floatbtn } className="btn-floating btn-medium waves-effect waves grey" onClick={ () => this.setState( {modal: 'addToMenu' } ) }><i className="material-icons">description</i></button>
					<button  style={ styles.floatbtn } className="btn-floating btn-medium waves-effect waves grey" onClick={ () => this.setState( {modal: 'addIngredients' } ) }><i className="material-icons">list</i></button>
					{this.chooseFavoriteButton()}
					{this.belongsToUser()}
				</div>
				<div>
					<div>
						{this.addToMenu()}
						{this.addBulkIngredients()}
						{this.addToFavorites()}
					</div>
				</div>
			</div>
		)
	}
}

export default RecipeOptions;
