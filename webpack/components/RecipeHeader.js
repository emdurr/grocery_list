import React from 'react';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	imgstyle: { width: '350px', border: '1px solid gray'},
	title: { backgroundColor: '#414E49', color: 'white', textAlign: 'center', padding: '10px 0'},
	cardmargin: { marginTop: '40px'}

}

const RecipeHeader = ({title, servings, ingredientCount, readyInMinutes, creditText, imageUrl}) => {
	return(
		<div>
			<h3 style={ styles.title }><img src={ logoImg }/> {title} </h3>
			<div className='row'>
				<div style={ styles.cardmargin }className='container'>
					<div  className='col s5'>
						<h5> Ingredients: {ingredientCount} </h5>
						<h5> {readyInMinutes ? ("Prep Time: " + readyInMinutes) : null } </h5>
						<h5> {servings ? ("Servings: " + servings) : null } </h5>
						<h5> {creditText ? ("By: " + creditText) : null } </h5>
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
