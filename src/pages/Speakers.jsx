import React from 'react'
import Header from '../common/Header'
import { Container, Content } from '../helper'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SpeakerList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin: 20px auto;
    gap: 50px;
`;

const Speaker = styled(Link)`
    height: 150px;
    width: 100%;
    text-decoration: none;
    
    .content {
        height: 100%;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,.3);
        display: flex;
        align-items: center;
        gap: 20px;
        position: relative;
        justify-content: ${props => props.iseven ? "start" : "end"};

        

        .speaker {
            height: calc(100% + 30px);
            filter: grayscale(1);
            margin: ${props => props.iseven ? "-30px 0px 0px 30px" : "-30px 30px 0px 0px"};
            order: ${props => props.iseven ? 1 : 2};
        }

        .info {
            display: flex;
            flex-direction: column;
            gap: 5px;
            min-height: 120px;
            order: ${props => props.iseven ? 2 : 1};
            

            h3 {
                font-size: clamp(16px, 3vw, 18px);
                color: #000000;
               
            }

            h4 {
                flex: 1;
                color: #a5a5a5;
                font-size: clamp(14px, 2vw, 16px);

            }

            p {
                color: #a5a5a5;
                font-size: clamp(12px, 2vw, 14px);
            }

            h3,h4,p {
                margin: 0;
            }
        }

        .triangle {
            z-index: -1;
            position: absolute;
            left: ${props => props.iseven ? 0 : "75%"};
            top: 50%;
            transform: ${props => props.iseven ? "translate(0, -50%)" : "translate(0, -50%) scaleX(-1)"};
            width: 25%;
            max-height: 80%;
        }

        .background {
            z-index: -1;
            position: absolute;
            right: ${props => props.iseven ? 0 : "70%"};
            bottom: 0;
            width: 30%;
            max-height: 90%;
        } 
    }
`;

function Speakers() {
    const speakers = [
        { name: "John Doe", country: "United States", role: "Marine Biologist", img: "speaker", background: "speaker_background" },
        { name: "Rúben Freitas", country: "Portugal", role: "Computer Engineer", img: "speaker", background: "speaker_background_2" },
        { name: "John Doe", country: "United States", role: "Marine Biologist", img: "speaker", background: "speaker_background" },
        { name: "Rúben Freitas", country: "Portugal", role: "Computer Engineer", img: "speaker", background: "speaker_background_2" },
        { name: "John Doe", country: "United States", role: "Marine Biologist", img: "speaker", background: "speaker_background" },
        { name: "Rúben Freitas", country: "Portugal", role: "Computer Engineer", img: "speaker", background: "speaker_background_2" }
    ]
    return (
        <Container>
            <Header hasback hasprofile background="/images/speakers.jpg" />
            <Content>
                <SpeakerList>
                    {speakers.map((speaker, index) => (
                        <Speaker to={"/speaker/" + index} iseven={index % 2 == 0} key={index}>
                            <div className='content'>
                                <img src="/icons/triangle.svg" alt="triangle" className="triangle" />
                                <img src={"/icons/" + speaker.background + ".svg"} alt="asbtract elements" className="background" />
                                <img src={"/images/" + speaker.img + ".png"} alt="speaker photo" className="speaker" />
                                <div className='info'>
                                    <h3>{speaker.name}</h3>
                                    <h4>{speaker.country}</h4>

                                    <p>{speaker.role}</p>
                                </div>
                            </div>
                        </Speaker>
                    ))}

                </SpeakerList>

            </Content>
        </Container>
    )
}

export default Speakers