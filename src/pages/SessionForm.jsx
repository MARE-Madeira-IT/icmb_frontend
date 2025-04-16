import React, { useEffect, useState } from "react";
import { Container, Content } from "../helper";
import Header from "../common/Header";
import {
  setHasAction,
  setHasClickedAction,
} from "../redux/redux-modules/application/actions";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestions } from "../redux/redux-modules/question/actions";
import { createForm } from "../redux/redux-modules/form/actions";
import { Slider } from "antd";

const marks = {
  0: "1",
  16.6: "2",
  33.3: "3",
  50: "4",
  66.6: "5",
  83.3: "6",
  100: "7",
};

function SessionForm(props) {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    props.fetchQuestions({ type: "session" });
  }, []);

  useEffect(() => {
    var initForm = {};
    props.questions.forEach((question) => {
      initForm[question.id] = 0;
    });

    setForm(initForm);
  }, [props.questions]);

  useEffect(() => {
    props.setHasAction(true);
    if (props.hasClickedAction) {
      var formattedAnswers = [];
      for (var key in form) {
        formattedAnswers.push({ question_id: key, answer: form[key] });
      }

      props
        .createForm({
          answers: formattedAnswers,
          formable_id: id,
          formable_type: "App\\Models\\ProgramSession",
        })
        .then(() => {
          navigate("/");
        });

      props.setHasClickedAction(false);
    }
  }, [props.hasClickedAction]);

  return (
    <Container>
      <Header hasback background="/assets/images/default_header.jpg" />
      <Content>
        <h3>Evaluate this poster based on the following aspects:</h3>
        {props.questions.map((question) => (
          <div style={{ padding: "0px 20px 0px 0px" }} key={question.id}>
            <p>{question.content}</p>
            <Slider
              onChange={(value) =>
                setForm({ ...form, [question.id]: parseInt(marks[value]) })
              }
              step={null}
              marks={marks}
            />
          </div>
        ))}
        <br />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.question.data,
    isAuthenticated: state.auth.isAuthenticated,
    hasClickedAction: state.application.hasClickedAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createForm: (data) => dispatch(createForm(data)),
    fetchQuestions: (filters) => dispatch(fetchQuestions(filters)),
    setHasAction: (value) => dispatch(setHasAction(value)),
    setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
