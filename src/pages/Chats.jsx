import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../helper'
import Message from './Chat/Message'
import MessageInput from './Chat/MessageInput'
import Echo from 'laravel-echo';
import { connect } from 'react-redux';
import { createMessage, fetchMessages } from '../redux/redux-modules/message/actions';


const options = {
    broadcaster: 'pusher',
    key: "823c5f28ff80b7550228",
    cluster: "eu",
    forceTLS: "https",  //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: "http://localhost:8000/channels/chat",   // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
        headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM2MzQ3NzA2LCJleHAiOjE3MzYzNTEzMDYsIm5iZiI6MTczNjM0NzcwNiwianRpIjoibkVxM3BrM0JsaEdEQ1ZTaiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.oBPuKp9VtG3pO4FTEHGRnwGhOGYRMUZfF3u1amyZRIw`,
            Accept: 'application/json',
        },
    },
};



function Chats(props) {
    // const [currentEcho, setCurrentEcho] = useState(new Echo(options))
    const webSocketChannel = `chat`;
    const { messages, loading } = props;
    const scroll = useRef();
    const [allMessages, setAllMessages] = useState([]);


    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {

        // setCurrentEcho(echo);
        window.Echo.channel(webSocketChannel)
            .listen('MessageCreated', async (e) => {
                console.log(e.message);
                setAllMessages([...allMessages, e.message]);
                await getMessages();
            });
    }

    const getMessages = async () => {
        props.fetchMessages();
        setTimeout(scrollToBottom, 0);
    };


    useEffect(() => {
        getMessages()
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
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
                                [...messages, ...allMessages]?.map((message) => (
                                    <Message key={message.id}
                                        userId={1}
                                        message={message}
                                    />
                                ))
                            }
                            <span ref={scroll}></span>
                        </div>
                        <div className="card-footer">
                            <MessageInput createMessage={props.createMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: (filters) => dispatch(fetchMessages(filters)),
        createMessage: (data) => dispatch(createMessage(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        messages: state.message.data,
        loading: state.message.loading,
    };
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);