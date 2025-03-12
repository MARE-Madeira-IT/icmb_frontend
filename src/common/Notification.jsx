import { notification } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";

function Notification(props) {
  const { notifications, title, type } = props;
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    Object.values(notifications).map((notification) => {
      api["error"]({
        message: title,
        description: notification,
        showProgress: true,
        pauseOnHover: true,
      });
    });
  }, [notifications]);

  return <div>{contextHolder}</div>;
}

const mapStateToProps = (state) => {
  return {
    notifications: state.application.notifications,
    title: state.application.notificationTitle,
    type: state.application.notificationType,
  };
};

export default connect(mapStateToProps, null)(Notification);
