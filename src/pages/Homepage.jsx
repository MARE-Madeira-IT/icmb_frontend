import React from 'react'
import { Container } from '../helper'
import { Link } from 'react-router-dom'

function Homepage() {

    return (
        <Container>
            Homepage
            <Link to="/message-board">msg board</Link>
        </Container>
    )
}

export default Homepage