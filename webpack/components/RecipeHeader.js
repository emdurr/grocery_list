import React from 'react';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	imgstyle: { width: '350px', border: '1px solid gray'},
	title: { backgroundColor: '#414E49', color: 'white', textAlign: 'center', padding: '10px 0'},
	cardmargin: { marginTop: '40px'}

}

const RecipeHeader = ({title, servings, ingredientCount, ready_in_minutes, credit_text, imageUrl}) => {
	return(
		<div>
			<h3 style={ styles.title }><img src={ logoImg }/> {title} </h3>
			<div className='row'>
				<div style={ styles.cardmargin }className='container'>
					<div  className='col s5'>
						<h5> Ingredients: {ingredientCount} </h5>
						<p> {ready_in_minutes ? ("Prep Time: " + ready_in_minutes) : null } </p>
						<h5> {servings ? ("Servings: " + servings) : null } </h5>
						<p> {credit_text ? ("By: " + credit_text) : null } </p>
					</div>
					<div>
						<img style={ styles.imgstyle } src={imageUrl} alt={title} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecipeHeader;
