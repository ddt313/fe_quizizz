import React from 'react';
import {Icon} from '@blueprintjs/core';
import styled, {css} from 'styled-components';

const Footer: React.FunctionComponent = () => {
  const defaultLanguage = localStorage.getItem('i18nextLng') || 'Select your language';
  const languages = [
    {id: 1, label: 'English', value: 'en'},
    {id: 2, label: 'Vietnamese', value: 'vi'},
  ];
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div>
        <CopyRight>footer</CopyRight>
      </div>
      <div className="bp3-select">
        <select onChange={changeLanguage} defaultValue={defaultLanguage}>
          {languages.map((lang) => (
            <option value={lang.value} key={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
        <Icon icon="double-caret-vertical" />
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  div:nth-child(1) {
    display: flex;
    margin-left: 5rem;
    flex: 1;
    justify-content: center;
  }
  div:nth-child(2) {
    display: flex;
    margin-right: 5rem;

    &:after {
      content: none;
    }
  }
  z-index: 2;
`;
const CopyRight = styled.p`
  ${({theme}) => css`
    margin: 0;
    font-size: 1.4rem;
    text-align: center;
    color: ${theme.colors.primary};
  `}
`;

export default Footer;
