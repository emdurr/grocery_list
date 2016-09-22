import React, { Component } from 'react';
import { Link } from 'react-router';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
}

class Lists extends Component {
	constructor(props) {
		super(props);
		this.handleAddList = this.handleAddList.bind(this);
		this.state = { lists: [] };
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

	displayLists() {
		let lists = this.state.lists.map( list => {
			return(
				<div className="row" key={list.id}>
	        <div className="col s12">
	          <div className="card yellow darken-1" style={ styles.lcard } >
	            <div className="card-content white-text">
								<li>
									<Link to={`lists/${list.id}`}>{ list.name } </Link>
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