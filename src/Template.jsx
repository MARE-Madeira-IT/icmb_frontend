import React, { useEffect, useState } from 'react'
import Navbar from './pages/Navbar'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './globalStyles'
import { connect } from 'react-redux'
import { dark, light } from './theme'
import { Outlet, useLocation } from 'react-router-dom'
import { setHasAction } from './redux/redux-modules/application/actions'

const actionRoutes = ["/message-board"];
const actionImages = ["/public/icons/message_board.svg"];

function Template(props) {
    const [currentActionImage, setCurrentActionImage] = useState("")
    let location = useLocation();

    useEffect(() => {
        props.setHasAction(actionRoutes.includes(location.pathname))
        let hasAction = actionRoutes.includes(location.pathname)

        if (hasAction) {
            setCurrentActionImage(actionImages[actionRoutes.indexOf(location.pathname)])
        }

    }, [location.key])

    return (
        <ThemeProvider theme={props.theme === 'light' ? light : dark}>
            <GlobalStyles />
            <Outlet />
            <Navbar currentActionImage={currentActionImage} />
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.application.theme,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setHasAction: (value) => dispatch(setHasAction(value)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Template);