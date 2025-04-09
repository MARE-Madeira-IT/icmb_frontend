import styled from "styled-components";

export const dimensions = {
    "xs": "575px",
    "sm": "576px",
    "md": "768px",
    "lg": "992px",
    "xl": "1200px",
    "xxl": "1600px",
};

const mimeToExtension = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/webp": "webp",
    "image/tiff": "tiff",
    "video/mp4": "mp4",
    "video/mpeg": "mpeg",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/x-matroska": "mkv",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "audio/flac": "flac",
    "text/plain": "txt",
    "text/html": "html",
    "text/css": "css",
    "text/javascript": "js",
    "application/json": "json",
    "application/zip": "zip",
    "application/x-rar-compressed": "rar"
};

function getFileExtension(blob) {
    return mimeToExtension[blob.type] || "unknown";
}

export const Container = styled.section`
    /* min-height: 100vh; */
    width: 100%;
`;

export const Content = styled.section`
    padding: 0px 20px;
    box-sizing: border-box;
    margin-bottom: 50px;
    min-height: calc(100vh - 430px);
`;

export function download(response, filename) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename + "." + getFileExtension(response.data));
    document.body.appendChild(link);
    link.click();
};