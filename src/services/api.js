// Requisição do token para API
const searchToken = async => {
  const { history } = this.props;

  const responseAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await responseAPI.json();
  localStorage.setItem('token', token);
  history.push('/game');
}

export default searchToken;