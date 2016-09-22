import React, { Component } from 'react';
import ListIngs from './ListIngs';

class List extends Component {
	constructor(props) {
		super(props);
		this.editList = this.editList.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.state = { list: {} };
	}

	componentWillMount() {
		$.ajax({
			url: `/api/v1/lists/${this.props.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( list => {
			this.setState({ list });
		}).fail( data => {
			console.log(data);
		});
	}

	editList() {
		this.props.history.push(`/lists/${this.state.list.id}/edit`)
	}

	deleteList() {
		$.ajax({
			url: `/api/v1/lists/${this.props.id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( () => {
			this.props.history.push('/lists');
		})
	}

	render() {
		if(this.state) {
			return(
				<div className="row">
	        <div className="col s12">
	          <div className="card blue-grey darken-1">
	            <div className="card-content white-text" onClick={this.revealListIng} >
	              <ListIngs />
	            </div>
	            <div className="card-action">
	            	<button className='btn' onClick={this.editList} >Edit</button>
	            	<button className='btn red' onClick={this.deleteList}>Delete</button>
	            </div>
	          </div>
	        </div>
	      </div>
			)
		} else {
			return(<div>Loading...</div>)
		}
	}
}

export default List;

