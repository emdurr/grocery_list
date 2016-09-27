import React, { Component } from 'react';
import { Link } from 'react-router';
import List from './List';
import foodImg from '../images/banana-pancakes.jpg';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	lcard: { fontSize: '30px', color: 'black', backgroundColor: '#D0D7D5' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' },
	food: { height: '900px',
				  position: 'relative',
				  backgroundImage: 'url(' + foodImg + ')',
				  backgroundRepeat: 'no-repeat',
				  backgroundSize: 'cover',
				  boxShadow: '10px 10px 5px #444444' },
	form: { textAlign: 'center', padding: '30px', color: 'white', backgroundColor: 'none'},
	input: { borderBottom: '2px solid white', height: '65px', marginLeft: '5%'},
	logo: { paddingTop: '10px', color: 'white'},
	logoStyle: {margin: '18px'}
}

class Lists extends Component {
	constructor(props) {
		super(props);
		this.handleAddList = this.handleAddList.bind(this);
		this.toggleShowList = this.toggleShowList.bind(this);
		this.listOn = this.listOn.bind(this);
		this.state = { lists: [], showList: [] };
	}

	componentWillMount() {
		$.ajax({
			url: '/api/v1/lists',
			type: 'GET',
			dataType: 'JSON'
		}).done( lists => {
			this.setState({ lists });
		}).fail( data => {
			console.log(data);
		});
	}

	toggleShowList(id) {
		if (this.state.showList.indexOf(id) === -1) {
			this.setState({ showList: [...this.state.showList, id]})
		} else {
			this.setState({ showList: this.state.showList.filter( l => l !== id ) })
		}
	}

	listOn(id) {
		let list;
		this.state.showList.map( listId => {
			if (id === listId) {
				list = <List id={listId} deleteList={this.deleteList} handleChange={this.handleChange} />
			} else {
				return( null )
			}
		})
		return list
	}

	displayLists() {
		let lists = this.state.lists.map( list => {
			return(
				<div className="row" key={list.id}>
	        <div className="col s12">
	          <div className="card" style={ styles.lcard } >
	            <div className="card-content black-text">
								<li>
									<Link to={`/lists/${list.id}`} > { list.name }</Link>
								</li>
							</div>
						</div>
					</div>
				</div>
			)
		})
		return lists;
	}

	handleAddList(e) {
		e.preventDefault();
		let name = this.refs.addName.value;
		$.ajax({
			url: '/api/v1/lists',
			type: 'POST',
			dataType: 'JSON',
			data: { list: { name }}
		}).done( list => {
			this.setState({
				lists: [
					...this.state.lists,
					list
				]
			});
			this.refs.addName.value = '';
		}).fail( data =>{
			console.log(data);
		});
	}

	render() {
		return(
			<div className='container'>
					<div className='row'>
							<div className='col s1 offset-s4'>
								<img src={ logoImg } style={ styles.logoStyle }/>
							</div>
							<div>
								<h1 style={ styles.logo }> Lists</h1>
							</div>
							<div className='container' style={ styles.food }>
								<div style={ styles.form }>
									<form id='addForm' onSubmit={this.handleAddList}>
										<input style={ styles.input } className='col s9 offset-s1' type='text' ref='addName' required/>
										<button type="submit" className=" btn-floating btn-large waves-effect waves grey"><i className="material-icons">add</i>
										</button>
									</form>
									<ul style={ styles.form }>
										{ this.displayLists() }
									</ul>
								</div>
						</div>

				</div>
			</div>
		)
	}
}

export default Lists;
