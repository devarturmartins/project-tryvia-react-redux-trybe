import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { questionsApi } from '../services/fetchAPI';

class QuestionsAndAnswers extends Component {
  state = {
    game: '',
    loading: false,
    index: 0,
  };

  componentDidMount() {
    this.apiRequest();
  }

  apiRequest = async () => {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');
    const game = await questionsApi(token);
    if (game.response_code !== 0) {
      const { data } = this.props;
      const { history } = data;
      this.setState({ loading: false });
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({ game, loading: false }, () => this.criarBotõesAleatorios());
    }
  };

  criarBotõesAleatorios = () => {
    const { index, game } = this.state;
    const { results } = game;
    const arrayDeIncorretos = results?.[index].incorrect_answers;
    const arrayDeCorretos = results?.[index].correct_answer;
    const allArrays = [...arrayDeIncorretos, arrayDeCorretos];
    console.log(allArrays);
  };

  render() {
    const { game, loading, index } = this.state;
    const { results } = game;
    return (
      <div>
        {
          loading && (<p>Carregando...</p>)
        }
        {
          results?.map((e, i) => (
            i === index && (
              <div key={ e.question }>
                <p data-testid="question-category">
                  { e.category }
                </p>
                <p data-testid="question-text">
                  { e.question }
                </p>
              </div>
            )

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
