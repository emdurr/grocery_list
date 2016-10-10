import React from 'react';
import ericImg from '../images/ericdurr1.png';
import lonnieImg from '../images/lonnie.jpeg';
import joImg from '../images/jo.jpg';
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
				 		 This app is amazing you will love having it.
	           more and more words here to see if it works
	       		 Proin eget tortor risus. Nulla porttitor accumsan tincidunt.
	           Curabitur arcu erat, accumsan id imperdiet et,
	           porttitor at sem. Curabitur non nulla sit
	           amet nisl tempus convallis quis ac lectus.
	           Vestibulum ante ipsum primis in faucibus
	           orci luctus et ultrices posuere cubilia Curae;
	           Donec velit neque, auctor sit amet aliquam vel,
	           ullamcorper sit amet ligula. Cras ultricies ligula
	           sed magna dictum porta. Sed porttitor lectus
	           nibh. Vivamus magna justo, lacinia eget
	           consectetur sed, convallis at tellus. Quisque
	           velit nisi, pretium ut lacinia in, elementum id enim.
	           Curabitur aliquet quam id dui posuere blandit.
	       </p>
	       <br/>
	    </div>
	  </div>

		<div className='center' style={ styles.team }>
	    <div className='card-panel'>
	       <h3>The Code</h3>
	       <p style={{textAlign: "left"}}>
	       		 Proin eget tortor risus. Nulla porttitor accumsan tincidunt.
	           Curabitur arcu erat, accumsan id imperdiet et,
	           porttitor at sem. Curabitur non nulla sit
	           amet nisl tempus convallis quis ac lectus.
	           Vestibulum ante ipsum primis in faucibus
	           orci luctus et ultrices posuere cubilia Curae;
	           Donec velit neque, auctor sit amet aliquam vel,
	           ullamcorper sit amet ligula. Cras ultricies ligula
	           sed magna dictum porta. Sed porttitor lectus
	           nibh. Vivamus magna justo, lacinia eget
	           consectetur sed, convallis at tellus. Quisque
	           velit nisi, pretium ut lacinia in, elementum id enim.
	           Curabitur aliquet quam id dui posuere blandit.
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
					<p className="light center black-text">Eric, was born. He currently resides in a tinyhouse that he fondly calls frontrunner. He is so generous that he shares it with many an odd fellow and can be found squished up against a window working on his laptop while offering his shoulder to a random drooling, sleeping roommate.  The cramped quarters have paid off because he is top of the class and able to daydream without falling behind. Not that he does.</p>
          <a href='https://github.com/emdurr' target="github"><img src={ githubImg } style={ styles.github }></img></a>
          <a href='https://www.linkedin.com/in/ericdurr' target="linkedin"><img src={ linkedinImg } style={ styles.github }></img></a>
          <a href='mailto:emdurr@gmail.com'><img src={ mailImg } style={ styles.github }></img></a>
				</div>
	    	<div className='center col s12 m4'>
					<img src={ lonnieImg } style={ styles.lonnie }/>
					<h5 className="blue-text">Lonnie Horlacher</h5>
					<p className="light center black-text">Lonnie, a native of Nevada, suddenly realized it was really hot there and didn't care for sweating.  Suffering from heat stroke he signed up for a bootcamp in cooler climates, little did he know that it would be in an artic freezer that he would be taught.  Turns out it was a good move though as he is really skilled and killing it in the class. An unexpected skill from the class is he has learned to blow frosty breath rings in the air.</p>
          <a href='https://github.com/lhorlacher' target="github"><img src={ githubImg } style={ styles.github }></img></a>
          <a href='https://www.linkedin.com/in/lonnie-horlacher-67107367' target="linkedin"><img src={ linkedinImg } style={ styles.github }></img></a>
          <a href='mailto:horlacher.lonnie@gmail.com'><img src={ mailImg } style={ styles.github }></img></a>
				</div>
	    	<div className='center col s12 m4'>
					<img src={ joImg } style={ styles.jo }/>
					<h5 className="blue-text">Jo Squire</h5>
					<p className="light center black-text">Jo, a born and raised Utahn. Spent many of her earlier years working as a mechanical drafter. After several years away from the workforce spending time raising a family she started her own successfull online business creating and selling high quality leather padfolios and accessories. Realizing there was more out there to learn she was drawn to developing and is currently a student at DevPoint Labs.</p>
          <a href='https://github.com/josquire' target="github"><img src={ githubImg } style={ styles.github }></img></a>
          <a href='https://www.linkedin.com/in/joanna-squire-7567aa97' target="linkedin"><img src={ linkedinImg } style={ styles.github }></img></a>
          <a href='mailto:mjsquire@digis.net'><img src={ mailImg } style={ styles.github }></img></a>
				</div>
			</div>
		</div>
	</div>
</div>

)
export default About;
