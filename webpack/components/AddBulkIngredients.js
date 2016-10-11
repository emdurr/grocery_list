import React from 'react';
import BulkIngredientListItem from './BulkIngredientListItem';

const styles = {
	backdropStyle: {

		position: 'fixed',
		width: '100%',
		height: '100%',
		top: '0px',
		left: '0px',
		zIndex: '9998',
		background: 'rgba(0, 0, 0, 0.3)'
	},

	modalStyle: {
		maxHeight: 'calc(100vh - 50px)',
		overflowY: 'auto',
		position: 'fixed',
		width: '75%',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '9999',
		background: '#fff',
		padding: '20px'
	},

	outerCenter: {
		width: '100%',
		textAlign: 'center',
		margin: '0'
	},

	innerCenter: {
		display: 'inline-block',
		padding: '10px'
	},

	button: {
		margin: '5px'
	}
}

var ingredientsOnPage = 0

class AddBulkIngredients extends React.Component {
	constructor(props) {
		super(props)

		this.displayIngredients = this.displayIngredients.bind(this)
		this.generateListsList = this.generateListsList.bind(this)
		this.submitAll = this.submitAll.bind(this)

		this.state = { ingredientsBundle: null, listOptions: null, lists: null }
	}

	componentWillMount() {
		let id = this.props.recipeId
		$.ajax({
			url: `/api/v1/recipes/${id}/ingredients`,
			type: 'GET',
			dataType: 'JSON'
		}).done( data => {
			this.setState( {listOptions: data.listOptions,
				ingredientsBundle: data.ingredientsBundle } )
			this.generateListsList()
		}).fail( data => {
			console.log(data)
		});
	};


	displayIngredients(lists) {
		let ingredients = this.state.ingredientsBundle.map( (ing, i) => {
		 	return(
				<BulkIngredientListItem key={i} ing={ing} lists={lists} ref={'ing' + i}/>
			)
		})
		return ingredients
	}

	generateListsList() {
		let lists = this.state.listOptions.map( list => {
			return(
				<option key={list.listId} value={list.listId}>{list.listName}</option>
			)
		})
		this.setState( {lists: lists} )
	}

	submitAll() {
		let ingsCount = this.state.ingredientsBundle.length
		for (let i = 0; i < ingsCount; i++) {
			console.log('ing' + i)
			this.refs['ing' + i].handleCreate()
		}
		this.props.closeModal()
	}



	render() {
		if (this.state.lists) {
			return(
				<div style={styles.backdropStyle}>
					<div style={styles.modalStyle}>
						{ this.displayIngredients(this.state.lists) }
						<div className='row' style={styles.outerCenter}>
							<div style={styles.innerCenter}>
								<button className='btn valign' style={styles.button} onClick={this.props.closeModal}>
									Cancel
								</button>
								<button className='btn valign' style={styles.button} onClick={this.submitAll}>
									Add All
								</button>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default AddBulkIngredients;
