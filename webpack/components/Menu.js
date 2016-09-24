import React from 'react';
import MenuRecipeListItem from './MenuRecipeListItem';

class Menu extends React.Component {
	constructor(props) {
		super(props)
		this.displayMenuRecipes = this.displayMenuRecipes.bind(this)
		this.state = { id: '', name: '', recipes: [] }
	}

	componentWillMount() {
		let id = this.props.params.id
		$.ajax({
			url: `/api/v1/menus/${id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( cardInfo => {
			cardInfo = cardInfo.menu
			this.setState( {id: cardInfo.id, name: cardInfo.name, recipes: cardInfo.recipes} )
			console.log(this.state)
		}).fail( data => {
			console.log('Get Menu Failed')
		});
	};

	displayMenuRecipes() {
		let recipes = this.state.recipes.map( recipe => {
			debugger
			return(
				<li key={recipe.menu_rec_id}>
					<MenuRecipeListItem recipe={recipe} />
				</li>
			)
		});
		return recipes
	};

	render() {
		return(
			<div>
				<h3>{this.state.name}</h3>
				<ul>
					{this.displayMenuRecipes()}
				</ul>
			</div>
		)
	}
}

export default Menu