import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserReadings, removeUserReading, markFavorite, unfavorite } from '../store/actions/userReadings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import VirtualizedList from '../components/VirtualizedList';

class UserReadingsList extends Component {
    componentDidMount() {
        this.props.fetchUserReadings(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchUserReadings(this.props.match.params.id);
        }
    }

    render() {
        const { readings, removeUserReading, summary, fetchSummary, removeSummary, currentUser, markFavorite, unfavorite, loading } = this.props;
        
        return (
            <VirtualizedList 
                readings={readings}
                summary={summary}
                fetchSummary={fetchSummary}
                removeSummary={removeSummary}
                removeUserReading={removeUserReading}
                currentUser={currentUser}
                markFavorite={markFavorite}
                unfavorite={unfavorite}
                loading={loading}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.userReadings,
        summary: state.summary,
        currentUser: state.currentUser,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { 
    fetchUserReadings,
    fetchSummary,
    removeUserReading,
    removeSummary,
    markFavorite,
    unfavorite
})(UserReadingsList);