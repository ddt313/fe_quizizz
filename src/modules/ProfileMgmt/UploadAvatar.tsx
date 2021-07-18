import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import {Icon} from '@blueprintjs/core';
import {action} from 'mobx';
import {observer} from 'mobx-react';

import uploadIcon from '../../assets/upload.svg';
import {BaseColor} from '../../theme';

import {useProfileStore} from './store';

type Prop = {
  inEditMode: boolean;
};
type AvatarImage = {
  alt?: string;
  src?: string;
};
// Todo: Edit This component after having a API for upload file or Avatar.
const UploadAvatar: React.FunctionComponent<Prop> = observer((props: Prop) => {
  const {inEditMode} = props;
  const store = useProfileStore();
  const [avatarImage, setAvatarImage] = React.useState<AvatarImage>({
    alt: store.user.avatar,
    src: store.user.avatar || undefined,
  });
  const uploadSingleFile = async (file: any) => {
    const formData = new FormData();

    formData.append('uploads[]', file, file.name);
  };

  const onDrop = action((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      uploadSingleFile(file);
      store.user.avatar = file.path;

      setAvatarImage({
        src: URL.createObjectURL(file),
        alt: file.path,
      });
    });
  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpeg, image/png',
  });

  return inEditMode ? (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {store.user.avatar ? (
        <>
          <DeleteIcon
            icon="delete"
            style={{display: 'flex', justifyContent: 'center'}}
            onClick={() => {
              store.user.avatar = '';
              setAvatarImage({src: '', alt: ''});
            }}
          />
          <PreviewImage src={avatarImage.src} alt={avatarImage.alt} />
        </>
      ) : (
        <UploadFileContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <UploadFileWrapper>
            <img src={uploadIcon} alt="uploadIcon" width={100} height={100} />
            <div style={{fontSize: '2rem', fontWeight: 300}}>{'click_or_drag_upload'} </div>
          </UploadFileWrapper>
        </UploadFileContainer>
      )}
    </div>
  ) : (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {store.user.avatar ? (
        <PreviewImage src={avatarImage.src} alt={avatarImage.alt} />
      ) : (
        'No Avatar'
      )}
    </div>
  );
});

export default UploadAvatar;
const DeleteIcon = styled(Icon)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: ${BaseColor.red};
`;
const PreviewImage = styled.img`
  display: flex;
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 50%;
`;
const UploadFileContainer = styled.div`
  display: flex;
  border: 1px dashed;
  width: 30rem;
  height: 22rem;
`;
const UploadFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
