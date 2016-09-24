import React from 'react';
import { Link } from 'react-router';
import MenuListItem from './MenuListItem';

class Menus extends React.Component {
	constructor(props) {
		super(props)
		this.displayMenus = this.displayMenus.bind(this)
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

	displayMenus() {
		let menus = this.state.menus.map( menu => {
			return(
				<li key={menu.menu.id}> <MenuListItem days={menu.days} 
				recipes={menu.recipes} 
				menu={menu.menu} /> </li>
			)
		});
		return menus
	};

	render() {
		return(
			<div>
				<ul>
					{ this.displayMenus() }
				</ul>
			</div>
		)
	};
};

export default Menus;