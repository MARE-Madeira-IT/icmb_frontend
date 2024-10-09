import React from 'react'
import Navbar from './pages/Navbar'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './globalStyles'
import { connect } from 'react-redux'
import { dark, light } from './theme'

function Template(props) {
    return (
        <ThemeProvider theme={props.theme === 'light' ? light : dark}>
            <GlobalStyles />
            {props.children}
            <Navbar />
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.application.theme,
    };
};


export default connect(
    mapStateToProps,
    null
)(Template);