import React from 'react';
import MenuRecipeListItem from './MenuRecipeListItem';

class Menu extends React.Component {
	constructor(props) {
		super(props)
		this.deleteMenuRec = this.deleteMenuRec.bind(this)
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

	deleteMenuRec(id) {
		$.ajax({
			url: `/api/v1/menu_recs/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let recipes = this.state.recipes;
			let deleteIndex = recipes.findIndex( recipe => recipe.menu_rec_id === id );
			this.setState({
				recipes: [...recipes.slice(0, deleteIndex), ...recipes.slice(deleteIndex + 1, recipes.length)]
			})
		}).fail( data => {
			console.log(data);
		});
	}

	displayMenuRecipes() {
		let recipes = this.state.recipes.map( recipe => {
			return(
				<li key={recipe.menu_rec_id}>
					<MenuRecipeListItem recipe={recipe} deleteMenuRec={this.deleteMenuRec} />
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