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
        // const newUser = {
        //     username: this.state.username.value,
        //     orgId: newOrgId,
        //     password: this.state.password.value,
        // }
        OrgsApiService.postOrg(newOrg)
            .then(
                console.log({newOrg})
                // UsersApiService.postUser(newUser)
                //     .then(
                //         this.props.history.push(`/signin`)
                //     )
                //     .catch(this.context.setError)
            )
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
        const secondPass = this.state.repeatPassword.value
        if (firstPass !== secondPass) {
            this.setState({
                password: {
                    error: 'Passwords do not match.'
                }
            })
        } else if (firstPass.length < 8) {
            this.setState({
                organization: {
                    error: 'Password must be at least 8 characters long.'
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
                    <input type="password" name="password" id="password" onChange={this.updateState} />
                    <br />
                    <label htmlFor="password">
                        Repeat password
                    </label>
                    <input type="password" name="password" id="repeatPassword" onChange={this.updateState} onBlur={this.validatePassword} />
                    <br />
                    {this.displayError()}
                    <button type="submit">Sign Up</button>
                </form>
            </section>
        </>
        )
    }
}

export default Register