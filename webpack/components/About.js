import React from 'react';
import ericImg from '../images/eric.png';
import lonnieImg from '../images/lonnie.jpeg';
import joImg from '../images/jo.jpg';

const styles = {
	eric: { height: '800px', backgroundImage: 'url(' + ericImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
  lonnie: { height: '800px', backgroundImage: 'url(' + lonnieImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
  jo: { height: '800px', backgroundImage: 'url(' + joImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
}

const About = () => (

  <div className="row">
    <div className='center container'>
      <div>
         <h3>About Basket Case</h3>
         <blockquote>This app is amazing you will love having it.
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
         </blockquote>
         <br/>
      </div>
    </div>
    <div className='row'>
      <div className="col s12 m6">
        <div className="card small">
            <span className="card-title">Eric Durr</span>
            <div className="card-image" style={styles.eric}>
            </div>
            <div className="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
               I am convenient because I require little markup to use effectively.</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
        </div>
      </div>
    </div>
      <div className='row'>
        <div className="col s12 m6">
          <div className="card small">
              <span className="card-title">Lonnie Horlacher</span>
              <div className="card-image" style={styles.lonnie}>
              </div>
              <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                 I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
              </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className="col s12 m6">
          <div className="card small">
              <span className="card-title">Jo Squire</span>
              <div className="card-image" style={styles.jo}>
              </div>
              <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                 I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
              </div>
          </div>
        </div>
      </div>
     </div>
)

export default About;
