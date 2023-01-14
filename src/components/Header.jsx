import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;

    const emailString = md5(email).toString();

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${emailString}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        {
          score ? <p data-testid="header-score">{ score }</p>
            : <p data-testid="header-score">{ 0 }</p>
        }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
