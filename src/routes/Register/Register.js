import React from 'react'
import './Register.css'
import ActivitiesContext from '../../contexts/ActivitiesContext'
import OrgsApiService from '../../services/orgs-api-service'
import UsersApiService from '../../services/users-api-service'

class Register extends React.Component {
    static contextType = ActivitiesContext

    constructor(props) {
        super(props)
        this.state = {
            organization: {
                value: null,
                error: null,
            },
            orgId: null,
            username: {
                value: null,
                error: null,
            },
            password: {
                value: null,
                error: null,
            },
            repeatPassword: {
                value: null,
            },
            error: null,
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const newOrg = {
            org_name: this.state.organization.value,
        }
        OrgsApiService.postOrg(newOrg)
            .then(newOrg => {
                this.postUser(newOrg)
            })
            .catch(this.context.setError)
    }

    postUser = (newOrg) => {
        const newUser = {
            user_name: this.state.username.value,
            orgId: newOrg.id,
            password: this.state.password.value,
        }
        console.log({newUser})
        UsersApiService.postUser(newUser)
            .then(res => {
                OrgsApiService.getOrgs()
                    .then(this.context.setOrganizations)
                    .catch(this.setError)
            })
            .then(res => {
                this.props.history.push(`/signin`)
            })
            .catch(this.context.setError)
    }

    updateState = e => {
        const value = e.target.value
        const key = e.target.id
        this.setState({
            [key]: {
                value: value
            }
        })
    }

    validatePassword = e => {
        const firstPass = this.state.password.value
        const upperLowerNumberSpecial = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/)
        if (firstPass.length < 8) {
            this.setState({
                password: {
                    error: 'Password must be at least 8 characters long.'
                }
            })
        } 
        if(firstPass.length > 72) {
            this.setState({
                password: {
                    error: 'Password must be less than 72 characters'
                }
            })
        }
        if(firstPass.startsWith(' ') || firstPass.endsWith(' ')) {
            this.setState({
                password: {
                    error: 'Password must not start or end with an empty space'
                }
            })
        }
        if(upperLowerNumberSpecial.test(firstPass) === false) {
            this.setState({
                password: {
                    error: 'Password must contain 1 of each: upper case, lower case, number and special character.'
                }
            })
        } else {
            this.setState({
                password: {
                    value: firstPass,
                    error: null,
                }
            })
        }
    }

    doPasswordsMatch = e => {
        const firstPass = this.state.password.value
        const secondPass = this.state.repeatPassword.value
        if (firstPass !== secondPass) {
            this.setState({
                password: {
                    error: 'Passwords do not match.'
                }
            })
        } else {
            this.setState({
                password: {
                    value: firstPass,
                    error: null,
                }
            })
        }
    }

    validateOrg = e => {
        const org = e.target.value
        if (this.context.organizations.find(organization => {
            return (organization.org_name.toLowerCase()) === (org.toLowerCase())
        })) {
            this.setState({
                organization: {
                    error: 'An account already exists for this organization. Please get permission from your organizer to access your activity details.'
                }
            })
        } else if (org.length < 3) {
            this.setState({
                organization: {
                    error: 'Organization title must be at least 3 characters long.'
                }
            })
        } else {
            this.setState({
                organization: {
                    value: org,
                    error: null,
                }
            })
        }
    }

    validateUsername = e => {
        const username = e.target.value
        if (username.length < 3) {
            this.setState({
                username: {
                    error: 'Username must be at least 3 characters long.'
                }
            })
        } else {
            this.setState({
                username: {
                    value: username,
                    error: null,
                }
            })
        }
    }

    handleDisplayButton = () => {
        if (this.state.username.error !== null || this.state.organization.error !== null || this.state.password.error !== null || this.state.username.value === null || this.state.organization.value === null || this.state.password.value === null || this.state.repeatPassword.value === null) {
            return (
                <button type="submit" disabled>
                    Sign Up
                </button>
            )
        } else {
            return (
                <button type="submit">Sign Up</button>
            )
        }
    }

    displayError = () => {
        return (
            <div className="error">
                <p>{this.state.username.error} </p>
                <p>{this.state.organization.error} </p>
                <p>{this.state.password.error} </p>
            </div>
        )
    }

    render() {
        return (
            <>
                <header role="banner">
                    <h1>Create an account</h1>
                </header>

                <section className="registration">
                    <form onSubmit={this.handleSubmit} >
                        <h2>Organizers</h2>
                        <p>Create your account to save data for your activities to advertise your programs for your community.</p>
                    <label htmlFor="organization">
                        Organization
                    </label>
                    <input type="text" name="organization" id="organization" onChange={this.updateState} onBlur={this.validateOrg} />
                    <br />
                    <label htmlFor="username">
                        Create username
                    </label>
                    <input type="text" name="username" id="username" onChange={this.updateState} onBlur={this.validateUsername} />
                    <br />
                    <label htmlFor="password">
                        Create password
                    </label>
                    <input type="password" name="password" id="password" onChange={this.updateState} onBlur={this.validatePassword} />
                    <br />
                    <label htmlFor="password">
                        Repeat password
                    </label>
                    <input type="password" name="password" id="repeatPassword" onChange={this.updateState} onBlur={this.doPasswordsMatch} />
                    <br />
                    {this.displayError()}
                    {this.handleDisplayButton()}
                </form>
            </section>
        </>
        )
    }
}

export default Register