import React from 'react';

const RecipeSearch = ({setSearchQuery, setSearchType, defaultType, defaultQuery, handleSearch}) => {
	console.log(defaultType)
	return(
		<div>
			<form onSubmit={handleSearch} >
				<input type='text' value={defaultQuery} onChange={setSearchQuery}
				required placeholder='Recipe name, Ingredient, etc.' />
				<br/>
				<select className='browser-default' value={defaultType} onChange={setSearchType}>
					<option value="general">General</option>
					<option value="title">Title Only</option>
					<option value="ingredients">Ingredients Only</option>
				</select>
				<input type='radio' name='filter' value='On Hand'/>
				<input type='radio' name='filter' value='Quick'/>
				<br />
				<input type='submit' />
			</form>
		</div>
	)
}


export default RecipeSearch;