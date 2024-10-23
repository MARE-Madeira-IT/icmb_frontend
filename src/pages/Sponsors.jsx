import React from 'react'
import { Container, Content } from '../helper'
import Header from '../common/Header'
import styled from 'styled-components';

const data = {
    title: "Thank you to our sponsors",
    description: "We're excited to bring you an incredible conference, made possible by the generous support of our sponsors.",
    sections: [
        {
            title: "Organization",
            sponsors: [
                { logo: "mare" }, { logo: "ssmb" }
            ]
        },

        {
            title: "Local sponsors",
            sponsors: [
                { logo: "mare" }, { logo: "ssmb" }, { logo: "mare" }, { logo: "ssmb" }, { logo: "mare" }, { logo: "ssmb" }
            ]
        }
    ]
}

const Section = styled.div`

    .sponsors {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;


        .sponsor {
            flex-basis: calc(50% - 10px);
            background-color: ${({ theme }) => theme.primary};
            background: ${({ theme }) => "radial-gradient(circle, " + theme.lightGradient + " 0%," + theme.darkGradient + " 100%)"};
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 20px 0px;
            margin-bottom: 20px;

            .main {
                z-index: 2;
                width: 70%;
            }

            .decor {
                position: absolute;
                
                width: 70%;
                opacity: .2;
            }

            .first {
                top: -15px;
            }

            .last {
                bottom: -15px;
            }
        }
    }
    

`;

function Sponsors() {
    return (
        <Container>
            <Header hasback hasprofile background="/images/sponsors.jpg" />

            <Content>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                {data.sections.map((section, index) => (
                    <Section key={index}>
                        <h4>{section.title}</h4>

                        <div className="sponsors">
                            {section.sponsors.map((sponsor, i) => (
                                <div key={"sponsor_" + i} className="sponsor">
                                    <img className="decor first" src={"/images/sponsors/" + sponsor.logo + ".png"} alt="logo" />
                                    <img className="main" src={"/images/sponsors/" + sponsor.logo + ".png"} alt="logo" />
                                    <img className="decor last" src={"/images/sponsors/" + sponsor.logo + ".png"} alt="logo" />
                                </div>
                            ))}

                        </div>
                    </Section>
                ))}
            </Content>
        </Container>
    )
}

export default Sponsors