import React from 'react'
import './AddActivity.css'
import ActivitiesContext from './ActivitiesContext'

class AddActivity extends React.Component {
    static contextType = ActivitiesContext

    render() {
        return (
            <>
                <header role="banner">
                    <h1>Add New Activity</h1>
                </header>

                <form>
                    <section className="at-a-glance">
                        <p>Title: <input type="text" id="title"/></p>
                        <p>Day: <input type="text" id="day"/></p>
                        <p>Time: <input type="text" id="time"/></p>
                        <p>Ages: <input type="text" id="ages" /></p>
                        <p>Activity Group: <input type="text" id="group" /></p>
                        <p>Location: <input type="text" id="location" /></p>
                        <p>Cost: <input type="text" id="cost" /></p>
                        <p>Dates: <input type="text" id="dates"/></p>
                        <p className="image">
                            Activity image (provide URL)
                            <input type="text" id="thumbnail"/>
                        </p>
                    </section>

                    <section className="activity-details">
                        <p className="main-description">
                            Main activity description
                            <textarea id="description"></textarea>
                        </p>
                        <p className="prepare-info">
                            What should students prepare for?
                            <textarea id="preparation"></textarea>
                        </p>
                        <p className="contact-info">
                            Provide contact for questions
                            <textarea id="contact"></textarea>
                        </p>
                    </section>

                    <section>
                        <button>Save changes</button>
                    </section>
                </form>
            </>
        )
    }
}

export default AddActivity;