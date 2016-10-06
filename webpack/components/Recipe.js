import React from 'react';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import RecipeOptions from './RecipeOptions';

const styles = {
	cardstyle: { backgroundColor: 'red'},
	buttons: { margin: '30px'},
}

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.updateFavorite = this.updateFavorite.bind(this)

		this.state = { recipeHeaderInfo: null, recipeIngredients: null, recipeSteps: null, favorite: null, favoriteId: null};
	}

	componentWillMount() {
		$.ajax({
			url: `/api/v1/recipes/${this.props.params.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			this.setState({recipeHeaderInfo: data.recipeHeaderInfo,
				recipeIngredients: data.recipeIngredients,
				recipeSteps: data.recipeSteps,
				favorite: data.favoriteInfo.favorite,
				favoriteId: data.favoriteInfo.favoriteId
			});
		}).fail( data => {
			console.log('Get recipe failed')
		});
	};

	updateFavorite(favoriteId) {
		this.setState( {favorite: !this.state.favorite, favoriteId: favoriteId} )
	}

	render() {
		if(this.state.recipeIngredients) {
			return (
				<div style={ styles.cardstyle } className='container'>
					<div className='card'>
						<RecipeHeader {...this.state.recipeHeaderInfo} />
						<RecipeOptions favoriteId={this.state.favoriteId} id={this.state.recipeHeaderInfo.id} title={this.state.recipeHeaderInfo.title}
							favorite={this.state.favorite} updateFavorite={this.updateFavorite} />
						<RecipeIngredients recipeIngs={this.state.recipeIngredients} edit={null} />
						<RecipeSteps steps={this.state.recipeSteps} edit={null} />
						<div className='center' >
							<a className='btn' style={ styles.buttons } href={'/recipes/' + this.props.params.id + '/edit'}>Edit</a>
						</div>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default Recipe;
