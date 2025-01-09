import React, { useEffect, useState } from 'react'
import { Container, Content } from '../helper'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHasAction, setHasClickedAction } from '../redux/redux-modules/application/actions';

const Header = styled.section`
    height: 50vh;
    position: relative;
    padding: 0px 20px;
    box-sizing: border-box;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 30%);
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;

        .back {
            width: 40px;
            height: 40px;
            cursor: pointer;
        }

    }
`;

const Title = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    white-space: initial;
    margin: 50px 0px;

    h2 {
        line-height: 100%;
        margin: 0px;
        font-size: clamp(42px, 4vw, 50px);
        font-weight: 500;
        font-family: "Kufam", sans-serif;
    }

    img {
        width: 50px;
        height: 50px;
    }
`;

const Message = styled.div`
    background-color: #F3F3F3;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 30px;
    border-radius: 6px;

    .header {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 30px;
            height: 30px;
        }
    }
    
    p {
        margin: 0px;
    }

    .button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        text-decoration: none;

        button {
            display: flex;
            padding: 6px 12px;
            box-sizing: border-box;
            gap: 5px;
            border-radius: 6px;
            border: 0px;
            background-color: ${({ theme }) => theme.secundary};
            cursor: pointer;

            p {
                color: white;
                text-transform: capitalize;
            }
        }

        .active {
            background-color: ${({ theme }) => theme.primary};
        }
    }
`;

const data = {
    user: {
        name: "John Doe",
        role: "Marine Biologist @ MARE-Madeira",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu."
    },
    connections: [
        {
            id: 2,
        },
    ],
    messages: [
        {
            id: 1,
            img: "/images/networkingroom/title1.png",
            name: "John Doe",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."
        },
        {
            id: 2,
            img: "/images/networkingroom/title2.png",
            name: "John Doe",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
        },
        {
            id: 3,
            img: "/images/networkingroom/title1.png",
            name: "John Doe",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."
        },
    ]
}

function NetworkingRoom(props) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        props.setHasAction(true)
        if (props.hasClickedAction) {
            setVisible(true);
            props.setHasClickedAction(false);
        }

    }, [props.hasClickedAction])

    const isConnected = (user) => {
        return data.connections.some(e => e.id === user);
    }

    return (
        <Container>
            <Header>
                <img className='background' src="/profile.jpg" alt="" />

                <Link to="/" className='navbar'>
                    <img className='back' src="/icons/back.svg" alt="icmb logo" />
                </Link>
            </Header>
            <Content>
                <h3>{data.user.name}</h3>
                <p>{data.user.role}</p>

                <h4>About</h4>
                <p>{data.user.description}</p>

                <Title>
                    <h2>Connect</h2>
                    <img src="/images/networkingroom/title1.png" alt="" />
                    <h2>with</h2>
                    <h2>the</h2>
                    <h2>community</h2>
                    <img src="/images/networkingroom/title2.png" alt="" />
                </Title>

                {data.messages.map((message) => {
                    const isCon = isConnected(message.id);

                    return (
                        <Message key={message.id}>
                            <div className='header'>
                                <img src={message.img} alt="" />
                                <h4>{message.name}</h4>

                            </div>
                            <p>{message.message}</p>


                            <Link to={"/chats/" + message.id} className="button-container">
                                <button className={isCon && "active"}>
                                    <p>{isCon ? "connected" : "connect"} </p>
                                    <img src="/icons/connect.svg" alt="" />
                                </button>
                            </Link>
                        </Message>
                    )
                })}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        hasClickedAction: state.application.hasClickedAction,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setHasAction: (value) => dispatch(setHasAction(value)),
        setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkingRoom);