import React from "react";

// import { FilePond, File, registerPlugin } from 'react-filepond';
// import 'filepond/dist/filepond.min.css';
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
// import FilePondPluginImageResize from 'filepond-plugin-image-resize';
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// registerPlugin(
// 	FilePondPluginFileEncode,
// 	FilePondPluginFileValidateType,
// 	FilePondPluginImageExifOrientation,
// 	FilePondPluginImagePreview,
// 	FilePondPluginImageCrop,
// 	FilePondPluginImageResize,
// 	FilePondPluginImageTransform
// );

import SetComponent from "./Set/Set";

import "./Notes.scss";

const Notes = () => (
  <div className="notes">
    <SetComponent />
  </div>
);

export default Notes;
