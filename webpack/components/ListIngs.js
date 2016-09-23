import React, { Component } from 'react';
import { Link } from 'react-router';

const styles = {
	addBtn: { fontSize: '18px' }
}

class ListIngs extends Component {
	constructor(props) {
		super(props);
		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.displayIngredients = this.displayIngredients.bind(this);
		this.state = { list_id: this.props.id , listIngredients: [] };
	}

	componentWillMount() {
		$.ajax({
			url: `/api/v1/lists/${this.props.id}/list_ings`,
			type: 'GET',
			dataType: 'JSON'
		}).done( listIngredients => {
			this.setState({ listIngredients });
		}).fail( data => {
			console.log(data);
		});
	}

	displayIngredients() {
		let listIngredients = this.state.listIngredients.map( ingredient => {
			return(
				<div className="row" key={ingredient.id}>
	        <div className="col s12">
	          <div className="card yellow darken-1" style={ styles.lcard } >
	            <div className="card-content black-text">
								<li>
									<p>{ ingredient }</p>
								</li>
							</div>
						</div>
					</div>
				</div>
			)
		})
		return listIngredients;
	}

	handleAddIngredient(e) {
		e.preventDefault();
		let name = this.refs.addName.value;
		$.ajax({
			url: `/api/v1/lists/${this.state.list_id}/list_ings`,
			type: 'POST',
			dataType: 'JSON',
			data: { list_ing: { name }}
		}).done( list => {
			this.setState({
				listIngredients: [
					...this.state.listIngredients,
					list
				]
			});
			this.refs.addName.value = '';
		}).fail( data =>{
			console.log(data);
		});
	}

	render() {
  	return (
    	<div>
    		<form id='addIngredientForm' onSubmit={this.handleAddIngredient}>
					<input type='text' ref='addName' />
					<button style={ styles.addBtn } type="submit">Add</button>
				</form>
				<ul>
					{ this.displayIngredients() }
				</ul>
    	</div>
    )
	}
}

export default ListIngs;