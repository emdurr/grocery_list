import React from 'react';

const RecipeHeader = ({title, servings, ingredientCount, readyInMinutes, creditText, imageUrl}) => {
	return(
		<div className='card-panel hoverable'>
			<div>
				<h3> {title} </h3>
				<p> Ingredients: {ingredientCount} </p>
				<p> {readyInMinutes ? ("Prep Time: " + readyInMinutes) : null } </p>
				<p> {servings ? ("Servings: " + servings) : null } </p>
				<p> {creditText ? ("By: " + creditText) : null } </p>
			</div>
			<div>
				<img src={imageUrl} alt={title} />
			</div>
		</div>
	)
}

export default RecipeHeader;