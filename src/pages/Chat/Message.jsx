import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: ${({ self }) => (self ? "flex-end" : "flex-start")};
    margin: 20px 0px;
    

    .content {
        padding: 10px;
        box-sizing: border-box;
        background-color: ${({ self }) => (self ? "#81BDDE" : "#f0f0f0")};
        width: 70%;
        border-radius: 6px;
        color: ${({ self }) => (self ? "white" : "black")};
        font-size: 14px;
  

        .date {
            font-size: 10px;
            opacity: 0.8;
            margin-top: 5px;
            float: right;
        }
    }
    
`;

const Message = ({ self, message }) => {
    return (
        <Container self={self} >
            <div className="content">

                <div role="text">
                    {message.content}
                </div>

                <small className="date">
                    {dayjs(message.created_at).format("HH:mm")}
                </small>
            </div>
        </Container>
    );
};

export default Message;
