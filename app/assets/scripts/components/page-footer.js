'use strict';
import React from 'react';

var PageFooter = React.createClass({
  displayName: 'PageFooter',

  propTypes: {
  },

  render: function () {
    return (
      <footer className='page__footer' role='contentinfo'>
        <div className='inner'>

          <div className='col--main'>
            <img src='/assets/graphics/layout/oam-logo-v-pos.svg' alt='OpenAerialMap logo' className='oam-logo'/>
            <ul className='related'>
              <li className='related__item related__item--upload'><a href='https://upload.openaerialmap.org/' title='Visit OAM Uploader'>Upload Imagery</a></li>
              <li className='related__item related__item--browse'><a href='https://beta.openaerialmap.org/' title='Visit OAM Browser'>Browse Imagery</a></li>
            </ul>
          </div>
          <div className='col--sec'>
            <ul className='social'>
              <li className='social__item social__item--email'><a href='mailto:email@example.com' title='Contact via email'><span>Email</span></a></li>
              <li className='social__item social__item--github'><a href='https://github.com/hotosm' title='See organization on github'><span>Github</span></a></li>
              {/* <li className='social__item social__item--slack'><a href='https://hotosm.slack.com/' title='Join Slack'><span>Slack</span></a></li> */}
            </ul>
            <p className='copyright'>Made with love by <a href='https://developmentseed.org' title='Visit Development Seed website'>Development Seed</a> and <a href='http://hot.openstreetmap.org/' title='Visit the Humanitarian OpenStreetMap Team website'>HOT</a>.</p>
          </div>

        </div>
      </footer>
    );
  }
});

module.exports = PageFooter;
