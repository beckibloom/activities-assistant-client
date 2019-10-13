import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css';
import ACTIVITIES from '../../store'
import ActivitiesContext from '../../contexts/ActivitiesContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';


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

  handleSubmit = (e) => {
    console.log('handleSubmit ran.')
    e.preventDefault()

    if (this.state.username.error || this.state.password.error) {
      alert("There is a problem with your username or password. Please try again.")
    } else {
      this.isUserDataValid()
    }
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({
      username: {
        value: this.state.username.value,
        error: null,
      },
      password: {
        value: this.state.username.value,
        error: null,
      },
    })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.handleLoginSuccess()
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/' 
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

  isUserDataValid = () => {
    const pass = this.state.password.value
    const username = this.state.username.value
    const users = ACTIVITIES.users

    if (users.find(user => user.username.toLowerCase() === username.toLowerCase())) {
      console.log('User was found')
      const user = users.find(user => user.username.toLowerCase() === username.toLowerCase())
      console.log({user})
      if (user.password === pass) {
        console.log('Password matches! Yay!')
        this.context.setActivities(user.orgId)
        this.context.updateAdminStatus(true)
        this.props.history.push(`/org/${user.orgId}`)
      } else {
        console.log('Password does not match :(')
        this.setState({
          password: {
            value: pass,
            error: 'Username or password is incorrect'
          }
        })
      }
    } else {
      console.log('User not found :(', {username})
      this.setState({
        username: {
          value: username,
          error: 'Username or password is incorrect'
        }
      })
    }
  }

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
    if (e.target.value.length < 8) {
      this.setState({
        password: {
          error: 'Password must be at least 8 characters in length'
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
      <form onSubmit={this.handleSubmit}>
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