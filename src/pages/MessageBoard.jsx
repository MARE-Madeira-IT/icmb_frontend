import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setHasAction, setHasClickedAction } from '../redux/redux-modules/application/actions'
import { connect } from 'react-redux'
import { Container } from '../helper'
import { Form, Input, Modal } from 'antd'

function MessageBoard(props) {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();

    useEffect(() => {
        props.setHasAction(true)
        if (props.hasClickedAction) {
            setVisible(true);
            props.setHasClickedAction(false);
        }

    }, [props.hasClickedAction])

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setFormValues(values);
        setOpen(false);
    };

    return (
        <Container>
            <Modal
                open={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={() => setVisible(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        clearOnDestroy
                        onFinish={(values) => onCreate(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
            </Modal>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellat quos veritatis rem. Cupiditate, quas assumenda totam deleniti laudantium tempora consequuntur suscipit placeat impedit corrupti fuga repudiandae corporis cum voluptate.</p>

        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        hasClickedAction: state.application.hasClickedAction,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setHasAction: (value) => dispatch(setHasAction(value)),
        setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);