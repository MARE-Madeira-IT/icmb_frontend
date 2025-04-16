import React, { useEffect, useRef, useState } from "react";
import { Container, Content } from "../helper";
import Message from "./Chat/Message";
import MessageInput from "./Chat/MessageInput";
import Echo from "laravel-echo";
import { connect } from "react-redux";
import {
  addMessage,
  createMessage,
  fetchMessages,
  markAsRead,
} from "../redux/redux-modules/message/actions";
import { useLocation, useParams } from "react-router-dom";
import { fetchChat } from "../redux/redux-modules/chat/actions";
import Header from "../common/Header";
import styled from "styled-components";
import dayjs from "dayjs";
import Pusher from "pusher-js";

const MessageContainer = styled.div`
  h4 {
    text-align: center;
    font-weight: normal;
    opacity: 0.8;
    font-size: 12px;
  }
`;

function Chat(props) {
  const webSocketChannel = `chats.${props.currentChat.socket}`;
  const { messages, loading } = props;
  const scroll = useRef();
  const [hasSetMessage, setHasSetMessage] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const { id } = useParams();
  let location = useLocation();

  const getMessages = async () => {
    props.fetchMessages(1, { chat_id: id });
  };

  useEffect(() => {
    if (messages.length && scroll.current) {
      scroll.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!hasSetMessage) {
      setAllMessages([...allMessages, ...messages]);
      setHasSetMessage(true);
    }
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (props.currentChat.id) {
      window.Echo.private(webSocketChannel).listen(
        "MessageCreated",
        async (e) => {
          if (e.message.user.id != props.currentUser.id) {
            props.addMessage(e);
          }
        }
      );
    }

    return () => {
      window.Echo.leave(webSocketChannel);
    };
  }, [props.currentChat.id]);

  useEffect(() => {
    props.fetchChat(id);
  }, []);

  useEffect(() => {
    props.markAsRead({ chat_id: id });
  }, [location]);

  return (
    <Container>
      <Header
        height="150px"
        hasback
        hasprofile
        background="/assets/images/default_header.jpg"
      />
      <Content style={{ height: "calc(100vh - 285px)" }}>
        <div>
          <div style={{ height: "calc(100vh - 350px)", overflowY: "auto" }}>
            {messages.map((dates) => (
              <MessageContainer key={dates.date}>
                <h4>{dayjs(dates.date).format("dddd, MMM D")}</h4>
                {dates.messages.map((message) => (
                  <Message
                    key={message.id}
                    self={message.user.id == props.currentUser.id}
                    message={message}
                  />
                ))}
                <div ref={scroll} />
              </MessageContainer>
            ))}
            <br />
            <div ref={scroll} />
          </div>

          <MessageInput
            user={props.currentUser}
            chat_id={id}
            createMessage={props.createMessage}
          />
        </div>
      </Content>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (page, filters) => dispatch(fetchMessages(page, filters)),
    markAsRead: (filters) => dispatch(markAsRead(filters)),
    fetchChat: (id) => dispatch(fetchChat(id)),
    createMessage: (data) => dispatch(createMessage(data)),
    addMessage: (record) => dispatch(addMessage(record)),
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
