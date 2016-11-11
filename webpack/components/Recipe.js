import React from 'react';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import RecipeOptions from './RecipeOptions';
import { Link } from 'react-router';

const styles = {
	buttons: { margin: '30px'},
	cbtn: { margin:'5px 0', backgroundColor: 'transparent', width: '100%'},
}

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.updateFavorite = this.updateFavorite.bind(this)
		this.getUser = this.getUser.bind(this);
		this.updateComponent = this.updateComponent.bind(this);
		this.duplicateRecipe = this.duplicateRecipe.bind(this);
		this.state = { recipeHeaderInfo: null,
									 recipeIngredients: null,
									 recipeSteps: null,
									 favorite: null,
									 favoriteId: null,
								 	 favoriteComment: null};
	}

	componentWillMount() {
		this.updateComponent(this.props.params.id)
	};

	componentWillReceiveProps(nextProps) {
    if (nextProps.params.id != this.props.params.id) {
    	this.updateComponent(nextProps.params.id)
    }
	}

	updateComponent(id) {
		$.ajax({
			url: `/api/v1/recipes/${id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			console.log(data);
			this.setState({recipeHeaderInfo: data.recipeHeaderInfo,
				recipeIngredients: data.recipeIngredients,
				recipeSteps: data.recipeSteps,
				favorite: data.favoriteInfo.favorite,
				favoriteId: data.favoriteInfo.favoriteId,
				favoriteComment: data.favoriteInfo.favoriteComment
			});
		}).fail( data => {
			console.log('Get recipe failed')
		});
	};

	updateFavorite(favoriteId, favoriteComment) {
		if (this.state.favorite) {
			this.setState( {favoriteComment: null} )
		} else {
			this.setState( {favoriteComment: favoriteComment})
		}
		this.setState( {favorite: !this.state.favorite, favoriteId: favoriteId} )
	}

	getUser() {
		if(this.state.recipeHeaderInfo.user) {
			return(
				<div>
					<a className='btn' style={ styles.buttons } href={'/recipes/' + this.props.params.id + '/edit'}>Edit</a>
				</div>
			)
		} else {
			return(
				<div>
				</div>
			)
		}
	}

	duplicateRecipe() {
		let recipe_id = this.state.recipeHeaderInfo.id
		$.ajax({
			url: '/api/v1/recipes/duplicate',
			type: 'POST',
			dataType: 'JSON',
			data: { recipe_id }
		}).done( recipe => {
			console.log(recipe.id)
			this.props.history.push(`/recipes/${recipe.id}`)
		}).fail( data => {
			console.log(data);
		});
	}

	render() {
		if(this.state.recipeIngredients && this.state.recipeHeaderInfo && this.state.recipeSteps) {
			return (
				<div style={ styles.cardstyle } className='container'>
					<div className='card'>
						<RecipeHeader recipeHeaderInfo={this.state.recipeHeaderInfo} edit={null} favoriteComment={this.state.favoriteComment} />
						<RecipeOptions favoriteId={this.state.favoriteId} id={this.state.recipeHeaderInfo.id} title={this.state.recipeHeaderInfo.title}
							favorite={this.state.favorite} updateFavorite={this.updateFavorite} user={this.state.recipeHeaderInfo.user}
							duplicateRecipe={this.duplicateRecipe}/>
						<RecipeIngredients recipeIngs={this.state.recipeIngredients} edit={null} />
						<RecipeSteps steps={this.state.recipeSteps} edit={null} />
						<div className='center' >
							{this.getUser()}
						</div>
						<Link className='btn black-text' style={ styles.cbtn } to={'/recipes'} >Back to Recipes</Link>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default Recipe;
