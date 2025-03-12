import { Form, Input, message, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { updateUser } from "../../redux/redux-modules/auth/actions";
import { connect } from "react-redux";
import { setNotifications } from "../../redux/redux-modules/application/actions";

function SettingsForm(props) {
  const { visible, initEmail, fields } = props;
  const [form] = useForm();
  const [passwordVisible, setPasswordVisible] = useState([false, false, false]);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePasswordVisibility = (index) => {
    var visibility = [...passwordVisible];
    visibility[index] = !passwordVisible[index];
    setPasswordVisible(visibility);
  };

  const handleClose = () => {
    form.resetFields();
    props.setVisible(false);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      props
        .updateUser(values)
        .then(() => {
          handleClose();
        })
        .catch((err) => {
          props.setNotifications({
            notifications: err.response.data.errors,
            title: "Incorrect credentials",
            type: "error",
          });
        });
    });
  };

  return (
    <Modal centered onOk={handleSubmit} onCancel={handleClose} open={visible}>
      <Form initialValues={{ email: initEmail }} form={form}>
        {fields.includes("email") && (
          <Form.Item name="email" required label="Email">
            <Input label="Email" placeholder="Email" />
          </Form.Item>
        )}
        {fields.includes("password") && (
          <div>
            <Form.Item
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
              label="Current password"
            >
              <Input.Password
                visibilityToggle={{
                  visible: passwordVisible[0],
                  onVisibleChange: () => handlePasswordVisibility(0),
                }}
              />
            </Form.Item>

            <Form.Item
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
              label="New password"
            >
              <Input.Password
                visibilityToggle={{
                  visible: passwordVisible[1],
                  onVisibleChange: () => handlePasswordVisibility(1),
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              label="Confirm password"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                visibilityToggle={{
                  visible: passwordVisible[2],
                  onVisibleChange: () => handlePasswordVisibility(2),
                }}
              />
            </Form.Item>
          </div>
        )}
      </Form>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
    setNotifications: (data) => dispatch(setNotifications(data)),
  };
};

export default connect(null, mapDispatchToProps)(SettingsForm);
