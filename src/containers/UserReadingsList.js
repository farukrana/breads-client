import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserReadings, removeReading } from '../store/actions/readings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import { removeLoader } from '../store/actions/loaders';
import List from '../components/List';
import ListItem from '../components/ListItem';

class UserReadingsList extends Component {
    componentDidMount() {
        this.props.fetchUserReadings(this.props.match.params.id);
        this.props.removeLoader();
    }

    render() {
        const { readings, removeReading, summary, fetchSummary, removeSummary, currentUser, isLoading } = this.props;
        let userReadingsList = readings.map(r => (
            <ListItem
                key={r.id}
                id={r.id}
                title={r.title}
                domain={r.domain}
                url={r.url}
                word_count={r.word_count}
                user_id={r.user_id}
                username={r.username}
                image={r.image}
                summary={summary.summary}
                viewSummary={fetchSummary.bind(this, r.id, r.article_url)}
                removeSummary={removeSummary}
                removeReading={removeReading.bind(this, r.user_id, r.id)}
                isCorrectUser={currentUser === r.user_id}
            /> 
        ));
        // console.log(isLoading);
        if (isLoading) {
            return <div>LOADING DATA</div>
        } else {
            return <List list_data={userReadingsList} display='list-group' />
        }
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        summary: state.summary,
        currentUser: state.currentUser.user.id,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps, { 
    fetchUserReadings,
    fetchSummary,
    removeReading,
    removeSummary,
    removeLoader
})(UserReadingsList);