import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux,render } from './renderWithRouterAndRedux';
import Login from '../../pages/Login';
import App from '../../App';
import Game from '../../pages/Game';

describe('The homepage must be a login', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 0,
        response_message: 'Token Generated Successfully!',
        token: 'token',
      }),
    });
  });
    const nameInput = 'input-player-name';
    const mailInput = 'input-gravatar-email';
    const emailText = 'email@email.com';
    const nameText = 'name';

    test('Login fields should appear on screen', () => {

      renderWithRouterAndRedux(<Login />);
      const button = screen.getByRole('button', {name: /Play/i });
      const name = screen.getByTestId(nameInput);
      const email = screen.getByTestId(mailInput);
      expect(button).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });


    test('The homepage must have a settings button, which redirects to the page \'Settings\'', () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const buttomSettings = screen.getByRole('button', { name: "⚙️"});
    
      expect(buttomSettings).toBeInTheDocument();

      userEvent.click(buttomSettings);
  
      expect(history.location.pathname).toBe('/settings'); 
    });

    test('The page must start with the login button disabled', () => {
        renderWithRouterAndRedux(<Login />);

    const buttom = screen.getByRole('button', { name: "Play" });
    expect(buttom).toHaveAttribute('disabled');
    });


    test('The button \'Play\' must be validated correctly', () => {
      renderWithRouterAndRedux(<Login />);
     
      const name = screen.getByTestId(nameInput);
      const mail = screen.getByTestId(mailInput);
      const buttom = screen.getByRole('button', { name: "Play"});
  
  
      userEvent.type(name, emailText);
      userEvent.type(mail, nameText);
      expect(buttom).not.toBeDisabled();
    });

  
     test('when clicking on the play button, the information is saved in LocalStorage', async () => {
       const { store } = renderWithRouterAndRedux(<App />);
      
       const name = screen.getByTestId(nameInput);
       const mail = screen.getByTestId(mailInput);
       const buttom = screen.getByRole('button', { name: /Play/i});
  
  
       userEvent.type(name, emailText);
       userEvent.type(mail, nameText);
       userEvent.click(buttom);
  
       
       await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('token');

      });

      // npm run test:coverage -- --collectCoverageFrom=src/pages/Login.js

     });
    });