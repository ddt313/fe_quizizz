import React from 'react';
import styled, {css} from 'styled-components';
import {Popover2} from '@blueprintjs/popover2';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';

import {BaseColor} from '../../theme';
import avatar from '../../assets/avatar.jpg';
import {Role} from '../../types';
import logo from '../../assets/quizizz.png';

import {UserPanel} from './UserPanel';

type Prop = {
  role: Role;
};

type NavLinkType = {
  name: string;
  path: string;
};

const getNavLinks = (role: Role): NavLinkType[] => {
  if (role === Role.admin) {
    const listPanelItems: NavLinkType[] = [
      {name: 'See Profile', path: '/profile'},
      {name: 'Change Password', path: '/profile/change-password'},
    ];

    return listPanelItems;
  } else if (role === Role.lecturer) {
    const listPanelItems: NavLinkType[] = [
      {name: 'Câu hỏi', path: '/lecturer/questions'},
      {name: 'Đề thi', path: '/lecturer/exam-questions'},
      {name: 'Kỳ thi', path: '/lecturer/exams'},
    ];

    return listPanelItems;
  } else {
    const listPanelItems: NavLinkType[] = [
      {name: 'See Profile', path: '/profile'},
      {name: 'Change Password', path: '/profile/change-password'},
    ];

    return listPanelItems;
  }
};

const Navbar: React.FunctionComponent<Prop> = (props: Prop) => {
  const {role} = props;
  const navLinks = getNavLinks(role);

  return (
    <StyledNavbar>
      <Container>
        <LogoWrapper>
          <Logo src={logo} alt="logo" />
        </LogoWrapper>
        <ContainerListNavLink>
          <HeadingWrapper>
            {navLinks.map((navLink, index) => (
              <StyledNavLink key={index} to={navLink.path}>
                <StyledTextNavLink>{navLink.name}</StyledTextNavLink>
              </StyledNavLink>
            ))}
          </HeadingWrapper>

          <IconNavbar>
            <Avatar src={avatar} alt="avatar" />
            <Popover2
              enforceFocus={false}
              content={<UserPanel role={role} />}
              placement="auto"
              interactionKind="click"
            >
              <StyledFontAwesomeIcon icon={faSortDown} color={BaseColor.white} />
            </Popover2>
          </IconNavbar>
        </ContainerListNavLink>
      </Container>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.div`
  ${({theme}) => css`
    padding: 0 2rem;
    * {
      box-sizing: content-box;
      font-weight: normal;
    }
    background-color: ${theme.colors.primary};
  `}
`;

const Container = styled.div`
  display: flex;
  max-width: 1440px;
  flex-direction: row;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 17rem;
  height: 4rem;
  padding: 0 0.1rem 0 0;
  margin: auto 0;
  justify-content: center;
  border-style: solid;
  border-width: 0 2px 0 0;
  border-color: ${BaseColor.white};
`;
const Logo = styled.img`
  width: 77%;
  height: 100%;
`;

const Avatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

const IconNavbar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const ContainerListNavLink = styled.div`
  &&& * {
    box-sizing: border-box;
  }
  display: flex;
  height: 5rem;
  flex: 1;
`;

const HeadingWrapper = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.background};
    margin-left: 4.3rem;
  `}
`;

const activeClassName = 'nav-item-active';
const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: normal;
    font-size: 1.8rem;
    margin-right: 5.2rem;
    color: ${BaseColor.white};
    transition: 2s all step-end;

    &.${activeClassName} {
      border: 0.3rem solid;
      border-color: ${theme.colors.primary};
      border-bottom-color: ${BaseColor.white};
      border-left-width: 0;
      border-right-width: 0;
    }

    &:hover {
      color: ${BaseColor.white};
      text-decoration: none;

      div {
        border: none;
        padding: 0.6rem 0;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 0.5rem;
        color: ${BaseColor.white};
        text-decoration: none;
        background-color: rgba(196, 196, 196, 0.5);
      }
    }
  `}
`;

const StyledTextNavLink = styled.div`
  &:hover {
    border: none;
    padding: 0.6rem 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    color: ${BaseColor.white};
    text-decoration: none;
    background-color: rgba(196, 196, 196, 0.5);
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 3rem;
  &&& {
    width: 3rem;
  }
`;

export default Navbar;
