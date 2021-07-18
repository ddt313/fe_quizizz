import axios from 'axios';

import {HttpRequestError} from '../modules/ErrorHandler';

import {post} from './http';

const getS3UploadInfo = async (
  fileInfo: {
    mimeType: string;
    fileName: string;
    folderPath: string;
  }[],
) => {
  const response = await post('/upload/get-s3-upload-info', {fileInfo});

  return response.payload.result;
};

export async function uploadFilesToS3(
  files: File[],
  path: string,
): Promise<{name: string; url: string}[]> {
  const fileInfo = files.map((file) => ({
    mimeType: file.type,
    fileName: file.name,
    folderPath: path,
  }));
  const uploadInfo = await getS3UploadInfo(fileInfo);

  const uploadFilePromises = files.map(async (file: File) => {
    const config = {
      headers: {
        'Content-Type': file.type,
      },
    };
    const {presignedUrl, downloadLink} = uploadInfo.find(
      (info: {fileName: string}) => info.fileName === file.name,
    );

    const result = await axios.put(presignedUrl, file, config);

    return {
      name: result.config.data.name,
      downloadLink,
    };
  });

  try {
    const response = await Promise.all(uploadFilePromises);

    return response.map((res) => ({name: res.name, url: res.downloadLink}));
  } catch (err) {
    if (!err.response) {
      throw new HttpRequestError([{reason: 'NetworkError', message: 'Network Error'}]);
    }
    throw new HttpRequestError(err.response.data.failures, err.response.status);
  }
}
