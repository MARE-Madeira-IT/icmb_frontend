import React, { useState } from "react";
import Header from "../common/Header";
import { Container, Content } from "../helper";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../redux/redux-modules/auth/actions";
import SettingsForm from "./Settings/SettingsForm";

const FieldContainer = styled.div`
  a {
    color: black;
    text-decoration: none;
  }

  .field-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px;
    cursor: pointer;

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
  }
`;

function Settings(props) {
  const [formVisibility, setFormVisibility] = useState(false);
  const [fields, setFields] = useState([]);
  const { user } = props;

  const FieldContent = ({ aProps }) => (
    <div className="field-container">
      <div>
        <p className={aProps.highlight}>{aProps.label}</p>
        {aProps.value && <p className="value">{aProps.value}</p>}
      </div>

      <button>
        <img src="/assets/icons/settings_edit.svg" alt="" />
      </button>
    </div>
  );

  const Field = (aProps) => (
    <FieldContainer onClick={aProps.action}>
      {aProps.link ? (
        <a href={aProps.link} target="_blank" rel="noopener noreferrer">
          <FieldContent aProps={aProps} />
        </a>
      ) : (
        <FieldContent aProps={aProps} />
      )}
    </FieldContainer>
  );

  const handleFormOpen = (aFields) => {
    setFields(aFields);
    setFormVisibility(true);
  };

  return (
    <Container>
      <SettingsForm
        fields={fields}
        initEmail={props?.user?.email}
        visible={formVisibility}
        setVisible={setFormVisibility}
      />
      <Header hasback hasprofile background="/assets/images/default_header.jpg" />
      <Content>
        <h3>Personal Details</h3>
        <p>
          ICMB uses this information to verify your identity and to keep our
          community safe.
        </p>

        <Field
          action={() => handleFormOpen(["email"])}
          label="Contact info"
          value={user?.email}
        />
        <Field
          action={() => handleFormOpen(["password"])}
          label="Change password"
          value="**********"
        />

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
