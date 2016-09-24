import React, { Component } from 'react';
import ListIngs from './ListIngs';

const styles = {
	cbtn: { margin: '20px', border: '1px solid grey', borderRadius: '15px' },
}

class List extends Component {
	constructor(props) {
		super(props);
		this.toggleEditList = this.toggleEditList.bind(this);
		this.state = { list: null, showEdit: false };
	}

	componentWillMount() {
		$.ajax({
			url: `/api/v1/lists/${this.props.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			this.setState({ list: data.list });
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
      url: `/api/v1/lists/${this.props.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { list: { name } }
    }).done( name => {
      this.setState({ name })
    })
  }

	render() {
		if(this.state.list) {
			return(
				<div className="row">
	        <div className="col s12">
	          <div className="card yellow">
	            <div className="card-content black-text" onClick={this.revealListIng} >
	              <ListIngs list={this.state.list} />
	            </div>
	            <div className="card-action">
	            	<button className='btn yellow lighten-3 black-text' style={ styles.cbtn } onClick={this.toggleEditList} >Edit List Name</button>
	            	<button className='btn yellow lighten-3 black-text' style={ styles.cbtn } onClick={() => this.props.deleteList(this.props.id)}>Delete List</button>
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

