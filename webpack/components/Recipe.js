import React from 'react';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
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
 

	render() {
		if(this.state.recipeIngredients) {
			return (
				<div className='container'>
					<div className='card'>
						<RecipeHeader {...this.state.recipeHeaderInfo} />
						<RecipeIngredients recipeIngs={this.state.recipeIngredients} edit={null} />
						<RecipeSteps steps={this.state.recipeSteps} edit={null} />
						<a href={'/recipes/' + this.props.params.id + '/edit'}>Edit</a>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default Recipe;
