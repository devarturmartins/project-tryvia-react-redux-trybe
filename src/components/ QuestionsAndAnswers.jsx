import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scorePersonal } from '../redux/actions';
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
    next: false,
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

  nextQuestion = () => {
    const { index } = this.state;
    const { data } = this.props;
    const { history } = data;
    const questionNumber = 3;
    this.setState((prev) => ({
      index: prev.index + 1,
      next: false,
      second: 30,
    }), () => this.criarBotõesAleatorios());
    const incorretas = document.querySelectorAll('.incorrect');
    const corretas = document.querySelectorAll('.correct');
    incorretas.forEach((each) => { each.removeAttribute('style'); });
    // corretas[0].style.border = '3px solid purple';
    corretas[0].removeAttribute('style');
    this.startTimer();
    if (index > questionNumber) {
      history.push('/feedback');
    }
  };

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
    this.setState({ next: true });
    clearInterval(this.intervalId);
    this.scoreFunction(e);
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

  // req 9
  scoreFunction = ({ target }) => {
    // console.log(target.innerText);
    const { dispatch } = this.props;
    const { second, game, index } = this.state;
    const { results } = game;
    const DEZ = 10;
    const DOIS = 2;
    const TRES = 3;
    let score = 0;
    if (results[index].correct_answer === target.innerText) {
      if (results[index].difficulty === 'easy') {
        score = score + DEZ + (second);
      } else if (results[index].difficulty === 'medium') {
        score = score + DEZ + (second * DOIS);
      } else {
        score = score + DEZ + (second * TRES);
      }
      dispatch(scorePersonal(score));
      console.log(score);
    }
  };

  render() {
    const { game, loading, index, random, second, next } = this.state;
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
        <br />
        { next && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>)}

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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(QuestionsAndAnswers);
