import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    display: flex;
    border: 2px solid #81BDDE;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 20px;

    input {
        border: 0px;
        flex: 1;
    }

    input:focus{
        outline: none;
    }

    button {
        border: 0px;
        background-color: transparent;
        color: white;
        cursor: pointer;
        box-shadow: 0px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            padding: 7px;
            box-sizing: border-box;
            background-color: #81BDDE;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            object-fit: contain;
        }
    }

`;

const MessageInput = (props) => {
    const [message, setMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        props.createMessage({ content: message, user_id: props.user.id, chat_id: props.chat_id });

        setMessage("");
    };

    return (
        <Container className="input-group">
            <input onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Message..."
                value={message}
            />
            <div className="input-group-append">
                <button onClick={(e) => sendMessage(e)}
                    className="btn btn-primary"
                    type="button"><img src="/assets/icons/message.svg" alt="send" /></button>
            </div>
        </Container>
    );
};

export default MessageInput;
