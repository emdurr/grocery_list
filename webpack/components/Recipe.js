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
				<div style={ styles.cardstyle } className='container'>
					<div className='card'>
						<RecipeHeader {...this.state.recipeHeaderInfo} />
						<RecipeOptions id={this.state.recipeHeaderInfo.id} title={this.state.recipeHeaderInfo.title} />
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
