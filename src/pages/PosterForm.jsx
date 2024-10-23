import React, { useEffect, useState } from 'react'
import { Container } from '../helper'
import Header from '../common/Header'
import { setHasAction, setHasClickedAction } from '../redux/redux-modules/application/actions'
import { connect } from 'react-redux'

function PosterForm(props) {
    useEffect(() => {
        props.setHasAction(true)
        if (props.hasClickedAction) {
            // Do action here
            props.setHasClickedAction(false);
        }

    }, [props.hasClickedAction])

    return (
        <Container>
            <Header hasback background="/images/community_vote.jpg" />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        hasClickedAction: state.application.hasClickedAction,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setHasAction: (value) => dispatch(setHasAction(value)),
        setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PosterForm);