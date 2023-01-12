import React from 'react';
import Header from '../components/Header';
import QuestionsAndAnswers from '../components/ QuestionsAndAnswers';

class Game extends React.Component {
  render() {
    return (
      <>
        <Header />
        <QuestionsAndAnswers />
      </>
    );
  }
}

export default Game;

