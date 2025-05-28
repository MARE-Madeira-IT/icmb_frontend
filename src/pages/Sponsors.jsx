import React, { useEffect } from "react";
import { Container, Content } from "../helper";
import Header from "../common/Header";
import styled from "styled-components";
import { fetchSponsors } from "../redux/redux-modules/sponsor/actions";
import { connect } from "react-redux";

const Section = styled.div`
  h4 {
    text-transform: capitalize;
  }

  .sponsors {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .sponsor {
      flex-basis: calc(50% - 10px);
      background-color: ${({ theme }) => theme.primary};
      background: ${({ theme }) =>
        "radial-gradient(circle, " +
        theme.lightGradient +
        " 0%," +
        theme.darkGradient +
        " 100%)"};
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
        opacity: 0.2;
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

function Sponsors(props) {
  useEffect(() => {
    props.fetchSponsors();
  }, []);

  return (
    <Container>
      <Header hasback hasprofile background="/assets/images/default_header.jpg" />

      <Content>
        <h3>Thank you to our sponsors</h3>
        <p>
          We're excited to bring you an incredible conference, made possible by
          the generous support of our sponsors.
        </p>
        {Object.entries(props.sponsors).map((section, index) => (
          <Section key={index}>
            <h4>
              {section[0] != "organization"
                ? section[0] + " partner"
                : section[0]}
            </h4>

            <div className="sponsors">
              {section[1].map((sponsor, i) => (
                <div key={"sponsor_" + i} className="sponsor">
                  <img
                    className="decor first"
                    src={sponsor.logo}
                    alt="transparent logo"
                  />
                  <img className="main" src={sponsor.logo} alt="logo" />
                  <img
                    className="decor last"
                    src={sponsor.logo}
                    alt="transparent logo"
                  />
                </div>
              ))}
            </div>
          </Section>
        ))}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsor.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSponsors: () => dispatch(fetchSponsors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors);
