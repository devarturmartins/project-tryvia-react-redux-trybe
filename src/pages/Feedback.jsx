import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  initialPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
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
            { assertions }
          </p>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.rankingPage }
          >
            Ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.initialPage }
          >
            Play Again

          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
