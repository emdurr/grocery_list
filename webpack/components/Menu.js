import React from 'react';

class Menu extends React.Component {
	constructor(props) {
		super(props)
		this.displayMenuRecipes = this.displayMenuRecipes.bind(this)
		this.state = { menu: {}, recipes: [] }
	}

	componentWillMount() {
		let id = this.props.params.id
		$.ajax({
			url: `/api/v1/menus/${id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( hash => {
			this.setState( {menu: hash.menu, recipes: hash.recipes} )
			console.log(this.state)
		}).fail( data => {
			console.log('Get Menu Failed')
		});
	};

	displayMenuRecipes() {
		let recipes = this.state.recipes.map( recipe => {
			return(
				<li key={recipe.id}>
					<p> {recipe.name} {recipe.id} </p>
				</li>
			)
		});
		return recipes
	};

	render() {
		return(
			<div>
				<h3>{this.state.menu.name}</h3>
				<ul>
					{this.displayMenuRecipes()}
				</ul>
			</div>
		)
	}
}

export default Menu