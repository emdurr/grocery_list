import React from 'react';
import { Link } from 'react-router';

class MenuListItem extends React.Component {
	constructor(props) {
		super(props)
		this.displayView = this.displayView.bind(this)
		this.editView = this.editView.bind(this)
		this.editMenu = this.editMenu.bind(this)
		this.toggleEdit = this.toggleEdit.bind(this)
		this.state = { menu: this.props.menu.menu, 
			days: this.props.menu.days, 
			recipes: this.props.menu.recipes,
			edit: false }
	}

	editMenu(e) {
		e.preventDefault();
		let name = this.refs.editMenuName.value;
		$.ajax({
			url: `/api/v1/menus/${this.state.menu.id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { menu: {name} }
		}).done( data => {
			console.log(data)
			this.toggleEdit();
			this.setState( { menu: data } )
		}).fail( data => {
			console.log(data);
		});
	}

	editView() {
		return(
			<div className='card-panel hoverable'>
				<form onSubmit={this.editMenu}>
					<input type='text' defaultValue={this.state.menu.name} required  ref="editMenuName" placeholder='Menu Name' />
					<br />
					<button type='submit' className='btn'>Save</button>
				</form>
				<button onClick={this.toggleEdit} className='btn'>Cancel</button>
			</div>
		)
	}

	displayView() {
		return(
			<div className='card-panel hoverable'>
				<h3> <Link to={`menus/${this.state.menu.id}`}> {this.state.menu.name} </Link> </h3>
				<p> Days Included: {this.state.days} 
				| Recipes Included: {this.state.recipes} </p>
				<button onClick={() => this.props.deleteMenu(this.state.menu.id)} className='btn'>Delete</button>
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

export default MenuListItem;