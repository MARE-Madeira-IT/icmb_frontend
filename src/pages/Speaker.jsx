import React, { useEffect } from 'react'
import { Container, Content } from '../helper'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setHasAction, setHasClickedAction } from '../redux/redux-modules/application/actions';
import { Link } from 'react-router-dom';

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

const Info = styled.section`

    p {
        font-size: 14px;
        margin: 0px;
    }

    h3, h4 {
        margin: 20px 0px 10px 0px;
    }
`;

const SocialContainer = styled.div`
    display: flex;
    gap: 5px;

    .social {
        background-color: #e8e8e8;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;

        img {
            width: 50%;
        }
    }
    
`;

function Speaker(props) {

    const data = {
        name: "John Doe",
        role: "Marine Biologist @ MARE-Madeira",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
        social: [
            {
                id: 1,
                platform: "facebook",
                value: "https://www.figma.com/design/SImeK9lnBpd571HLtBuLQj/ICMB?node-id=0-1&node-type=canvas&t=zypQOAQYJ2oBQV0j-0"
            },
            {
                id: 2,
                platform: "instagram",
                value: "my url"
            },
            {
                id: 3,
                platform: "linkedin",
                value: "my url"
            },
            {
                id: 4,
                platform: "pinterest",
                value: "my url"
            },
            {
                id: 5,
                platform: "spotify",
                value: "my url"
            },
            {
                id: 6,
                platform: "x",
                value: "my url"
            },
            {
                id: 7,
                platform: "youtube",
                value: "my url"
            },
            {
                id: 8,
                platform: "tiktok",
                value: "my url"
            }
        ],
    }

    useEffect(() => {
        props.setHasAction(true)
        if (props.hasClickedAction) {
            setVisible(true);
            props.setHasClickedAction(false);
        }

    }, [props.hasClickedAction])

    return (
        <Container>

            <Header>
                <img className='background' src="/profile.jpg" alt="" />

                <Link to="/speakers" className='navbar'>
                    <img className='back' src="/icons/back.svg" alt="icmb logo" />
                </Link>
            </Header>

            <Content>
                <Info>
                    <h3>{data.name}</h3>
                    <p>{data.role}</p>

                    <h4>About</h4>
                    <p>{data.description}</p>

                    <h4>Social Networks</h4>
                    <SocialContainer>
                        {data.social.map((currentSocial) => (
                            <a className='social' href={currentSocial.value} target='__blank'>
                                <img src={"/icons/social_media/" + currentSocial.platform + ".png"} alt={currentSocial.platform} />
                            </a>
                        ))}
                    </SocialContainer>

                    <h4>Sessions</h4>
                </Info>
            </Content>
        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        hasClickedAction: state.application.hasClickedAction,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setHasAction: (value) => dispatch(setHasAction(value)),
        setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speaker);
