import React from 'react';

const styles = {
	form: { margin: '0 15px'},

	tab_buttons: {
		backgroundColor: '#D0d7d5',
		color: 'black',
		borderRadius: '3px 3px 0px 0px',
		boxShadow: 'none',
		fontSize: '90%'},

	spaced: {margin: '0 5px'},
	tabbox: { borderBottom: '1px solid gray',	marginLeft: '15px'},
	nextbtn: { margin: '10px 10px 0 0',},
	searchbtn: { padding: '10px 10px 0 0' }
}

var timeElapsed;

class RecipeSearch extends React.Component {
	constructor(props) {
		super(props)
		this.handleSearch = this.handleSearch.bind(this)
		this.doISearch = this.doISearch.bind(this)
		this.pagination = this.pagination.bind(this)
		this.nextPage = this.nextPage.bind(this)
		this.previousPage = this.previousPage.bind(this)
		this.changeView = this.changeView.bind(this)

		this.state = { page: 1}
	}

	doISearch(e) {
		e.preventDefault()
		clearTimeout(timeElapsed)
		timeElapsed = setTimeout(this.handleSearch, 800)
	}

	handleSearch() {
		let r = this.refs
		if(r.searchQuery.value.length >= 3) {
			this.props.handleSearch(r.searchQuery.value, r.searchType.value, r.searchSort.value, this.state.page)
		} else {
			return null
		}
	}

	pagination() {
		if(this.props.recipesInView > 0) {
			return(
				<div className='row'>
					{(this.state.page > 1) ? <button style={ styles.nextbtn } className='btn col s2 push-s4' onClick={this.previousPage}>Prev</button> : null }
					{(this.props.recipesInView === 30) ? <button style={ styles.nextbtn }className='btn col s2 push-s4' onClick={this.nextPage}>Next</button> : null }
				</div>
			)
		}
	}

	changeView(e, view) {
		this.props.changeView(view)
		this.setState( {page: 1 } )
		let buttons = e.target.parentElement.children
		for(var button of buttons) {
			button.style.backgroundColor='#D0d7d5'
		}
		e.target.style.backgroundColor='#f3f3f3'
		if (this.refs.searchQuery) {
			this.refs.searchQuery.focus()	
		}
	}

	nextPage() {
		this.setState( {page: (this.state.page += 1) } )
		this.handleSearch()
	}

	previousPage() {
		this.setState( { page: (this.state.page -= 1) } )
		this.handleSearch()
	}

	searchBar() {
		if(this.props.view !== 'favorites') {
			return(
				<form style={ styles.form } onSubmit={this.doISearch}>
					<div className='row'>
						<div className='col s10'>
							<input type='text' ref='searchQuery' onChange={this.doISearch}
							required placeholder='Recipe name, Ingredient, etc.' autoFocus={focus} />
						</div>
						<div className='col s2' style={styles.searchbtn}>
							<button className='btn-floating btn-medium waves-effect waves grey' onClick={this.handleSearch}><i className='material-icons'>search</i></button>
						</div>
					</div>
					<br/>
					<select className='browser-default' ref='searchType' onChange={this.doISearch}>
						<option value="all">All</option>
						<option value="title">Title Only</option>
						<option value="ingredients">Ingredients Only</option>
					</select>
					<select className='browser-default' ref='searchSort' onChange={this.doISearch}>
						<option value="none">None</option>
						<option value="fewest ingredients">Fewest Ingredients</option>
						<option value="shortest preptime">Shortest Preptime</option>
						<option value="alphabetical">Alphabetical</option>
					</select>
				</form>
			)
		}
	}

	render() {
		return(
			<div className='row'>
				<div className='col s12' style={ styles.tabbox }>
				  <button className='col s3 m3 btn' style={ styles.tab_buttons } onClick={ (e) => this.changeView(e, 'favorites')}>Favorites</button>
				  <button className='col s3 m3 btn' style={ {...styles.tab_buttons, ...styles.spaced} } onClick={ (e) => this.changeView(e, 'search')}>Search</button>
				  <button className='col s3 m3 btn' style={ styles.tab_buttons } onClick={ (e) => this.changeView(e, 'suggest')}>Suggest</button>
				</div>
				{ this.searchBar() }
				{ this.pagination() }
			</div>
		)
	}
}




export default RecipeSearch;
