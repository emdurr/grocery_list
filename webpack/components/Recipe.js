import React from 'react';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = { recipe: {} };
  }

	componentWillMount() {
		$.ajax({
			url: `/api/v1/recipes/${this.props.params.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			this.setState({recipe: data.recipe});
		}).fail( data => {
			console.log('Get recipe failed')
		});
	};


	render() {
		let { name, description, directions} = this.state.recipe;
		return (
			<div>
				<h3>{recipe.title}</h3>
				
			</div>
		)
	}
}

export default Recipe;
