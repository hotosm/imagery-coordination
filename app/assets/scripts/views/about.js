'use strict';
import React from 'react';
import { connect } from 'react-redux';

var About = React.createClass({
  displayName: 'About',

  propTypes: {
  },

  render: function () {
    return (
      <section className='section section--page section--about'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>About</h1>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            <div className='prose prose--responsive'>
              <p>Good things come to those who wait...</p>

              <p>Lorem ipsum dolor sit amet, ea sed porro neglegentur, mel eros putant argumentum et. Per eu hinc constituam, iracundia consequat necessitatibus at duo. An eos quidam delenit inermis, mei ad omnes torquatos. Vidit liber mel ut, mel in graeci mollis iudicabit. Nam id sale tempor graeci, mea ea altera utroque. Has et saperet accusam postulant.</p>

              <p>Feugait efficiantur ea duo, no per elit alienum disputationi. Esse clita sed at, eu eum nisl option. Eam ne magna legimus consulatu. Vix noster posidonium ne, id iudico corpora his. Veniam bonorum lobortis cum eu.</p>

              <ul>
                <li>An nam habeo facer dicunt, et euripidis constituam nam</li>
                <li>Ne eam amet nostro lucilius. Iusto possit ullamcorper ei duo</li>
                <li>Option accusam ea sit, habemus pertinax deterruisset ad ius</li>
                <li>Mei eu soluta offendit. Eos ei zril blandit voluptaria, euismod salutandi in nam</li>
              </ul>

              <p>Pro latine mnesarchum at. Mei te posse utamur delicata, ad ludus soluta mei. Dicat tacimates vix ex, mei iusto explicari voluptatibus cu. Ne fuisset inimicus pro. Cu vivendo sententiae qui. Est at recusabo necessitatibus.</p>

              <p>Accumsan inciderint mea at, sed ad modus novum. Ius erat volutpat et. Ex tibique voluptatum eam, recteque erroribus ei mei. Ius ex mazim nobis splendide, vidit molestiae sea et. Elit legere euripidis pro et, ut omnes adipisci scripserit mea. Ut sea labores maiorum corrumpit.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
  };
}

function dispatcher (dispatch) {
  return {
  };
}

module.exports = connect(selector, dispatcher)(About);
