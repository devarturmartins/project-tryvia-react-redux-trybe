// import React, { Component } from 'react';

// const ONE_SECOND = 1000;

// class Timer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       second: 5,
//     };
//   }

//   componentDidMount() {
//     this.startTimer();
//   }

//   componentDidUpdate() {
//     const { second } = this.state;
//     if (second === 0) {
//       clearInterval(this.intervalId);
//     }
//   }

//   startTimer = () => {
//     this.intervalId = setInterval(() => {
//       this.setState((prevState) => ({ second: prevState.second - 1 }));
//     }, ONE_SECOND);
//   };

//   render() {
//     const { second } = this.state;
//     return (
//       <div>
//         Timer:
//         {second}
//       </div>
//     );
//   }
// }

// export default Timer;
