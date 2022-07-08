import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import * as userAPI from '../services/userAPI';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      habilityButton: true,
      isLoading: false,
      redirect: false,
      user: {
        name: '',
      },
    };
  }

  handleButtonLogin = ({ target: { value } }) => {
    const valueMin = 2;
    if (value.length > valueMin) {
      this.setState({ habilityButton: false, user: { name: value } });
    } else {
      this.setState({ habilityButton: true });
    }
  }

  handleSubmitLogin = async () => {
    const { createUser } = userAPI;
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser(user);
    this.setState({ isLoading: false, redirect: true });
  };

  render() {
    const { habilityButton, isLoading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        <h1 className="titlePage">Trybe<span>Tunes</span></h1>
        { redirect && <Redirect to="/search" /> }
        {isLoading ? <Loading />
          : (
            <div className="login-form">
              <label htmlFor="login-name-input">
                <input
                  type="text"
                  name="login-name-input"
                  data-testid="login-name-input"
                  placeholder="User"
                  onChange={ this.handleButtonLogin }
                  className="login-name-input"
                  id="login-name-input"
                />
              </label>
              <button
                type="button"
                disabled={ habilityButton }
                data-testid="login-submit-button"
                onClick={ this.handleSubmitLogin }
                className="login-submit-button"
              >
                Entrar
              </button>
            </div>)}
      </div>
    );
  }
}

export default Login;
