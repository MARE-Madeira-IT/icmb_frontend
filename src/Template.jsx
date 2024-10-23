import React, { useEffect, useState } from 'react'
import Navbar from './pages/Navbar'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './globalStyles'
import { connect } from 'react-redux'
import { dark, light } from './theme'
import { Outlet, useLocation } from 'react-router-dom'
import { setHasAction } from './redux/redux-modules/application/actions'

const actionRoutes = ["message-board", "speaker", "poster-voting"];
const actionImages = ["/public/icons/message_board.svg", "/public/icons/share.svg", "/public/icons/submit.svg"];

function Template(props) {
    const [currentActionImage, setCurrentActionImage] = useState("")
    let location = useLocation();

    useEffect(() => {
        let pathname = getCurrentPathWithoutLastPart(location.pathname)
        props.setHasAction(actionRoutes.includes(pathname))
        let hasAction = actionRoutes.includes(pathname)

        if (hasAction) {
            setCurrentActionImage(actionImages[actionRoutes.indexOf(pathname)])
        }

    }, [location.key])

    const getCurrentPathWithoutLastPart = (path) => {
        let basename = path.split('/')
        return basename[1]
    }

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