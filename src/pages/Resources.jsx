import React, { useEffect } from "react";
import { Container, Content } from "../helper";
import Header from "../common/Header";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchResource,
  fetchResources,
} from "../redux/redux-modules/resource/actions";
import { Collapse } from "antd";

const text = {
  title: "Downloadable media & resources",
  description:
    "We're excited to bring you an incredible conference, made possible by the generous support of our sponsors.",
};

const Section = styled(Collapse)`
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  margin: 30px 0px;

  .ant-collapse-header {
    padding: 0px !important;
  }

  .collapsable-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;

    img {
      width: 15px;
      margin-right: 10px;
    }

    button {
      background-color: white;
      border: 1px solid black;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
    }

    .title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0px 20px 0px 0px;
    }
  }

  .header-flex {
    display: flex;
    justify-content: space-between;

    border-radius: 6px;
    padding: 5px 10px;
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
        text-transform: capitalize;
      }
    }
  }
`;

function Resources(props) {
  useEffect(() => {
    props.fetchResources();
  }, []);

  return (
    <Container>
      <Header hasback hasprofile background="/images/default_header.jpg" />

      <Content>
        <h3>{text.title}</h3>
        <p>{text.description}</p>

        <br />

        {Object.entries(props.data).map((section) => (
          <Section expandIcon={() => <div />} collapsible="header" ghost>
            <Collapse.Panel
              header={
                <div className="header-flex">
                  <div className="flex-container">
                    <div className="image-container">
                      <img src={section.image} alt="" />
                    </div>
                    <h4>{section[0]}</h4>
                  </div>
                  <p>{section[1].length}</p>
                </div>
              }
              key={section[0]}
            >
              {section[1].map((section) => (
                <div className="collapsable-flex-container">
                  <p className="title">{section.title}</p>
                  <button onClick={() => props.fetchResource(section.id)}>
                    <img src="/icons/download.svg" alt="" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </Collapse.Panel>
          </Section>
        ))}
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.resource.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResources: () => dispatch(fetchResources()),
    fetchResource: (id) => dispatch(fetchResource(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
