import React from 'react';
import './ActivitiesList.css';
import Activity from './Activity';
import ActivityFilters from './ActivityFilters';
import ActivitiesContext from './ActivitiesContext';

class ActivitiesList extends React.Component {
    render() {
        return (
            <ActivitiesContext.Consumer>

            {(context) => (
                <>
                    <header role="banner">
                        <h1>My Activities</h1>
                    </header>
        
                    <ActivityFilters />
        
                    <section className="activities">
                        <ul>
                            {context.activities.map(activity =>
                                <Activity
                                    key={activity.id}
                                    details={activity}
                                />)}
                        </ul>
                    </section>
                </>
            )}

            </ActivitiesContext.Consumer>
        )
    }
}

export default ActivitiesList;