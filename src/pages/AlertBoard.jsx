import React, { useEffect, useState } from "react";
import { Container, Content } from "../helper";
import styled from "styled-components";
import Header from "../common/Header";
import { connect } from "react-redux";
import { fetchNotifications } from "../redux/redux-modules/notification/actions";
import { Link } from "react-router-dom";
import { Badge } from "antd";

const FilterContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 20px;
  border-bottom: 1px solid #e1e1e1;
  padding: 10px 20px;
  box-sizing: border-box;

  p {
    margin: 0px;
    cursor: pointer;
    text-transform: capitalize;
  }

  .active {
    color: ${({ theme }) => theme.primary};
    position: relative;
  }

  .active:before {
    content: "";
    width: calc(100% + 10px);
    height: 1px;
    background-color: ${({ theme }) => theme.primary};
    bottom: -10px;
    left: -5px;
    position: absolute;
  }
`;

const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid #e1e1e1;
  padding: 50px 0px;
  box-sizing: border-box;
  width: 100%;

  h4 {
    margin: 0px;
    font-size: 18px;
  }
  p {
    margin: 0px;
    font-size: 14px;
  }

  button {
    margin: 0px;
    display: block;
    padding: 8px 16px;
    border: none;
    background: ${({ theme }) => theme.darkGradient};
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 6px;
    font-weight: bold;

    a {
      color: white;
      text-decoration: none;
    }

    &:hover {
      background: ${({ theme }) => theme.primary};
    }
  }
`;

function AlertBoard(props) {
  const [filters, setFilters] = useState([
    "all",
    "connection",
    "system",
    "reminder",
  ]);
  const [currentFilter, setCurrentFilter] = useState(0);

  useEffect(() => {
    props.fetchNotifications();
  }, []);

  return (
    <Container>
      <Header hasback hasprofile background="/assets/images/default_header.jpg" />

      <FilterContainer>
        {filters.map((filter, index) => (
          <p
            key={index}
            onClick={() => setCurrentFilter(index)}
            className={currentFilter == index && "active"}
          >
            {filter}
          </p>
        ))}
      </FilterContainer>
      <Content>
        {props.data.map((notification, i) => {
          if (notification.type == filters[currentFilter] || currentFilter == 0)
            return (
              <NotificationContent key={i}>
                <div>
                  <Badge dot={!notification.pivot.seen}>
                    <h4 style={{ marginRight: "7px" }}>{notification.title}</h4>
                  </Badge>
                  <p>{notification.body}</p>
                </div>
                {notification.type == "connection" && (
                  <button>
                    <Link to="/chats">Message</Link>
                  </button>
                )}
              </NotificationContent>
            );
        })}
      </Content>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: (filters) => dispatch(fetchNotifications(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.notification.data,
    loading: state.notification.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertBoard);
