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
      error: null,
    },
    password: {
      value: '',
      error: null,
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
    console.log('updateState ran.')
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
          TokenService.saveAuthToken(res.authToken)
          OrgsApiService.getUserOrg(username)
            .then(id => {
              const orgId = id.org_id.toString()
              console.log('correct org id from handleSubmitJwtAuth', orgId)
              document.getElementById('username').value = ''
              document.getElementById('password').value = ''
              this.handleLoginSuccess(orgId)
              this.context.setActivities(orgId)
              this.context.updateAdminStatus(true)
            })
            .catch(res => {
              this.context.setError(res.error)
            })
        })
    }
  }

  handleLoginSuccess = (orgId) => {
    console.log('orgId from handleLoginSuccess', orgId)
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
    const password = e.target.value.length
    if (password.length < 8) {
      this.setState({
        password: {
          error: 'Password must be longer than 8 characters'
        }
      })
    }
    if (password.length > 72) {
      this.setState({
        password: {
          error: 'Password must be less than 72 characters'
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

// rendering everything!

  render() {
    return (
      <section className='admin-login'>
      <form onSubmit={this.handleSubmitJwtAuth}>
        <h2>
          Organizers
        </h2>
        <p>Sign in with your username and password below.</p>
        <label htmlFor="username">
          Username
        </label>
        <input type="text" id="username" name="username" onBlur={this.validateUsername} onChange={this.updateState} />
        <br />
        <label htmlFor="password">
          Password
        </label>
        <input type="password" id="password" name="password" onBlur={this.validatePassword} onChange={this.updateState} />
        <br/>
        <button type="submit">Sign in</button>
      </form>

      {this.handleDisplayUsernameError()}
      {this.handleDisplayPasswordError()}

      <p>
        New to Activities Assistant?
      <br/>
        <Link to='/register'>
          Sign up here.
        </Link>
      </p>
    </section>
    )
  }
}

export default AdminLogin;