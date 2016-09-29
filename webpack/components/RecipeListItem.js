import React from 'react';
import { Link } from 'react-router';

const styles = {
	imgstyle: { width: '300px', border: '2px solid gray'},
	cardstyle: { margin: '50px 0', boxShadow: '10px 10px 5px #888888'}
}

const RecipeListItem = ({id, title, servings, ingredientCount, ready_in_minutes, credit_text, imageUrl}) => {
	return(
		<div className='card-panel hoverable row' style={ styles.cardstyle }>
		<Link to={`/recipes/${id}`} >
			<div className='col s6'>
				<h3>  {title}  </h3>
				<p> Ingredients: {ingredientCount} </p>
				<p> {ready_in_minutes ? ("Prep Time: " + ready_in_minutes) : null } </p>
				<p> {servings ? ("Servings: " + servings) : null } </p>
				<p> {credit_text ? ("By: " + credit_text) : null } </p>
			</div>
			<div className=' col s6'>
				<img style={styles.imgstyle } src={imageUrl} alt={title} />
			</div>
			</Link>
		</div>
	)
}



export default RecipeListItem;
