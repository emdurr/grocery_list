import React from 'react';
import { Link } from 'react-router';
import MenuListItem from './MenuListItem';
import logoImg from '../images/ilarder_logo.png';
import foodImg from '../images/banana-pancakes.jpg';

const styles = {
	title: { color: 'white'},
	input: { borderBottom: '2px solid #414E49', height: '80px', marginLeft: '70px', fontSize: '180%'},
	food: { height: '900px',
					position: 'relative',
					backgroundImage: 'url(' + foodImg + ')',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					boxShadow: '10px 10px 5px #444444' },
	form: { textAlign: 'center', padding: '20px', color: 'white'},
	logoStyle: { color: 'white'},
	logo: { paddingTop: '10px', color: 'white'},
}

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
			menus: [ {menu, days: 0, recipes: 0 }, ...this.state.menus ]
			});
			this.refs.addForm.reset();
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
			let deleteIndex = menus.findIndex( menu => menu.menu.id === id );
			this.setState({
				menus: [...menus.slice(0, deleteIndex), ...menus.slice(deleteIndex + 1, menus.length)]
			});
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
			<div className='container center'>
					<div className='row'>
							<div>

							</div>
							<div>
								<h1 style={ styles.logo }><img src={ logoImg } style={ styles.logoStyle }/> Menu Lists</h1>
							</div>
							<div className='container' style={ styles.food }>
								<div style={ styles.form }>
									<form ref='addForm' id='addForm' onSubmit={this.handleCreate}>
										<input style={ styles.input } className='col s9 offset-s1' type='text' ref='menuName' required placeholder='Enter Menu Name'/>
										<button type="submit" className=" btn-floating btn-medium waves-effect waves grey"><i className="material-icons">add</i>
										</button>
									</form>
									<ul style={ styles.form }>
										{ this.displayMenus() }
									</ul>
								</div>
						</div>

				</div>
			</div>
		)
	};
};

export default Menus;
