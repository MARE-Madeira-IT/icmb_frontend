import React, { useEffect, useRef, useState } from "react";
import { Container } from "../helper";
import Message from "./Chat/Message";
import MessageInput from "./Chat/MessageInput";
import Echo from "laravel-echo";
import { connect } from "react-redux";
import {
  createMessage,
  fetchMessages,
} from "../redux/redux-modules/message/actions";
import { useParams } from "react-router-dom";
import { fetchChat } from "../redux/redux-modules/chat/actions";

function Chat(props) {
  // const [currentEcho, setCurrentEcho] = useState(new Echo(options))
  // const webSocketChannel = `chat`;
  const webSocketChannel = `chats.${props.currentChat.socket}`;
  const { messages, loading } = props;
  const scroll = useRef();
  const [allMessages, setAllMessages] = useState([]);
  const [currentEcho, setCurrentEcho] = useState(undefined);
  const { id } = useParams();

  const scrollToBottom = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const getMessages = async () => {
    props.fetchMessages(1, { chat_id: id });
    setTimeout(scrollToBottom, 0);
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (currentEcho) {
      currentEcho
        .private(webSocketChannel)
        .listen("MessageCreated", async (e) => {
          console.log(e.message);
          setAllMessages([...allMessages, e.message]);
          await getMessages();
        });

      return () => {
        currentEcho.leave(webSocketChannel);
      };
    }
  }, [currentEcho]);

  useEffect(() => {
    if (props.currentChat.id) {
      console.log(props.currentChat);
      var cEcho = new Echo({
        broadcaster: "pusher",
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: "eu",
        encrypted: true,
        authEndpoint: import.meta.env.VITE_API_URL + "/broadcasting/auth", // As I'm using JWT tokens, I need to manually set up the headers.

        // authEndpoint: import.meta.env.VITE_API_URL + "/channels/chats." + props.currentChat.socket,   // As I'm using JWT tokens, I need to manually set up the headers.
        auth: {
            headers: {
                Authorization: `Bearer ` + localStorage.token,
                // Accept: 'application/json',
            },
        },
      });

      setCurrentEcho(cEcho);
    }
  }, [props.currentChat]);

  useEffect(() => {
    props.fetchChat(id);
  }, []);

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Chat Box</div>
            <div
              className="card-body"
              style={{ height: "500px", overflowY: "auto" }}
            >
              {[...messages, ...allMessages]?.map((message) => (
                <Message key={message.id} userId={1} message={message} />
              ))}
              <span ref={scroll}></span>
            </div>
            <div className="card-footer">
              <MessageInput
                user={props.currentUser}
                chat_id={id}
                createMessage={props.createMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (page, filters) => dispatch(fetchMessages(page, filters)),
    fetchChat: (id) => dispatch(fetchChat(id)),
    createMessage: (data) => dispatch(createMessage(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentChat: state.chat.current,
    messages: state.message.data,
    loading: state.message.loading,
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
