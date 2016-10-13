import React from 'react';
import ericImg from '../images/ericdurr.png';
import lonnieImg from '../images/lonniehorlacher.png';
import joImg from '../images/josquire.png';
import githubImg from '../images/GithubImg.png';
import linkedinImg from '../images/linkedin.png';
import mailImg from '../images/mail.png';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	eric: { width: 'auto', height: '200px', borderRadius: '50%', backgroundImage: 'url(' + ericImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
  lonnie: { width: 'auto', height: '200px', borderRadius: '50%', backgroundImage: 'url(' + lonnieImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
  jo: { width: 'auto', height: '200px', borderRadius: '50%', backgroundImage: 'url(' + joImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
	github: { height: '40px', width: '40px', padding: '5px', backgroundSize: 'cover'},
	about: { backgroundColor: '#D0D7D5', marginTop: '20px'},
	lhead: { backgroundColor: '#3B4743', color: 'white', padding: '10px', margin: '0'},
	team: { margin: '50px'},
	padding: { padding: '30px 0', margin: '0'}
}

const About = () => (

<div className='container center ' style={ styles.about }>
	<h3 style={ styles.lhead }><img src={ logoImg }/> iLarder</h3>
	<div className="row">
	  <div className='center' style={ styles.team }>
	    <div className='card-panel'>
	       <h3>The App</h3>
	       <p style={{textAlign: "left"}}>
	 			iLarder allows makes food simple. 'Larder' is an old-fashioned word for pantry. The contrast between old and new that is implied in the name iLarder, 
	 			reflects our interest in taking a very traditional chore and simplifying it with technology.
			</p>
			<p style={{textAlign: "left"}}>
	 			With iLarder, your grocery list automatically updates your pantry. Your pantry automatically updates your grocery list. 
	 			And you can add all or some of the ingredients from any recipe to your grocery list quickly and simply. 
	 			You know what you have and what you need all the time.
	       </p>
       		<p style={{textAlign: "left"}}>
    			Because iLarder knows the food you have on hand, it can provide recipe suggestions using only the food you have onhand.
    			This allows you to discover new ways to use the items you already buy. And a robust search feature allows you to discover new recipes.
             </p>
	       <br/>
	    </div>
	  </div>

		<div className='center' style={ styles.team }>
	    <div className='card-panel'>
	       <h3>The Code</h3>
	       <p style={{textAlign: "left"}}>
	    		iLarder represents a massive effort over a very short time period. We created and utilized a Ruby on Rails API and used the React library for our user-interface.
	    		In total, the app required 12 controllers, 13 database tables and 38 react components. We made extensive use of Rails 'has_many :through' model associations.
	    		The app incorporates a number of Ruby Gems, and populates its database of recipes and ingredients through integration with the Spoonacular API.
	       </p>
	       <br/>
	    </div>
	  </div>
	</div>

	<div className='center' style={ styles.team }>
		<div className='card-panel' >
			<div className='row'>
				<h3 style={ styles.padding } >The Team</h3>
	    	<div className='center col s12 m4'>
					<img src={ ericImg } style={ styles.eric }/>
					<h5 className="blue-text">Eric Durr</h5>
					<p className="light center black-text">Eric, was raised on the east coast and longs, one day, to return to the warm, humid envirornment there. He came to DevPoint Labs from sales with very little coding knowledge and has found, in coding, something that he loves tremendously and will use to take over the world.</p>
          <a href='https://github.com/emdurr' target="github"><img src={ githubImg } style={ styles.github }></img></a>
          <a href='https://www.linkedin.com/in/ericdurr' target="linkedin"><img src={ linkedinImg } style={ styles.github }></img></a>
          <a href='mailto:emdurr@gmail.com'><img src={ mailImg } style={ styles.github }></img></a>
				</div>
	    	<div className='center col s12 m4'>
					<img src={ lonnieImg } style={ styles.lonnie }/>
					<h5 className="blue-text">Lonnie Horlacher</h5>
					<p className="light center black-text">
						Lonnie graduated from Southern Utah University in December of 2013 with a bachelors degree in accounting. After spending 2 1/2 on the financial and analytical side of marketing, he decided to take a leap into the world of web development. 
					</p>
					<p className="light center black-text">
						At DevPoint Labs, he has collaborated to create Teach Me, an app to help music teachers communicate with their students, and iLarder, to answer the question "What do we have to eat?"
					</p>
					<p className="light center black-text">
						In his free time, he codes, reads, plays the piano and enjoys visiting new and sketchy restaurants with his husband.
					</p>
          <a href='https://github.com/lhorlacher' target="github"><img src={ githubImg } style={ styles.github }></img></a>
          <a href='https://www.linkedin.com/in/lonnie-horlacher' target="linkedin"><img src={ linkedinImg } style={ styles.github }></img></a>
          <a href='mailto:horlacher.lonnie@gmail.com'><img src={ mailImg } style={ styles.github }></img></a>
				</div>
	    	<div className='center col s12 m4'>
					<img src={ joImg } style={ styles.jo }/>
					<h5 className="blue-text">Jo Squire</h5>
					<p className="light center black-text">Jo, a born and raised Utahn. Spent many of her earlier years working as a mechanical drafter. After several years away from the workforce spending time raising a family she started her own successfull online business creating and selling high quality leather padfolios and accessories. Realizing there was more out there to learn she was drawn to developing and is currently a student at DevPoint Labs.</p>
          <a href='https://github.com/josquire' target="github"><img src={ githubImg } style={ styles.github }></img></a>
          <a href='https://www.linkedin.com/in/joanna-squire' target="linkedin"><img src={ linkedinImg } style={ styles.github }></img></a>
          <a href='mailto:mjsquire@digis.net'><img src={ mailImg } style={ styles.github }></img></a>
				</div>
			</div>
		</div>
	</div>
</div>

)
export default About;
