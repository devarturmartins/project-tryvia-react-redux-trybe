import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { questionsApi } from '../services/fetchAPI';
// import Timer from './Timer';

const ONE_SECOND = 1000;
const ZERO = 0;

class QuestionsAndAnswers extends Component {
  state = {
    game: '',
    loading: false,
    index: 0,
    random: [],
    second: 30,
  };

  componentDidMount() {
    this.apiRequest();
    this.startTimer();
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
    const arrayEmbaralhado = this.shuffle(allArrays);
    this.setState({ random: arrayEmbaralhado });
  };

  // nextQuestion = () => {
  //   this.setState((prev) => ({
  //     index: prev.index + 1,
  //   }), () => this.criarBotõesAleatorios());
  // };

  decorateQuestion = (e) => {
    const answer = e.target;
    const incorretas = document.querySelectorAll('.incorrect');
    const corretas = document.querySelectorAll('.correct');
    if (answer.classList.contains('correct')) {
      answer.style.border = '3px solid rgb(6, 240, 15)';
      incorretas.forEach((each) => { each.style.border = '3px solid red'; });
    } else {
      corretas[0].style.border = '3px solid rgb(6, 240, 15)';
      incorretas.forEach((each) => { each.style.border = '3px solid red'; });
    }
  };

  // Requisito 8
  startTimer = () => {
    this.intervalId = setInterval(() => {
      const { second } = this.state;
      if (second === ZERO) {
        clearInterval(this.intervalId);
        return;
      }
      this.setState((prevState) => ({ second: prevState.second - 1 }));
    }, ONE_SECOND);
  };

  render() {
    const { game, loading, index, random, second } = this.state;
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
        <div data-testid="answer-options">
          {
            random.map((e, ind) => (
              e === game.results[index].correct_answer ? (
                <button
                  key={ ind }
                  onClick={ this.decorateQuestion }
                  type="button"
                  data-testid="correct-answer"
                  disabled={ second === ZERO }
                  className="correct"
                >
                  { e }
                </button>
              ) : (
                <button
                  key={ ind }
                  onClick={ this.decorateQuestion }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  disabled={ second === ZERO }
                  className="incorrect"
                >
                  { e }
                </button>
              )
            ))
          }
          {/* <p><Timer /></p> */}
          <p>
            Timer:
            {second}
          </p>
        </div>
      </div>
    );
  }
}

QuestionsAndAnswers.propTypes = {
  data: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default QuestionsAndAnswers;
