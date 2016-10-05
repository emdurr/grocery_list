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
	}

	doISearch(e) {
		e.preventDefault()
		clearTimeout(timeElapsed)
		timeElapsed = setTimeout(this.handleSearch, 800)
	}

	handleSearch() {
		let r = this.refs
		if(r.searchQuery.value.length >= 3) {
			this.props.handleSearch(r.searchQuery.value, r.searchType.value, r.searchSort.value)
		} else {
			return null
		}
	}


	render() {
		return(
			<div>
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
						<option value="in my pantry">In My Pantry</option>
						<option value="fewest ingredients">Fewest Ingredients</option>
						<option value="shortest preptime">Shortest Preptime</option>
						<option value="alphabetical">Alphabetical</option>
					</select>
				</form>
			</div>
		)
	}
}


export default RecipeSearch;
