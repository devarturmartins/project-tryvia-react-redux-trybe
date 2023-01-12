import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { personal } from '../redux/actions/index';

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
          onSubmit={ this.handleSubmit }
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
};

export default connect()(Login);
