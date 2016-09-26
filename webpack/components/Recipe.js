import React, { Component } from 'react';

class Recipe extends Component {
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
			 <span>{ name }</span>
			 <p>{ description }</p>
			 <p>{ directions }</p>
			</div>
		)
	}
}

export default Recipe;
