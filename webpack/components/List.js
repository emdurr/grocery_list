import React, { Component } from 'react';
import ListIngs from './ListIngs';

const styles = {
	cbtn: { margin: '20px', border: '1px solid grey', borderRadius: '15px' },
}

class List extends Component {
	constructor(props) {
		super(props);
		this.toggleEditList = this.toggleEditList.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.state = { list: {}, showEdit: false };
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

	toggleEditList() {
		this.setState({ showEdit: !this.state.showEdit })
	}

	editList() {
		if (this.state.showEdit === true) {
			this.props.listEdit();
		} else {
			render( null )
		}
	}

	handleChange(e) {
    e.preventDefault();
    let name = this.refs.editName.value;
    $.ajax({
      url: `/api/v1/lists/${this.props.params.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { list: { name } }
    }).done( name => {
      this.setState({ name })
    })
  }

	deleteList() {
		$.ajax({
			url: `/api/v1/lists/${this.props.id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( ( data ) => {
			this.props.history.push('/lists');
		})
	}

	render() {
		if(this.state) {
			return(
				<div className="row">
	        <div className="col s12">
	          <div className="card yellow">
	            <div className="card-content black-text" onClick={this.revealListIng} >
	              <ListIngs />
	            </div>
	            <div className="card-action">
	            	<button className='btn yellow lighten-3 black-text' style={ styles.cbtn } onClick={this.toggleEditList} >Edit List Name</button>
	            	<button className='btn yellow lighten-3 black-text' style={ styles.cbtn } onClick={this.deleteList}>Delete List</button>
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

