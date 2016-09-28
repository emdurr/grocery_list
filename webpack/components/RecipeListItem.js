import React from 'react';
import { Link } from 'react-router';

const styles = {
	imgstyle: { width: '300px', border: '2px solid gray'},
	cardstyle: { margin: '50px 0', boxShadow: '10px 10px 5px #888888'}
}



const RecipeListItem = ({id, title, servings, ingredientCount, readyInMinutes, creditText, imageUrl}) => {
	return(
		<div className='card-panel hoverable row' style={ styles.cardstyle }>
		<Link to={`/recipes/${id}`} >
			<div className='col s6'>
				<h3>  {title}  </h3>
				<p> Ingredients: {ingredientCount} </p>
				<p> {readyInMinutes ? ("Prep Time: " + readyInMinutes) : null } </p>
				<p> {servings ? ("Servings: " + servings) : null } </p>
				<p> {creditText ? ("By: " + creditText) : null } </p>
			</div>
			<div className=' col s6'>
				<img style={styles.imgstyle } src={imageUrl} alt={title} />
			</div>
			</Link>
		</div>
	)
}



export default RecipeListItem;
