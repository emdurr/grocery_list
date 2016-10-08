import React from 'react';
import ListSelect from 'react';

const styles = {

	border: {
		borderBottom: '1px solid black',
		paddingLeft: '20px',
		paddingRight: '20px'
	},

	h5Smaller: {
		fontSize: '1.25rem',
		marginBottom: '0px'
	},

	pantryNote: {
		fontSize: '.8rem',
		fontStyle: 'italic',
		marginTop: '0',
		marginBottom: '5px'
	},

	smallerRow: {
		marginBottom: '-5px'
	},

	closedCheck: {
		marginBottom: '15px'
	}
}

class BulkIngredientListItem extends React.Component {
	constructor(props) {
		super(props)
		this.toggleConfirm = this.toggleConfirm.bind(this)
		this.showQuantity = this.showQuantity.bind(this)
		this.showList = this.showList.bind(this)

		this.state = { confirm: true, quantity: 1, listId: null }
	}

	toggleConfirm() {
		if(this.state.confirm === true) {
			this.setState( {quantity: 0 } )
		} else {
			this.setState( { quantity: 1 } )
		}
		this.setState( { confirm: !this.state.confirm } )
	}

	showQuantity() {
		if (this.state.confirm) {
			return(
				<div className='col s4 valign center'>
					<input type='number' defaultValue={this.state.quantity} onChange={ (e) => this.setState( {quantity: e.target.value} ) }/>
				</div>
			)
		} else {
			return null
		}
	}

	showList() {
		if (this.state.confirm) {
			return(
				<div className='col s6 valign center'>
					<select className='browser-default' ref='listId' onChange={ (e) => this.setState( {listId: e.target.value} ) }>
						{this.props.lists}
					</select>
				</div>
		)
		} else {
			return null
		}
	}

	handleCreate() {
		console.log(this.props.ing.ingredientName)
		let ing = this.props.ing
		if (this.state.confirm === true) {
			$.ajax({
				url: '/api/v1/list_ings',
				type: 'POST',
				dataType: 'JSON',
				data: { list_id: this.state.listId, 
					ingredient: { name: ing.ingredientName },
					list_ing: { qty_to_buy: this.state.quantity} }
			}).done( data => {
				console.log(data)
			}).fail( data => {
				console.log(data)
			})
		} else {
			null
		}
	}

	componentDidMount() {
		this.setState( {listId: this.refs.listId.value})
	}

	render() {
		let ing = this.props.ing
		return(
			<div style={styles.border}>
				<div className='row' style={styles.smallerRow}>
					<h5 style={styles.h5Smaller}> {ing.description} </h5>
					<p style={styles.pantryNote}> {ing.inStock ? `Qty in Pantry: ${ing.qtyInStock}` : 'Not in Pantry' } </p>
				</div>
				<div className='row valign-wrapper' style={styles.smallerRow}>
					{this.showList()}
					{this.showQuantity()}
					<div className='col s2 valign center'>
						<input id={ing.ingredientId} type='checkbox' ref='checkbox' value={this.state.confirm} defaultChecked={true} onChange={this.toggleConfirm} className='browser-default'/>
						<label htmlFor={ing.ingredientId} className='valign' style={styles.closedCheck} />
					</div>
				</div>
			</div>
		)
	}
}

export default BulkIngredientListItem;