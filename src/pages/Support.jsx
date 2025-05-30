import React, { useEffect } from "react";
import { Container, Content } from "../helper";
import Header from "../common/Header";
import { Collapse } from "antd";
import styled from "styled-components";
import { fetchFaqs } from "../redux/redux-modules/faq/actions";
import { connect } from "react-redux";

const FaqContainer = styled.section`
  .ant-collapse {
    background-color: transparent;
  }

  .ant-collapse-header {
    padding-left: 0px !important;
    border-bottom: 1px solid #e1e1e1;
  }

  .ant-collapse-header-text {
    font-size: 16px;
  }

  .ant-collapse-content-box {
    padding-top: 0px !important;
    p {
      margin-top: 0px;
    }
  }

  .ant-collapse-item-active {
    background-color: ${({ theme }) => theme.lightGradient};

    .ant-collapse-header {
      border-bottom: 0px;
    }

    .ant-collapse-header-text {
      color: white;
      font-weight: bold;
      padding-left: 16px !important;
    }

    .ant-collapse-content {
      color: white;
      font-size: 16px;
    }
  }
`;

const ContactContainer = styled.section`
  background-color: ${({ theme }) => theme.lightGradient};
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  flex-wrap: nowrap;
  gap: 30px;
  border-radius: 8px;

  .image {
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {
      margin: 10px 0px 0px 0px;
      text-align: center;
      white-space: nowrap;
    }
  }

  p {
    margin: 0;
    text-align: left;
    a {
      color: inherit;
      text-decoration: underline;
      text-align: center;
    }
  }
`;

function Support(props) {
  useEffect(() => {
    props.fetchFaqs();
  }, []);

  return (
    <Container>
      <Header
        hasback
        hasprofile
        background="/assets/images/default_header.jpg"
      />

      <Content>
        <h3>Contact us</h3>
        <p>
          Don't hesitate to contact us wether you have a suggestion on our
          improvement, a complain to discuss or an issue to solve.
        </p>

        <ContactContainer>
          <div className="image">
            <img src="/assets/icons/email.svg" alt="email envelope" />
            <h4>Email us</h4>
          </div>

          <p>
            Our team is online <br />
            <a href="mailto:support@marinebioinvasions.info">
              support@marinebioinvasions.info
            </a>
          </p>
        </ContactContainer>

        <h3>Frequently Asked Questions</h3>
        <FaqContainer>
          <Collapse
            accordion
            showArrow={false}
            items={props.data}
            ghost
            bordered={false}
          />
        </FaqContainer>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.faq.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFaqs: () => dispatch(fetchFaqs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
