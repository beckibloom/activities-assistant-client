import React from 'react'
import './Register.css'

class Register extends React.Component {
    render() {
        return (
            <>
                <header role="banner">
                    <h1>Create an account</h1>
                </header>

                <section className="registration">
                    <form>
                        <h2>Organizers</h2>
                        <p>Create your account to save data for your activities to advertise your programs for your community.</p>
                    <label htmlFor="organization">
                        Organization
                    </label>
                    <input type="text" name="organization" id="organization" />
                    <br />
                    <label htmlFor="username">
                        Create username
                    </label>
                    <input type="text" name="username" id="username" />
                    <br />
                    <label htmlFor="password">
                        Create password
                    </label>
                    <input type="password" name="password" id="password" />
                    <br />
                    <label htmlFor="password">
                        Repeat password
                    </label>
                    <input type="password" name="password" id="repeat-password" />
                    <br />
                    <button type="submit">Sign in</button>
                </form>
            </section>
        </>
        )
    }
}

export default Register