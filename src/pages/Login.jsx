import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { personal } from '../redux/actions/index';
import { tokenAPI } from '../services/fetchAPI';
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

  handleSubmit = async () => {
    const { history, dispatch } = this.props;
    dispatch(personal(this.state));
    const responseJson = await tokenAPI();
    const { token } = responseJson;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  redirect = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          id="btnSettings"
          className="btnSettings"
          onClick={ () => this.redirect() }
        >
          ⚙️
        </button>
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
            onClick={ this.handleSubmit }
            disabled={ email.length === 0 || name.length === 0 }
          >
            Play
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
