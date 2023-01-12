import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { questionsApi } from '../services/fetchAPI';

class QuestionsAndAnswers extends Component {
  state = {
    game: '',
    loading: false,
  };

  componentDidMount() {
    this.apiRequest();
  }

  apiRequest = async () => {
    const { history } = this.props;
    this.setState({ loading: true });
    const token = localStorage.getItem('token');
    const game = await questionsApi(token);
    if (game.response_code !== 0) {
      this.setState({ loading: false });
      localStorage.setItem('token', '');
      history.push('/');
    }
    this.setState({ game, loading: false });
  };

  render() {
    const { game, loading } = this.state;
    const { results } = game;
    return (
      <div>
        {
          loading && (<p>Carregando...</p>)
        }
        {
          results?.map((e) => (
            <div key={ e.question }>
              <p data-testid="question-category">
                { e.category }
              </p>
              <p data-testid="question-text">
                { e.question }
              </p>
            </div>

          ))
        }
      </div>
    );
  }
}

QuestionsAndAnswers.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default QuestionsAndAnswers;
