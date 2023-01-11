export const tokenAPI = async () => {
  const responseAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const responseJson = await responseAPI.json();
  return responseJson;
};

export const questionsApi = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};
