import React, { useState } from "react";
import { createMessage } from "../../redux/redux-modules/message/actions";

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
        <div className="input-group">
            <br />
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
                    type="button">Send</button>
            </div>
        </div>
    );
};

export default MessageInput;
