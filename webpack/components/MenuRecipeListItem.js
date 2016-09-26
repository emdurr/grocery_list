import React from 'react';
import { Link } from 'react-router';

class MenuRecipeListItem extends React.Component {
	constructor(props) {
		super(props)
		this.displayView = this.displayView.bind(this)
		this.editView = this.editView.bind(this)
		this.editMenuRec = this.editMenuRec.bind(this)
		this.toggleEdit = this.toggleEdit.bind(this)
		this.state = { recipe_info: this.props.recipe, edit: false }
	}

	editMenuRec(e) {
		e.preventDefault();
		let day = this.refs.editRecipeDay.value;
		$.ajax({
			url: `/api/v1/menu_recs/${this.state.recipe_info.menu_rec_id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { menu_rec: { day } }
		}).done( data => {
			console.log(data)
			debugger
			this.toggleEdit();
			this.setState( { recipe_info: data.recipe_info } )
		}).fail( data => {
			console.log(data);
		});
	}

	editView() {
		let recipe_info = this.state.recipe_info
		return(
			<div className='card-panel hoverable'>
				<form onSubmit={this.editMenuRec}>
					Day: <input type='text' defaultValue={recipe_info.day} required ref="editRecipeDay" placeholder='Recipe day' />
					<button type='submit' className='btn'>Save</button>
				</form>
				<button onClick={this.toggleEdit} className='btn'>Cancel</button>
				<h3> {recipe_info.name} </h3>
				<p>Ingredients: {recipe_info.ingredient_count ? recipe_info.ingredient_count : '0' } </p>
			</div>
		)
	}

	displayView() {
		let recipe_info = this.state.recipe_info
		return(
			<div className='card-panel hoverable'>
				<p> Day: {recipe_info.day} </p>
				<h3> <Link to={`recipes/${this.state.recipe_info.recipe_id}`}> {recipe_info.name} </Link> </h3>
				<p>Ingredients: {recipe_info.ingredient_count}</p>
				<button onClick={() => this.props.deleteMenuRec(recipe_info.menu_rec_id)} className='btn'>Delete</button>
				<button onClick={this.toggleEdit} className='btn'>Edit</button>
			</div>
		)
	}

	toggleEdit() {
		this.setState( { edit: !this.state.edit } );
	}

	render() {
			if(this.state.edit)
				return(this.editView());
			else
				return(this.displayView());
	}
}

export default MenuRecipeListItem;