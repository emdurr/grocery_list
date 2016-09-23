import React, { Component } from 'react';
import { Link } from 'react-router';
import List from './List';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
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
				list = <List id={listId} />
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
	          <div className="card yellow darken-1" style={ styles.lcard } >
	            <div className="card-content black-text">
								<li>
									<p onClick={ () => this.toggleShowList(list.id)}>{ list.name }</p>
									{ this.listOn(list.id) }
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
			<div className='center container'>
				<h1>Lists</h1>
				<form id='addForm' onSubmit={this.handleAddList}>
					<input type='text' ref='addName' />
					<button type="submit">Add</button>
				</form>
				<ul>
					{ this.displayLists() }
				</ul>
			</div>
		)
	}
}

export default Lists;