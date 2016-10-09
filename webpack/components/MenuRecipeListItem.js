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
					Day: <input autoFocus={focus} onBlur={this.editMenuRec} type='text' defaultValue={recipe_info.day} required ref="editRecipeDay" placeholder='Recipe day' />
				<h3> {recipe_info.name} </h3>
				<p>Ingredients: {recipe_info.ingredients_count ? recipe_info.ingredients_count : '0' } </p>
			</div>
		)
	}

	displayView() {
		let recipe_info = this.state.recipe_info
		return(
			<div className='card-panel hoverable'>
				<p> Day: {recipe_info.day} </p>
				<h3> <Link to={`recipes/${this.state.recipe_info.recipe_id}`}> {recipe_info.name} </Link> </h3>
				<p>Ingredients: {recipe_info.ingredients_count ? recipe_info.ingredients_count : '0' } </p>
				<button onClick={() => this.props.deleteMenuRec(recipe_info.menu_rec_id)} className=" btn-floating btn-medium waves-effect waves grey"><i className="material-icons">delete</i></button>
				<button onClick={this.toggleEdit} className=" btn-floating btn-medium waves-effect waves grey"><i className="material-icons">edit</i></button>
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
