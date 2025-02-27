import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const ImageInput = ({ initImage, handleForm }) => {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: import.meta.env.VITE_API_URL + initImage,
    },
  ]);
  // useEffect(() => {
  //   if (iniImage) {
  //     setFileList({
  //       uid: "-1",
  //       name: "image.png",
  //       status: "done",
  //       url: import.meta.env.VITE_API_URL + iniImage,
  //     })
  //   }
  // }, [iniImage])

  const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], file.name, {
      type: blob.type,
    });
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList([newFileList[1]]);
  };

  const beforeUpload = async (newFile) => {
    var file = newFile;
    if (file.size > 1000000) {
      file = await compressImage(file, {
        quality: 0.5,
        type: "image/jpeg",
      });
    }

    handleForm({ name: "image", value: file });
    return false;
  };

  return (
    <ImgCrop quality={1} showReset>
      <Upload
        listType="picture-card"
        maxCount={2}
        fileList={fileList}
        showDownloadIcon
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        {fileList.length < 2 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};
export default ImageInput;
