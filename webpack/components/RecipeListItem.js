import React from 'react';
import { Link } from 'react-router';

const RecipeListItem = ({id, title, servings, ingredientCount, readyInMinutes, creditText, imageUrl}) => {
	return(
		<div className='card-panel hoverable row'>
			<div className='col s6'>
				<h3> <Link to={`/recipes/${id}`}> {title} </Link> </h3>
				<p> Ingredients: {ingredientCount} </p>
				<p> {readyInMinutes ? ("Prep Time: " + readyInMinutes) : nil } </p>
				<p> {servings ? ("Servings: " + servings) : nil } </p>
				<p> {creditText ? ("By: " + creditText) : nil } </p>
			</div>
			<div className=' col s6'>
				<img src={imageUrl} alt={title} />
			</div>
		</div>
	)
}

export default RecipeListItem;