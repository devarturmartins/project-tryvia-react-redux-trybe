import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { questionsApi } from '../services/fetchAPI';

class QuestionsAndAnswers extends Component {
  state = {
    game: '',
    loading: false,
    index: 0,
    random: [],
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

  shuffle = (array) => {
    let random;
    let target;
    let i;
    for (i = array.length - 1; i > 0; i -= 1) {
      random = Math.floor(Math.random() * (i + 1));
      target = array[i];
      array[i] = array[random];
      array[random] = target;
      // [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  };

  criarBotõesAleatorios = () => {
    const { index, game } = this.state;
    const { results } = game;
    const arrayDeIncorretos = results?.[index].incorrect_answers;
    const arrayDeCorretos = results?.[index].correct_answer;
    const allArrays = [...arrayDeIncorretos, arrayDeCorretos];
    console.log(allArrays);
    const arrayEmbaralhado = this.shuffle(allArrays);
    this.setState({ random: arrayEmbaralhado });
  };

  nextQuestion = () => {
    this.setState((prev) => ({
      index: prev.index + 1,
    }), () => this.criarBotõesAleatorios());
  };

  render() {
    const { game, loading, index, random } = this.state;
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
                  {e.category}
                </p>
                <p data-testid="question-text">
                  {e.question}
                </p>
              </div>
            )

          ))
        }
        {
          random.map((e) => (
            <button
              type="button"
              onClick={ this.nextQuestion }
            >
              { e }
            </button>
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
