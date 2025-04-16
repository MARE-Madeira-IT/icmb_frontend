import { Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "../common/Header";
import { Container } from "../helper";
import {
  setHasAction,
  setHasClickedAction,
} from "../redux/redux-modules/application/actions";
import { createPost, fetchPosts } from "../redux/redux-modules/post/actions";
import MasonryList from "./MessageBoard/MasonryList";
import useOnScreen from "../common/useOnScreen";
import ImageSvg from "../assets/message_board/image.svg?react";
import TextSvg from "../assets/message_board/text.svg?react";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
const Item = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 10px 34px -7px rgba(0, 0, 0, 0.75);

  &.text-item {
    background-color: "#F3F3F3";
    padding: 10px;
    gap: 10px;
  }

  & .author-info {
    flex-direction: row;
    gap: 10px;
    align-items: center;
    display: flex;
  }
  & .profile-img {
    aspect-ratio: 1;
    width: 25px;
    border-radius: 50%;
    overflow: hidden;
  }
  & .profile-name {
    font-weight: bold;
    font-size: 12px;
    color: #000;
  }
  & .message {
    font-size: 12px;
    color: "#000";
  }
`;

const Loader = styled.div`
  padding: 20px 0;
`;

const ImageItem = styled.img`
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 0px 10px 34px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 34px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 34px -7px rgba(0, 0, 0, 0.75);
`;

const TypeButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 15px;

  & button {
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    border: none;
    background-color: #ffffff;
    flex: 1;
    transition: background-color 0.3s ease-in-out;

    &.active {
      background-color: #75aae9;
    }

    & p {
      text-align: center;
      font-size: 16px;
      color: #000;
      margin: 0;
      margin-top: 10px;
    }

    &.active p {
      color: #ffffff;
    }

    & svg {
      width: 40px;
      color: #000;
    }

    &.active svg {
      color: #fff;
    }
  }
`;

const PreviewContainer = styled.div`
  max-width: 100%;
  cursor: pointer;

  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
`;

const UploadContainer = styled.div`
  & .ant-upload-wrapper,
  & .ant-upload {
    width: 100%;
    display: block;
  }
  & span.ant-upload {
    border: 1px solid #75aae9;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function MessageBoard(props) {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const loaderRef = useRef();
  const onEnd = useOnScreen(loaderRef);

  useEffect(() => {
    if (onEnd && !props.loading && page < props.meta?.last_page) {
      props.fetchPosts(page + 1);
      setPage((prev) => prev + 1);
    }
  }, [onEnd]);

  useEffect(() => {
    props.setHasAction(true);
    if (props.hasClickedAction) {
      setVisible(true);
      setFormValues({});
      setImagePreview(null);
      props.setHasClickedAction(false);
    }
  }, [props.hasClickedAction]);

  useEffect(() => {
    props.fetchPosts(page);
  }, []);

  const onCreate = () => {
    let formData = new FormData();

    if (formValues.image) {
      formData.append("image", formValues.image);
    } else {
      formData.append("message", formValues.message);
    }

    props.createPost(formData).then(() => setVisible(false));
  };

  const handleForm = (target) => {
    setFormValues({ ...formValues, [target.name]: target.value });
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
          htmlType: "submit",
        }}
        onCancel={() => setVisible(false)}
        onOk={onCreate}
        destroyOnClose
        // modalRender={(dom) => (
        //   <Form
        //     layout="vertical"
        //     form={form}
        //     name="form_in_modal"
        //     initialValues={{
        //       modifier: "public",
        //     }}
        //     clearOnDestroy
        //     onFinish={(values) => onCreate(values)}
        //   >
        //     {dom}
        //   </Form>
        // )}
      >
        <TypeButtonsContainer>
          <button className={type === 0 && "active"} onClick={() => setType(0)}>
            <ImageSvg />
            <p>Image</p>
          </button>
          <button className={type === 1 && "active"} onClick={() => setType(1)}>
            <TextSvg />
            <p>Text</p>
          </button>
        </TypeButtonsContainer>

        {type === 1 ? (
          <Input.TextArea
            rows={5}
            maxLength={255}
            onChange={(e) =>
              handleForm({ name: "message", value: e.target.value })
            }
          />
        ) : (
          <UploadContainer>
            <ImgCrop rotationSlider aspectSlider>
              <Upload
                style={{ width: "100%" }}
                maxCount={1}
                showUploadList={false}
                accept="image/*"
                beforeUpload={(file) => {
                  handleForm({ name: "image", value: file });

                  getBase64(file).then((base64) => {
                    setImagePreview(base64);
                  });

                  return false;
                }}
              >
                {imagePreview ? (
                  <PreviewContainer>
                    <img src={imagePreview} />
                  </PreviewContainer>
                ) : (
                  <div className="upload-btn">
                    Click to Upload <UploadOutlined />
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </UploadContainer>
        )}
      </Modal>
      <Header hasback hasprofile background="/assets/images/default_header.jpg" />
      <MasonryList
        // ListEmptyComponent={
        //   <View style={{ flexDirection: "row", gap: 20 }}>
        //     <View style={{ flex: 1 / 2, gap: 20 }}>
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 100 }}
        //       />
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 70 }}
        //       />
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 150 }}
        //       />
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 80 }}
        //       />
        //     </View>
        //     <View style={{ flex: 1 / 2, gap: 20 }}>
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 150 }}
        //       />
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 120 }}
        //       />
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 80 }}
        //       />
        //       <SkeletonLoading
        //         style={{ ...styles.item, width: "100%", height: 80 }}
        //       />
        //     </View>
        //   </View>
        // }
        style={{ gap: "20px" }}
        columnStyle={{ gap: "20px" }}
        renderItem={({ item, i }) => {
          if (item.image_url) {
            return (
              <ImageItem
                key={i}
                style={{ width: "100%", height: item.height }}
                src={item.image_url}
              />
            );
          } else {
            return (
              <Item key={i} className="text-item">
                <div className="author-info">
                  <img className="profile-img" src={item?.user?.image} />
                  <p className="profile-name">{item.user?.name}</p>
                </div>
                <p className="message">{item.message}</p>
              </Item>
            );
          }
        }}
        data={props.data}
      />
      <Loader ref={loaderRef} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    hasClickedAction: state.application.hasClickedAction,
    data: state.post.data,
    loading: state.post.loading,
    meta: state.post.meta,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHasAction: (value) => dispatch(setHasAction(value)),
    setHasClickedAction: (value) => dispatch(setHasClickedAction(value)),
    fetchPosts: (page) => dispatch(fetchPosts(page)),
    createPost: (data) => dispatch(createPost(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
