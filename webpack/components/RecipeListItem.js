import React from 'react';
import { Link } from 'react-router';

const styles = {
	imgstyle: { width: '100%', border: '2px solid gray'},
	cardstyle: { margin: '40px 0', backgroundColor: '#f3f3f3'}
}

const RecipeListItem = ({id, title, servings, ingredientCount, ready_in_minutes, credit_text, imageUrl}) => {
	return(
		<div className='card-panel row' style={ styles.cardstyle }>
		<Link to={`/recipes/${id}`} >
			<div className='col s12 m6 card-content'>
				<h3>  {title}  </h3>
				<p> Ingredients: {ingredientCount} </p>
				<p> {ready_in_minutes ? ("Prep Time: " + ready_in_minutes) : null } </p>
				<p> {servings ? ("Servings: " + servings) : null } </p>
				<p> {credit_text ? ("By: " + credit_text) : null } </p>
			</div>
			<div className='col s12 m6'>
				<img style={styles.imgstyle } src={imageUrl} alt={title} />
			</div>
			</Link>
		</div>
	)
}



export default RecipeListItem;
