import React from 'react'
import { Container, Content } from '../helper'
import Header from '../common/Header'
import styled from 'styled-components';

const text = {
    title: "Downloadable media & resources",
    description: "We're excited to bring you an incredible conference, made possible by the generous support of our sponsors."
}

const data = [
    {
        title: "Posters",
        image: ".png",
        count: 50,
        url: ""
    },
    {
        title: "Social Media",
        image: ".png",
        count: 11,
        url: ""
    },
    {
        title: "Program",
        image: ".png",
        count: 1,
        url: ""
    },
]

const Section = styled.div`
    box-shadow: 0px 0px 5px 3px rgba(0,0,0,.1);
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    border-radius: 6px;
    padding: 5px 10px ;
    box-sizing: border-box;
    cursor: pointer;

    .flex-container {
        display: flex;
        align-items: center;
        gap: 10px;

        .image-container {
            background-color: ${({ theme }) => theme.light};
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        h4 {
            margin: 0px;
        }
    }

   
`;

function Resources() {
    return (
        <Container>
            <Header hasback hasprofile background="images/resources_media.jpg" />

            <Content>
                <h3>{text.title}</h3>
                <p>{text.description}</p>

                <br />

                {data.map((section) => (
                    <Section>
                        <div className="flex-container">
                            <div className="image-container">
                                <img src={section.image} alt="" />
                            </div>
                            <h4>{section.title}</h4>
                        </div>
                        <p>{section.count}</p>
                    </Section>
                ))}
            </Content>
        </Container>
    )
}

export default Resources