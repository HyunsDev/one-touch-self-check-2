import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import './bar.css'
import Bar from "./components/bar";

import Main from './screen/main'
import Name from './screen/name'
import Birth from './screen/birth'
import Password from './screen/password'
import Loading from './screen/loading'
import Done from './screen/done'


const Divver = styled.div`
  max-width: 500px;
  width: 100vw;
  margin: 0px auto;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 100px;
`

function Router() {
  const [barStatus, setBarStatus] = useState('hidden')

  return (
    <BrowserRouter>
      <Bar status={barStatus} />
      <Divver>
        <Routes>
          <Route path="/" element={<Main setBarStatus={setBarStatus} />} />
          <Route path="/name" element={<Name setBarStatus={setBarStatus} />} />
          <Route path="/birth" element={<Birth setBarStatus={setBarStatus} />} />
          <Route path="/password" element={<Password setBarStatus={setBarStatus} />} />
          <Route path="/loading" element={<Loading setBarStatus={setBarStatus} />} />
          <Route path="/done" element={<Done setBarStatus={setBarStatus} />} />
        </Routes>
      </Divver>
    </BrowserRouter>
  );
}

export default Router;
