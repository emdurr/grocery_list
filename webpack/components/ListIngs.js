import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class ListIngs extends Component {
	constructor(props) {
		super(props);
		this.state = { list_ings: [] };
	}

	handleAddItem() {
		let newListIngs = this.state.list_ings.concat([prompt('Enter some text')]);
		this.setState({list_ings: newListIngs});
	}

	handleRemove(i) {
		var newListIngs = this.state.list_ings.slice();
		newListIngs.splice(i, 1);
		this.setState({list_ings: newListIngs});
	}

	render() {
		let list_ings = this.state.list_ings.map( (list_ing, i) => {
			return(
				<div key={list_ing} onClick={this.handleRemove.bind(this, i)}>
       	 	{list_ing}
      	</div>
			)
		})
  	return (
    	<div>
     	  <button onClick={this.handleAddItem}>Add List Ingredient</button>
      	<ReactCSSTransitionGroup 
        	transitionName="example" 
        	transitionEnterTimeout={500} 
        	transitionLeaveTimeout={300}>
        	{list_ings}
      	</ReactCSSTransitionGroup>
    	</div>
    )
	}
}

export default ListIngs;