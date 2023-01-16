import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  // initialPage = () => {
  //   const { data } = this.props;
  //   const { history } = data;
  //   history.push('/');
  // };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking</h1>
        <button
          type="button"
          data-destid="btn-go-home"
          // onClick={ this.initialPage() }
        >
          Início
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  data: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
