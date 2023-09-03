import React from 'react';
import Support from '../components/support/Support';
import FileList from '../components/file_list/FileList';
import Uploader from '../components/uploader/Uploader';

const MainPage = () => {
  return (
    <>
      <Support />
      <FileList />
      <Uploader />
    </>
  )
};

export default MainPage;