import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { rights, score } = this.props;
    const minRights = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {rights < minRights ? 'Could be better...' : 'Well Done!'}
        </p>
        <div>
          <p>Seu score é:</p>
          <p data-testid="feedback-total-score">
            { score }
          </p>
        </div>
        <div>
          <p>Seus acertos foram de:</p>
          <p data-testid="feedback-total-question">
            { rights }
          </p>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  rights: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default Feedback;
