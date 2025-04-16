import React from "react";
import { Container, Content } from "../helper";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../common/Header";

const Map = styled.a`
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Section = styled.div`
  width: 100%;

  .title {
    h2 {
      text-align: center;
      font-weight: 400;
    }

    span {
      font-family: "Merienda", cursive;
    }
  }

  a {
    text-decoration: none;

    button {
      margin: 20px auto;
      display: block;
      cursor: pointer;
      padding: 8px 16px;
      box-sizing: border-box;
      border-radius: 6px;
      background-color: ${({ theme }) => theme.secundary};
      color: white;
      border: 0px;
      transition: all 0.3s ease;
    }

    &:hover {
      button {
        background-color: ${({ theme }) => theme.primary};
      }
    }
  }

  .activities {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    .activity {
      width: 50%;
      flex-basis: calc(50% - 10px);

      img {
        width: 100%;
        min-height: 100px;
        object-fit: cover;
        border-radius: 20px 6px 20px 6px;
      }

      p {
        margin: 5px 0px 3px 0px;
        font-size: 12px;
      }

      h4 {
        margin: 0px;
      }
    }
  }
`;

const HeaderContent = styled.div`
  color: white;
  height: 100%;
  display: flex;
  align-items: end;

  h2 {
    margin: 0px;
  }

  .country {
    display: flex;
    gap: 5px;
    margin-bottom: 100px;

    p {
      margin: 5px 0px;
    }
  }
`;

const data = {
  map: {
    image: "/images/map.jpg",
    url: "https://maps.app.goo.gl/qSKmjfqtSsscc9sx7",
  },
  description:
    "Breathtaking natural settings, crystal-clear waters, centuries-old traditions, genuine flavours and a great, great desire to welcome you. Come and experience a unique archipelago where the clock does not set the time and the calendar does not dictate the season.",
  sections: [
    {
      title: (
        <>
          The best <span>landscapes</span>
        </>
      ),
      viewmore: "https://visitmadeira.com/",
      activities: [
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
      ],
    },
    {
      title: (
        <>
          The <span>gastronomy</span> in the pearl of the Atlantic
        </>
      ),
      viewmore: "https://visitmadeira.com/",
      activities: [
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
      ],
    },
    {
      title: (
        <>
          Sea, nature and culture for <span>passionates</span>
        </>
      ),
      viewmore: "https://visitmadeira.com/",
      activities: [
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
        {
          image: "/images/header.jpg",
          location: "NORTH COAST",
          title: "Levada dos balcões",
        },
      ],
    },
  ],
};

function Venue() {
  return (
    <Container>
      <Header hasback hasprofile background="/images/madeira.jpg">
        <HeaderContent>
          <div>
            <h2>Madeira Island</h2>
            <div className="country">
              <img src="/assets/icons/flag.svg" alt="flag" />
              <p>Portugal</p>
            </div>
          </div>
        </HeaderContent>
      </Header>

      <Content>
        <Map href={data.map.url} target="__blank">
          <img src={data.map.image} alt="map" />
        </Map>

        <p>{data.description}</p>

        {data.sections.map((section) => (
          <Section>
            <div className="title">
              <h2>{section.title}</h2>
            </div>
            <div className="activities">
              {section.activities.map((activity) => (
                <div className="activity">
                  <img src={activity.image} alt="" />
                  <p>{activity.location}</p>
                  <h4>{activity.title}</h4>
                </div>
              ))}
            </div>
            <a href={section.viewmore} target="__blank">
              <button>View more</button>
            </a>
          </Section>
        ))}
      </Content>
    </Container>
  );
}

export default Venue;
