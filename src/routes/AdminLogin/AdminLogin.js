import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import OrgsApiService from '../../services/orgs-api-service';

class AdminLogin extends React.Component {
  state = {
    username: {
      value: '',
      error: ' ',
    },
    password: {
      value: '',
      error: ' ',
    },
  }

  static contextType = ActivitiesContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  updateState = () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    this.setState({
      username: { value: username },
      password: { value: password }
    })
  }

  // Handling submit of login form

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()

    if (this.state.username.error || this.state.password.error) {
      alert("There is a problem with your username or password. Please try again.")
    } else {
      this.setState({
        username: {
          value: this.state.username.value,
          error: null,
        },
        password: {
          value: this.state.password.value,
          error: null,
        },
      })

      const username = this.state.username.value
      const password = this.state.password.value

      AuthApiService.postLogin({
        user_name: username,
        password: password,
      })
        .then(res => {
          TokenService.saveAuthToken(res.authToken, username)
          OrgsApiService.getUserOrg(username)
            .then(id => {
              const orgId = id.org_id.toString()
              document.getElementById('username').value = ''
              document.getElementById('password').value = ''
              this.handleLoginSuccess(orgId)
              this.context.setActivities(orgId)
              this.context.updateAdminStatus(orgId)
            })
            .catch(res => {
              this.context.setError(res.error)
            })
        })
    }
  }

  handleLoginSuccess = (orgId) => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || `/org/${orgId}` 
    history.push(destination)
  }

  // Displaying error messages

  handleDisplayUsernameError = () => {
    if (this.state.username.error) {
      return (
        <p className='error'>{this.state.username.error}</p>
      )
    } else {
      return <p></p>
    }
  }

  handleDisplayPasswordError = () => {
    if (this.state.password.error) {
      return (
        <p className='error'>{this.state.password.error}</p>
      )
    } else {
      return <p></p>
    }
  }

  // Validating inputs

  validateUsername = (e) => {
    if (e.target.value.length < 3) {
      this.setState({
        username: {
          value: e.target.value,
          error: 'Username must be at least 3 characters in length'
        }
      })
    } else {
      this.setState({
        username: {
          value: e.target.value,
          error: null
        }
      })
    }
  }

  validatePassword = (e) => {
    const password = this.state.password.value
    const upperLowerNumberSpecial = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/)
    if (password.length < 8) {
      this.setState({
        password: {
          value: password,
          error: 'Password must be at least 8 characters long.'
        }
      })
    } 
    if(password.length > 72) {
      this.setState({
        password: {
          value: password,
          error: 'Password must be less than 72 characters'
        }
      })
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      this.setState({
        password: {
          value: password,
          error: 'Password must not start or end with an empty space'
        }
      })
    }
    if(upperLowerNumberSpecial.test(password) === false) {
      this.setState({
        password: {
          value: password,
          error: 'Password must contain 1 of each: upper case, lower case, number and special character.'
        }
      })
    } else {
      this.setState({
        password: {
          value: e.target.value,
          error: null
        }
      })
    }
  }

  handleDisplayButton = () => {
    if (!this.state.password.error && !this.state.username.error) {
      return (
        <button type="submit">Sign in</button>
      )
    }
    if (this.state.password.error !== null || this.state.password.value.length === 0 || this.state.username.error !== null || this.state.username.value.length === 0) {
      return (
        <button type="submit" disabled>Sign in</button>
      )
    }
    return (
      <button type="submit">Sign in</button>
    )
  }

// rendering everything!

  render() {
    return (
      <section className='admin-login'>
      <form onSubmit={this.handleSubmitJwtAuth}>
        <h2>
          Organizers
        </h2>
        <p>Sign in with your username and password below.</p>
        <div className="login-form">
          <input type="text" id="username" name="username" onBlur={this.validateUsername} onChange={this.updateState} placeholder='username' />
          <input type="password" id="password" name="password" onBlur={this.validatePassword} onChange={this.updateState} placeholder="password" />
        </div>
        {this.handleDisplayButton()}
      </form>

      {this.handleDisplayUsernameError()}
      {this.handleDisplayPasswordError()}

      <p>
        New to Activities Assistant? 
        <Link to='/register'>
           Sign up here.
        </Link>
      </p>
    </section>
    )
  }
}

export default AdminLogin;