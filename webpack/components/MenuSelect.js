import React from 'react';
import { Link } from 'react-router';

let backdropStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  zIndex: '9998',
  background: 'rgba(0, 0, 0, 0.3)'
}

let modalStyle = {
  position: 'absolute',
  height: '80vh',
  width: '80vw',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#fff',
  padding: '50px'
}

class MenuSelect extends React.Component {
	constructor(props) {
		super(props)
		this.daySelectOptions = this.daySelectOptions.bind(this)
		this.addToMenu = this.addToMenu.bind(this)
		this.getDayOptions = this.getDayOptions.bind(this)
		this.addNewDay = this.addNewDay.bind(this)
		this.state = { menus: null, menu_id: null, days: null, addDayView: false }
	}

	componentWillMount() {
		$.ajax({
			url: '/api/v1/menus/simple_list',
			type: 'GET',
			dataType: 'JSON'
		}).done( menus => {
			this.setState( { menus: menus.menus } )
		}).fail( data => {
		console.log(data)
		});
	};

	menuSelectOptions() {
		if(this.state.menus) {
			let menus = this.state.menus.map( menu => {
				return(
					<button key={menu.id} className='btn' onClick={() => this.getDayOptions(menu.id)}> {menu.name} </button>
				)
			});
			if(menus.length > 0) {
				return(
					<div>
						<h5> Menus Available: </h5>
						 {menus}
					 </div>
				)	 
			} else {
				return(
					<div>
					<h4> Create a menu before adding recipes </h4>
					<h4> <Link to='/menus'>Menus</Link> </h4>
					</div>
				)
			}
		} else {
			return null
		}
	}

	getDayOptions(menu_id) {
		$.ajax({
			url: '/api/v1/menu_recs/days_list',
			type: 'GET',
			dataType: 'JSON',
			data: { menu_id: menu_id }
		}).done( days => {
			if (!days.includes("General")) {
				days.unshift("General")
			}
			this.setState( {days: days, menu_id: menu_id} )
		}).fail( data => {
			console.log(data)
		});
	};

	daySelectOptions() {
		let days
		if(this.state.days) {
			let i = 0
			days = this.state.days.map( day => {
				return(
					<button className='btn' onClick={() => this.addToMenu(this.state.menu_id, day )} key={day} value={day}>{day}</button>
				)
				i += 1
			});
		} else {
			return null
		}
		return(
		 	<div className='row'>
			 	<h5 className='col s12'> Assign to Day </h5>
			 	<div className=' col s12'>
			 	{days}
			 	</div>
		 	</div>
		 )
	};

	addNewDay() {
		if(this.state.days && !this.state.addDayView) {
			return(
				<button className='btn' onClick={() => this.setState( { addDayView: true} ) }>Assign to New Day</button>
			)
		} else if(this.state.days && this.state.addDayView) {
			return(
				<div className='row col s6'>
					<input className='col s6' ref='newDay' type='text'/>
					<button className='btn col s2' onClick={() => this.addToMenu(this.state.menu_id, this.refs.newDay.value)}> Add </button>
				</div>
			)
		} else {
			return null
		}
	}

	addToMenu(menu_id, day) {
		$.ajax({
			url: '/api/v1/menu_recs',
			type: 'POST',
			dataType: 'JSON',
			data: { menu_rec: {menu_id: menu_id, recipe_id: this.props.recipeId, day: day} }
		}).done( data => {
			console.log(data)
			this.props.closeModal()
		}).fail( data => {
			console.log(data)
		});
	};


	render() {
		return(
			<div style={backdropStyle}>
				<div style={modalStyle}>
					<div>
						{this.menuSelectOptions()} <br />
						{this.daySelectOptions()} 
						{this.addNewDay()} <br />
						<button className='btn' onClick={this.props.closeModal}>Cancel</button>
					</div>
				</div>
			</div>
		)
	}
}

export default MenuSelect;