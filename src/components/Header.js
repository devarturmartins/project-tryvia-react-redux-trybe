import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;

    const gravatarLink = () => {
      const emailString = md5(email).toString();
      return `https://www.gravatar.com/avatar/${emailString}`;
    };

    return (
      <>
        <div>Header</div>
        <img
          src={ gravatarLink }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.user.name,
  email: globalState.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
