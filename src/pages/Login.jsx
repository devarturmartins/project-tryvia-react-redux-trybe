import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { personal } from '../redux/actions/index';
// import { searchToken } from '../services/api';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(personal(this.state));
  };

  searchToken = async () => {
    const { history } = this.props;
  
    const responseAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseJson = await responseAPI.json();
    const { token } = responseJson;

    localStorage.setItem('token', token);
    history.push('/game');
  };
  
  render() {
    const { name, email } = this.state;
  
    return (
      <form>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.searchToken }
          disabled={ email.length === 0 || name.length === 0 }
        >
          Play
        </button>

      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.
};

export default connect()(Login);
