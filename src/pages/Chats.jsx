import React, { useEffect, useRef, useState } from "react";
import { Container, Content } from "../helper";
import { connect } from "react-redux";
import { createChat, fetchChats } from "../redux/redux-modules/chat/actions";
import { Link, useLocation } from "react-router-dom";
import Header from "../common/Header";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { markAsRead } from "../redux/redux-modules/message/actions";

dayjs.extend(relativeTime);
const Chatroom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  border-radius: 6px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  gap: 20px;

  .image {
    img {
      width: 60px;
      height: 60px;
      border-radius: 20%;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    border-bottom: 1px solid #e1e1e1;
    padding: 10px;
    box-sizing: border-box;

    .info {
      flex: 1;

      color: black;

      h3 {
        margin: 0px;
      }

      p {
        font-size: 12px;
        margin: 0px;
        opacity: 0.7;
        width: calc(
          100vw - 200px
        ); /* the element needs a fixed width (in px, em, %, etc) */
        overflow: hidden; /* make sure it hides the content that overflows */
        white-space: nowrap; /* don't break the line */
        text-overflow: ellipsis; /* give the beautiful '...' effect */
      }
    }

    .details {
      p {
        font-size: 10px;
        margin: 0px;
        color: black;
      }

      .notification {
        float: right;
        background-color: ${({ theme }) => theme.primary};
        color: white;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin-top: 5px;
      }
    }
  }
`;

function Chats(props) {
  useEffect(() => {
    props.fetchChats();
  }, []);

  return (
    <Container>
      <Header hasback hasprofile background="/images/default_header.jpg" />

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div
              className="card-body"
              style={{ height: "500px", overflowY: "auto" }}
            >
              {props?.chats?.map((chat) => (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/chats/" + chat.id}
                  key={chat.id}
                >
                  <Chatroom>
                    <div className="image">
                      <img src={chat?.recipient?.image} alt="" />
                    </div>
                    <div className="content">
                      <div className="info">
                        <h3>{chat?.recipient?.name}</h3>
                        <p>{chat?.message?.content}</p>
                      </div>
                      <div className="details">
                        <p className="date">
                          {dayjs(chat?.message?.created_at).fromNow()}
                        </p>
                        {chat.unread_messages ? (
                          <p className="notification">{chat.unread_messages}</p>
                        ) : null}
                      </div>
                    </div>
                  </Chatroom>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
