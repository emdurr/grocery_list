import React, { Component } from 'react';
import ListIngs from './ListIngs';
import logoImg from '../images/ilarder_logo.png';
import { Link } from 'react-router';

const styles = {
	cbtn: { margin:'5px 8px', backgroundColor: 'transparent'},
	lhead: { backgroundColor: '#3B4743', padding: '10px', color: 'white'},
	logo: { paddingRight: '10px'}

}

class List extends Component {
	constructor(props) {
		super(props);
		this.editView = this.editView.bind(this);
		this.listShow = this.listShow.bind(this);
		this.toggleEditList = this.toggleEditList.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.state = { list: null, showEdit: false };
	}

	componentWillMount() {
		$.ajax({
			url: `/api/v1/lists/${this.props.params.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			this.setState({ list: data.list });
		}).fail( data => {
			console.log(data);
		});
	}

	toggleEditList(id) {
		this.setState({ showEdit: !this.state.showEdit })
	}

  listShow() {
  	return(
			<div className="container">
				<div className="row">
	        <div className="col s12">
	          <div className="card">
		          <h3 style={ styles.lhead } className='center' >
							<img src={ logoImg }/> {this.state.list.name}</h3>
		          <div className="card-content black-text" onClick={this.revealListIng} >
	              <ListIngs list={this.state.list} />
	            </div>
	            <div className="card-action">
							<div className='row'>
	            	<button className='col s11 m3 btn  black-text' style={ styles.cbtn } onClick={() => this.toggleEditList()} >Edit List Name</button>
	            	<button className='col s11 m2 btn black-text' style={ styles.cbtn } onClick={() => this.deleteList(this.state.list.id)}>Delete List</button>
	            	<Link className= 'col s11 m2 btn black-text' style={ styles.cbtn } to={'/pantry'} >Pantry</Link>
								<Link className='col s11 m2 btn black-text' style={ styles.cbtn } to={'/lists'} >Back to Lists</Link>
								</div>
						  </div>
	          </div>
	        </div>
	      </div>
			</div>
		)
  }

  editView() {
  	return(
			<div className="row">
				<div className="container">
	        <div className="col s12">
	          <div className="card" >
							<h5 className='center' style={ styles.lhead }>Edit List Name</h5>
	            <div className="card-content black-text" >
	            	<form onSubmit={(e) => this.handleChange(e, this.state.list.id)}>
	            		<input type='text' defaultValue={this.state.list.name} required  ref="editName" placeholder='List Name' />
	            		<button className='btn black-text' style={ styles.cbtn } type='submit'>Save</button>
									<button className='btn black-text' style={ styles.cbtn } onClick={this.toggleEditList} >Cancel</button>
								</form>
	            </div>
	            <div className="card-action">
	            </div>
	            <Link className='btn black-text' style={ styles.cbtn } to={'/lists'} >Back to Lists</Link>
	          </div>
	        </div>
	      </div>
			</div>
		)
  }

	handleChange(e, id) {
    e.preventDefault();
    let name = this.refs.editName.value;
    $.ajax({
      url: `/api/v1/lists/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { list: { name } }
    }).done( data => {
      this.setState({ list: data.list, showEdit: !this.state.showEdit });
    });
  }

  deleteList(id) {
		let lists = this.state.lists;
		$.ajax({
			url: `/api/v1/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( () => {
			this.props.history.push('/lists');
		});
	}

	render() {
		if(this.state.list) {
			if (this.state.showEdit) {
				return(this.editView())
			} else {
				return(this.listShow())
			}
		} else {
			return(
				<div className="row">
	        Loading...
	      </div>
			)
		}
	}
}

export default List;
