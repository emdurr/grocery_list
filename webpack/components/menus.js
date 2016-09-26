import React from 'react';
import { Link } from 'react-router';
import MenuListItem from './MenuListItem';

class Menus extends React.Component {
	constructor(props) {
		super(props)
		this.displayMenus = this.displayMenus.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
		this.deleteMenu = this.deleteMenu.bind(this)
		this.state = { menus: [] }
	}

	componentWillMount() {
		$.ajax({
			url: "/api/v1/menus",
			type: 'GET',
			dataType: 'JSON'
		}).done( menus => {
			this.setState( {menus: menus} )
		}).fail( data => {
			console.log('Get menus failed')
		});
	};

	handleCreate(e) {
		e.preventDefault()
		let name = this.refs.menuName.value
		$.ajax({
			url: '/api/v1/menus',
			type: 'POST',
			dataType: 'JSON',
			data: { menu: { name } }
		}).done( menu => {
			this.setState({
			menus: [ {menu, days: 0, recpies: 0 }, ...this.state.menus ]
			});
			this.refs.menuForm.reset();
		}).fail( data => {
			console.log('this failed')
		})
	}

	deleteMenu(id) {
		$.ajax({
			url: `api/v1/menus/${id}`,
			type: 'Delete',
			dataType: 'JSON'
		}).done( data => {
			let menus = this.state.menus;
			let deleteIndex = menus.findIndex( menu => menu.menu.menu_rec_id === id );
			this.setState({
				menus: [...menus.slice(0, deleteIndex), ...menus.slice(deleteIndex + 1, menus.length)]
			})
		}).fail( data => {
			console.log(data);
		});
	}

	displayMenus() {
		let menus = this.state.menus.map( menu => {
			return(
				<li key={menu.menu.id}> <MenuListItem menu={menu}
				deleteMenu={this.deleteMenu} /> 
				</li>
			)
		});
		return menus
	};

	render() {
		return(
			<div>
				<div>
					<form onSubmit={this.handleCreate} ref='menuForm'>
						<input type='text' ref='menuName' required placeholder='Menu Name' />
						<input type='submit' className='btn' />
					</form>
				</div>
				<ul>
					{ this.displayMenus() }
				</ul>
			</div>
		)
	};
};

export default Menus;