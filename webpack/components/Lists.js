import React, { Component } from 'react';
import { Link } from 'react-router';
import List from './List';
import foodImg from '../images/banana-pancakes.jpg';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	lcard: { fontSize: '30px', color: 'black', backgroundColor: '#D0D7D5', padding: '6px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' },
	food: { height: 'auto',
				  position: 'relative',
				  backgroundImage: 'url(' + foodImg + ')',
				  backgroundRepeat: 'no-repeat',
				  backgroundSize: 'cover',
				  boxShadow: '10px 10px 5px #444444' },
	form: { textAlign: 'center', padding: '30px', color: 'white', backgroundColor: 'none'},
	input: { borderBottom: '2px solid #414E49', height: '65px', marginLeft: '5%'},
	logo: { color: 'white'},
	floatbtn: { margin: '20px 0 0 10px'}

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
						<Link to={`/lists/${list.id}`} >
		        <div className="card" style={ styles.lcard } >
		          <div className="black-text">
								<li>
									{ list.name }
								</li>
							</div>
						</div>
						</Link>
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
					<div>
						<h3 style={ styles.logo } className='center'><img src={ logoImg }/> Lists</h3>
					</div>
					<div className='container' style={ styles.food }>
						<div style={ styles.form }>
							<form className='col s9' id='addForm' onSubmit={this.handleAddList}>
								<input style={ styles.input }  type='text' ref='addName' required />
							</form>
							<div className='col s2' style={ styles.floatbtn }>
								<button type="submit" className="btn-floating btn-medium waves-effect waves grey">
								<i className="material-icons">add</i></button>
							</div>
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
