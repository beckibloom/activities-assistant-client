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
                error: null,
            },
            error: null,
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        if (this.readyToSubmit() === false) {
            alert('There is a problem with some of the information you submitted. Please check it and try again!')
            return
        }

        const newOrg = {
            org_name: this.state.organization,
        }
        OrgsApiService.postOrg(newOrg)
            .then(newOrg => {
                this.postUser(newOrg)
            })
            .catch(this.context.setError)
    }

    postUser = (newOrg) => {
        const newUser = {
            user_name: this.state.username,
            orgId: newOrg.id,
            password: this.state.password,
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

    updateState = (e, validate) => {
        const value = e.target.value
        const key = e.target.id
        this.setState({[key]:value},validate(e));
    }

    hasWhiteSpace = (s) => {
        return s.indexOf(' ') >= 0;
    }

    validatePassword = e => {
        console.log(e.target.value)
        const firstPass = e.target.value;
        const key = e.target.id+"Error";
        if (firstPass === null) {
            return
        }
        const upperLowerNumberSpecial = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/)
        if (firstPass.length < 8) {
            this.setState({
                [key+"1"]:'Password must be at least 8 characters long.'
            })
        } 
        if(firstPass.length > 72) {
            this.setState({
                [key+"2"]:'Password must be less than 72 characters'
            })
        }
        if(firstPass.charAt(0) === ' ' || firstPass.charAt(firstPass.length-1) === ' ') {
            this.setState({
                [key+"3"]:'Password must not include spaces'
            })
        }
        if(upperLowerNumberSpecial.test(firstPass) === false) {
            this.setState({
                [key+"4"]:'Password must contain 1 of each: upper case, lower case, number and special character.'
            })
        } 
        else {
            this.setState({
                [key+"1"]:null,
                [key+"2"]:null,
                [key+"3"]:null,
                [key+"4"]:null,
            })
        }
    }

    doPasswordsMatch = e => {
        const firstPass = this.state.password
        const secondPass = e.target.value
        const key = e.target.id+"Error"
        if (firstPass !== secondPass) {
            console.log({firstPass}, {secondPass})
            this.setState({
                [key]:'Passwords do not match.'
            })
        } else {
            console.log('They match!')
            this.setState({
                [key]: null
            })
        }
    }

    validateOrg = e => {
        const org = e.target.value;
        const key = e.target.id+"Error";
        if (org === null) {
            return
        }

        if (this.context.organizations.find(organization => {
            return (organization.org_name.toLowerCase()) === (org.toLowerCase())
        })) {
            this.setState({[key]:'An account already exists for this organization. Please get permission from your organizer to access your activity details.'});
            
        } else if (org.length < 3) {
            console.log('else if org.length < 3')
            this.setState({[key]:'Organization title must be at least 3 characters long.'});
            
        } else {
            this.setState({[key]:null});
            
        }
    }

    validateUsername = e => {
        const username = e.target.value
        const key = e.target.id+"Error";
        if (username === null) {
            return
        }
        if (username.length < 3) {
            this.setState({
                [key]: 'Username must be at least 3 characters long.'
            })
        } else {
            this.setState({
                [key]:null
            })
        }
    }

    readyToSubmit = () => {
        if (this.state.usernameError !== null || this.state.organizationError !== null || this.state.passwordError1 !== null || 
        this.state.passwordError2 !== null || 
        this.state.passwordError3 !== null || 
        this.state.passwordError4 !== null || 
        this.state.repeatPasswordError !== null || this.state.username === null || this.state.organization === null || this.state.password === null || this.state.repeatPassword === null) {
            return false
        } else {
            return true
        }
    }

    displayError = () => {
        return (
            <div className="error">
                <p>{this.state.usernameError} </p>
                <p>{this.state.organizationError} </p>
                <p>{this.state.passwordError1} </p>
                <p>{this.state.passwordError2} </p>
                <p>{this.state.passwordError3} </p>
                <p>{this.state.passwordError4} </p>
                <p>{this.state.repeatPasswordError} </p>
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
                        <p>Create your account to save data for your activities and to advertise your programs for your community.</p>

                    <div className="registration-form">
                        <input type="text" name="organization" id="organization" onChange={e => this.updateState(e, this.validateOrg)} placeholder="organization" />
                        <input type="text" name="username" id="username" onChange={e => this.updateState(e, this.validateUsername)} placeholder="username" />
                        <input type="password" name="password" id="password" onChange={e => this.updateState(e, this.validatePassword)} placeholder="password" />
                        <input type="password" name="password" id="repeatPassword" onChange={e => this.updateState(e, this.doPasswordsMatch)} placeholder='password (again!)' />
                    </div>
                    {this.displayError()}
                    <button type="submit">Sign Up</button>
                </form>
            </section>
        </>
        )
    }
}

export default Register