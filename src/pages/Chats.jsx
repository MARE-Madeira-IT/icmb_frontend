import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../helper'
import { connect } from 'react-redux';
import { createChat, fetchChats } from '../redux/redux-modules/chat/actions';
import { Link } from 'react-router-dom';





function Chats(props) {

    useEffect(() => {
        props.fetchChats();

    }, []);



    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Chat Box</div>
                        <div className="card-body"
                            style={{ height: "500px", overflowY: "auto" }}>
                            {
                                props.chats?.map((chat) => (
                                    <Link style={{ margin: "20px" }} to={"/chats/" + chat.id} key={chat.id}
                                    >
                                        {chat.id}
                                    </Link>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchChats: (filters) => dispatch(fetchChats(filters)),
        createChat: (data) => dispatch(createChat(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentChat: state.chat.current,
        chats: state.chat.data,
        loading: state.chat.loading,
    };
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);