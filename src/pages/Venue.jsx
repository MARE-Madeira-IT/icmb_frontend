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
      color: black;

      .copyright {
        position: relative;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 20px 6px 20px 6px;
        }
        span {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 14px;
          color: white;
          z-index: 2;
        }
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
    image: "/assets/images/map.jpg",
    url: "https://maps.app.goo.gl/qSKmjfqtSsscc9sx7",
  },
  description:
    "Breathtaking natural settings, crystal-clear waters, centuries-old traditions, genuine flavours and a great, great desire to welcome you. Come and experience a unique archipelago where the clock does not set the time and the calendar does not dictate the season.",
  sections: [
    {
      title: (
        <>
          Explore local <span>atractions</span>
        </>
      ),
      viewmore: "https://marinebioinvasions.info/attend/explore/local",
      activities: [
        {
          image: "/assets/images/activities/monte_palace.jpg",
          title: "Monte Palace Madeira",
          location: "GARDEN & MUSEUM",
          copyright: "Francisco Correia",
        },
        {
          image: "/assets/images/activities/funchal.jpg",
          location: "PROMENADE",
          copyright: "Francisco Correia",
          title: "Funchal Bay",
        },
        {
          image: "/assets/images/activities/mercado.jpg",
          location: "FARMERS' MARKET",
          copyright: "Visit Madeira",
          title: "Mercado dos Lavradores",
        },
        {
          image: "/assets/images/activities/story_center.jpg",
          location: "MUSEUM",
          title: "Madeira Story Centre",
          copyright: "Francisco Correia",
        },

        {
          image: "/assets/images/activities/sta_catarina.jpg",
          location: "GARDEN",
          title: "Santa Catarina Park",
          copyright: "Francisco Correia",
        },
        {
          image: "/assets/images/activities/lido.jpg",
          location: "PROMENADE",
          title: "Lido",
          copyright: "Francisco Correia",
        },
      ],
    },
    {
      title: (
        <>
          The best <span>landscapes</span>
        </>
      ),
      viewmore:
        "https://visitmadeira.com/en/what-to-do/nature-seekers/viewpoints/",
      activities: [
        {
          image: "/assets/images/activities/ribeira_janela.jpg",
          location: "NORTH COAST",
          title: "Ribeira da Janela",
          copyright: "Francisco Correia",
          url: "https://visitmadeira.com/en/where-to-go/madeira/north-coast/porto-moniz/ribeira-da-janela-viewpoint/",
        },
        {
          image: "/assets/images/activities/guindaste.jpg",
          location: "NORTH COAST",
          title: "Guindaste",
          copyright: "Francisco Correia",
          url: "https://visitmadeira.com/en/where-to-go/madeira/north-coast/santana/guindaste-viewpoint/",
        },
        {
          image: "/assets/images/activities/cabo_girao.jpg",
          location: "SOUTH COAST",
          title: "Cabo Girão",
          copyright: "Carlos Gouveia",
          url: "https://visitmadeira.com/en/where-to-go/madeira/south-coast/camara-de-lobos/cabo-girao/",
        },
        {
          image: "/assets/images/activities/eira_serrado.jpg",
          location: "SOUTH COAST",
          title: "Eira do Serrado",
          copyright: "Visit Madeira",
          url: "https://visitmadeira.com/en/where-to-go/madeira/south-coast/camara-de-lobos/eira-do-serrado-viewpoint/",
        },

        {
          image: "/assets/images/activities/cristo_rei.jpg",
          location: "EAST COAST",
          title: "Cristo Rei",
          copyright: "Nuno Andrade",
          url: "https://visitmadeira.com/en/where-to-go/madeira/east-coast/santa-cruz/cristo-rei-viewpoint/",
        },
        {
          image: "/assets/images/activities/portela.jpg",
          location: "EAST COAST",
          title: "Portela Viewpoint",
          copyright: "Francisco Correia",
          url: "https://visitmadeira.com/en/where-to-go/madeira/east-coast/machico/portela-viewpoint/",
        },

        {
          image: "/assets/images/activities/sao_sebastiao.jpg",
          location: "WEST COAST",
          title: "São Sebastião Viewpoint",
          copyright: "Visit Madeira",
          url: "https://visitmadeira.com/en/where-to-go/madeira/west-coast/ribeira-brava/sao-sebastiao-viewpoint/",
        },

        {
          image: "/assets/images/activities/encumeada.jpg",
          location: "WEST COAST",
          title: "Encumeada Viewpoint",
          copyright: "Visit Madeira",
          url: "https://visitmadeira.com/en/where-to-go/madeira/west-coast/ribeira-brava/encumeada-viewpoint/",
        },

        {
          image: "/assets/images/activities/bica_cana.jpg",
          location: "CENTRAL MOUNTAIN RANGE",
          title: "Bica da Cana",
          copyright: "Francisco Correia",
          url: "https://visitmadeira.com/en/where-to-go/madeira/west-coast/ponta-do-sol/bica-da-cana/",
        },
        {
          image: "/assets/images/activities/areeiro.jpg",
          location: "CENTRAL MOUNTAIN RANGE",
          title: "Pico do Arieiro",
          copyright: "Filipe Mendonça",
          url: "https://visitmadeira.com/en/where-to-go/madeira/madeira-peaks/pico-do-areeiro/",
        },
      ],
    },
    {
      title: (
        <>
          Sea and nature for <span>passionates</span>
        </>
      ),
      viewmore: "https://visitmadeira.com/",
      activities: [
        {
          image: "/assets/images/activities/whale_watching.jpg",
          location: "SEA ACTIVITIES",
          title: "Whale watching",
          copyright: "Ana Dinis",
          url: "https://visitmadeira.com/en/what-to-do/sea-lovers/activities/dolphin-whale-watching/",
        },
        {
          image: "/assets/images/activities/dive.jpg",
          location: "SEA ACTIVITIES",
          title: "Diving",
          url: "https://visitmadeira.com/en/what-to-do/sea-lovers/activities/diving/",
        },
        {
          image: "/assets/images/activities/boat_trips.jpg",
          location: "SEA ACTIVITIES",
          title: "Boat trips",
          copyright: "Francisco Correia",
          url: "https://visitmadeira.com/en/what-to-do/sea-lovers/activities/boat-trips/",
        },
        {
          image: "/assets/images/activities/kayaking.jpg",
          location: "SEA ACTIVITIES",
          title: "Kayaking",
          copyright: "Tiago Sousa",
          url: "https://visitmadeira.com/en/what-to-do/sea-lovers/activities/kayaking/",
        },
        {
          image: "/assets/images/activities/surf.jpg",
          location: "SEA ACTIVITIES",
          title: "Surf",
          copyright: "Nuno Rodrigues",
          url: "https://visitmadeira.com/en/what-to-do/sea-lovers/activities/surf/",
        },
        {
          image: "/assets/images/activities/swimming.jpg",
          location: "SEA ACTIVITIES",
          title: "Swimming",
          copyright: "Tiago Machado",
          url: "https://visitmadeira.com/en/what-to-do/sea-lovers/activities/swimming/",
        },

        {
          image: "/assets/images/activities/hiking.jpg",
          location: "NATURE ACTIVITIES",
          title: "Hiking",
          copyright: "Carlos Gouveia",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/",
        },
        {
          image: "/assets/images/activities/canyoning.jpg",
          location: "NATURE ACTIVITIES",
          title: "Canyoning",
          copyright: "Tiago Sousa",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/canyoning/",
        },
        {
          image: "/assets/images/activities/coasteering.jpg",
          location: "NATURE ACTIVITIES",
          title: "Coasteering",
          copyright: "",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/coasteering/",
        },
        {
          image: "/assets/images/activities/tours.jpg",
          location: "NATURE ACTIVITIES",
          title: "Tours",
          copyright: "Francisco Correia",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/madeira-tours/",
        },
        {
          image: "/assets/images/activities/bird.jpg",
          location: "NATURE ACTIVITIES",
          title: "Bird watching",
          copyright: "Miguel Moniz",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/bird-watching/",
        },
        {
          image: "/assets/images/activities/paragliding.jpg",
          location: "NATURE ACTIVITIES",
          title: "Paragliding",
          copyright: "Miguel Moniz",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/paragliding/",
        },
        {
          image: "/assets/images/activities/golf.jpg",
          location: "NATURE ACTIVITIES",
          title: "Golf",
          copyright: "Nuno Andrade",
          url: "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/golf/",
        },
      ],
    },
  ],
};

function Venue() {
  return (
    <Container>
      <Header hasback hasprofile background="/assets/images/madeira.jpg">
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

        {data.sections.map((section, i) => (
          <Section key={i}>
            <div className="title">
              <h2>{section.title}</h2>
            </div>
            <div className="activities">
              {section.activities.map((activity) => (
                <Link className="activity" to={activity.url} target="__blank">
                  <div className="copyright">
                    <img src={activity.image} alt={activity.title} />
                    <span>
                      {activity.copyright && "©"} {activity.copyright}
                    </span>
                  </div>
                  <p>{activity.location}</p>
                  <h4>{activity.title}</h4>
                </Link>
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
