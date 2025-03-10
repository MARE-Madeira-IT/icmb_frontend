import React from "react";
import Header from "../common/Header";
import { Container, Content } from "../helper";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../redux/redux-modules/auth/actions";

const Action = styled.div`
  color: red;
`;

const FieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;

  p {
    margin: 0;
  }

  .value {
    color: #4d4d4dff;
  }

  .red {
    color: red;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    img {
      width: 10px;
    }
  }
`;

function Settings(props) {
  const { user } = props;

  const Field = ({ label, value, highlight, action, link }) => (
    <FieldContainer>
      <div>
        <p className={highlight}>{label}</p>
        {value && <p className="value">{value}</p>}
      </div>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button>
            <img src="/icons/settings_edit.svg" alt="" />
          </button>
        </a>
      ) : (
        <button onClick={action}>
          <img src="/icons/settings_edit.svg" alt="" />
        </button>
      )}
    </FieldContainer>
  );

  const FieldLink = ({ label, link }) => (
    <FieldContainer>
      <div>
        <p>{label}</p>
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button>
          <img src="/icons/settings_edit.svg" alt="" />
        </button>
      </a>
    </FieldContainer>
  );

  return (
    <Container>
      <Header hasback hasprofile background="/images/default_header.jpg" />
      <Content>
        <h3>Personal Details</h3>
        <p>
          ICMB uses this information to verify your identity and to keep our
          community safe.
        </p>

        <Field label="Contact info" value={user?.email} />
        <Field label="Change password" value="**********" />

        <h3>Rules & Policy</h3>
        <p>
          Attendees of ICMB should ensure that they have read and understood all
          of the following policies. Please direct any questions about these
          policies to us via email.
        </p>

        <Field
          label="Code of conduct"
          link="https://marinebioinvasions.info/about/policies/code-of-conduct"
        />
        <Field
          label="Refund policy"
          link="https://marinebioinvasions.info/about/policies/refunds"
        />
        <Field
          label="Privacy notice"
          link="https://marinebioinvasions.info/about/policies/privacy-notice"
        />
        <Field
          label="Photo release"
          link="https://marinebioinvasions.info/about/policies/photo-release"
        />
        <Field
          label="Health safety"
          link="https://marinebioinvasions.info/about/policies/health-safety"
        />

        <hr />

        <h3>Account Actions</h3>

        <Field action={props.logout} highlight="red" label="Logout" />
        <Field highlight="red" label="Delete account" />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
