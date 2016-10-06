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
		this.getUser = this.getUser.bind(this);
		this.duplicateRecipe = this.duplicateRecipe.bind(this);
		this.state = { recipeHeaderInfo: null, recipeIngredients: null, recipeSteps: null };
	}

	componentWillMount() {
		$.ajax({
			url: `/api/v1/recipes/${this.props.params.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			this.setState({recipeHeaderInfo: data.recipeHeaderInfo,
				recipeIngredients: data.recipeIngredients,
				recipeSteps: data.recipeSteps
			});
		}).fail( data => {
			console.log('Get recipe failed')
		});
	};

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
		if(this.state.recipeIngredients) {
			return (
				<div style={ styles.cardstyle } className='container'>
					<div className='card'>
						<RecipeHeader {...this.state.recipeHeaderInfo} />
						<RecipeOptions id={this.state.recipeHeaderInfo.id} duplicateRecipe={this.duplicateRecipe} user={this.state.recipeHeaderInfo.user} />
						<RecipeIngredients recipeIngs={this.state.recipeIngredients} edit={null} />
						<RecipeSteps steps={this.state.recipeSteps} edit={null} />
						<div className='center' >
							{this.getUser()}
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
