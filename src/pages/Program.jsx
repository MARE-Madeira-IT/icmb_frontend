import React, { useEffect, useState } from "react";
import { Container, Content } from "../helper";
import Header from "../common/Header";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  fetchCalendars,
  updateSelfCalendar,
} from "../redux/redux-modules/calendar/actions";
import { connect } from "react-redux";
import CustomEmpty from "../common/CustomEmpty";

const HeaderContent = styled.div`
  height: calc(100% - 60px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 50px;
  box-sizing: border-box;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #efefef;
    border-radius: 6px;
    padding: 6px;
    box-sizing: border-box;

    button {
      border: 0px;
      padding: 6px 16px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 6px;
      background-color: transparent;

      &:hover {
        background-color: white;
      }
    }

    .active {
      background-color: white;

      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    }
  }
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  padding: 10px 0px;
  box-sizing: border-box;

  a {
    white-space: pre;
    text-align: center;
    margin: 0px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  .active {
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;

const SectionContainer = styled.section`
  margin-top: 20px;
  min-height: calc(100vh - 470px);
`;

const Section = styled.div`
  padding-top: 50px;
  margin-top: -50px;
  margin-bottom: 20px;

  .content {
    padding: 20px 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;

    .datetime {
      padding: 0px 20px;
      box-sizing: border-box;
      border-right: 1px solid #e1e1e1;
      opacity: 0.8;

      p {
        margin: 0px;
        font-size: 14px;
      }
    }

    .info {
      padding: 0px 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;

      button {
        cursor: pointer;
        background-color: transparent;
        border: 0px;
        box-shadow: 0px;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .title {
        h3,
        p {
          margin: 0px;
        }

        h3 {
          font-size: 16px;
        }
      }
    }
  }
`;
const filters = ["2025-10-06", "2025-10-07", "2025-10-08", "2025-10-09"];

function Program(props) {
  const { data } = props;
  const [myProgram, setMyProgram] = useState(0);
  const [currentFilter, setCurrentFilter] = useState(0);

  useEffect(() => {
    props.fetchCalendars();
  }, []);

  const CalendarEntry = ({ entry }) => (
    <Section id={entry.from}>
      <div className="content">
        <div className="datetime">
          <p>{dayjs(entry.date).format("MMM DD")}</p>
          <p>{dayjs(entry.from).format("H:mm A")}</p>
          <p>{dayjs(entry.to).format("H:mm A")}</p>
        </div>
        <div className="info">
          <div className="title">
            <h3>{entry.title}</h3>
            <p>{entry.room}</p>
          </div>
          <button>
            <img
              onClick={() => props.updateSelfCalendar(entry.id)}
              src={
                entry.my_schedule
                  ? "/assets/icons/program_schedule.svg"
                  : "/assets/icons/program_add.svg"
              }
              alt=""
            />
          </button>
        </div>
      </div>
    </Section>
  );

  return (
    <Container>
      <Header hasback hasprofile background="/assets/images/default_header.jpg">
        <HeaderContent>
          <div>
            <button
              onClick={() => setMyProgram(0)}
              className={myProgram ? "" : "active"}
            >
              Full schedule
            </button>
            <button
              onClick={() => setMyProgram(1)}
              className={myProgram ? "active" : ""}
            >
              My schedule
            </button>
          </div>
        </HeaderContent>
      </Header>
      <Content>
        <Filters>
          {filters.map((filter, index) => (
            <a
              key={index}
              href={"/program#" + filter}
              onClick={() => setCurrentFilter(index)}
              className={index == currentFilter ? "active" : ""}
            >
              {dayjs(filter).format("ddd[\n]MMM DD")}
            </a>
          ))}
        </Filters>

        <SectionContainer>
          <CustomEmpty>
            {Object.entries(data).map((section, index) => (
              <div key={"section_" + index}>
                {filters[currentFilter] ==
                  dayjs(section[0]).format("YYYY-MM-DD") && (
                  <div>
                    {myProgram == 0 && (
                      <h4 style={{ fontWeight: "400" }}>
                        {dayjs(section[0]).format("HH:mm A")}
                      </h4>
                    )}
                    {myProgram == 1 &&
                      section[1].some((centry) => centry.my_schedule == 1) && (
                        <h4 style={{ fontWeight: "400" }}>
                          {dayjs(section[0]).format("HH:mm A")}
                        </h4>
                      )}
                    {section[1].map((entry, i) => (
                      <div key={entry.id}>
                        {myProgram == 0 ? (
                          <CalendarEntry entry={entry} />
                        ) : (
                          myProgram == 1 &&
                          entry.my_schedule && <CalendarEntry entry={entry} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CustomEmpty>
        </SectionContainer>
      </Content>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCalendars: (filters) => dispatch(fetchCalendars(filters)),
    updateSelfCalendar: (id) => dispatch(updateSelfCalendar(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.calendar.data,
    loading: state.calendar.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);
