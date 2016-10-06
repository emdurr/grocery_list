import React from 'react';

const styles = {
	stylesearch: { backgroundColor: '#f3f3f3', padding: '20px', margin: '50px 0', boxShadow: '10px 10px 5px #686b6a'},
	buttons: { backgroundColor: 'transparent', color: 'black'},

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
					<div className='col s12 m4 offset-m4'>
						{(this.state.page > 1) ? <button className='col s6'onClick={this.previousPage}>Prev</button> : null }
						{(this.props.recipesInView === 30) ? <button className='col s6 m6'onClick={this.nextPage}>Next</button> : null }
					</div>
				</div>
			)
		}
	}

	changeView(view) {
		this.props.changeView(view)
		this.setState( {page: 1 } )
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
				<form onSubmit={this.doISearch}>
					<input type='text' ref='searchQuery' onChange={this.doISearch}
					required placeholder='Recipe name, Ingredient, etc.' />
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
			<div>
				<div>
				  <button className='btn' onClick={ () => this.changeView('favorites')}>Favorites</button>
				  <button className='btn' onClick={ () => this.changeView('search')}>Search</button>
				  <button className='btn' onClick={ () => this.changeView('suggest')}>Suggest</button>
				</div>
				{ this.searchBar() }
				{ this.pagination() }
			</div>
		)
	}
}




export default RecipeSearch;
