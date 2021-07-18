import React from 'react';
import {Menu, MenuDivider, MenuItem} from '@blueprintjs/core';
import styled, {css} from 'styled-components';
import {NavLink, useHistory} from 'react-router-dom';

import {BaseColor} from '../../theme';
import {Role} from '../../types';

type PanelItemType = {
  name: string;
  path: string;
};

type Prop = {
  role: Role;
};

const generatePanelItem = (role: Role): PanelItemType[] => {
  if (role === Role.admin) {
    const listPanelItems: PanelItemType[] = [
      {name: 'See Pprofile', path: '/profile'},
      {name: 'Change Password', path: '/profile/change-password'},
    ];

    return listPanelItems;
  } else if (role === Role.lecturer) {
    const listPanelItems: PanelItemType[] = [
      {name: 'See Pprofile', path: '/profile'},
      {name: 'Change Password', path: '/profile/change-password'},
    ];

    return listPanelItems;
  } else {
    const listPanelItems: PanelItemType[] = [
      {name: 'See Pprofile', path: '/profile'},
      {name: 'Change Password', path: '/profile/change-password'},
    ];

    return listPanelItems;
  }
};

export const UserPanel: React.FunctionComponent<Prop> = (props: Prop) => {
  const history = useHistory();

  const {role} = props;
  const listPanelItems = generatePanelItem(role);

  return (
    <Menu className="docs-popover2-interaction-kind-example">
      {listPanelItems.map((item) => (
        <>
          <StyledNavLink exact to={item.path}>
            <MenuItem text={item.name} />
          </StyledNavLink>
          <MenuDivider />
        </>
      ))}

      <MenuItem
        text="Logout"
        onClick={() => {
          history.push('/');
        }}
      />
    </Menu>
  );
};

const activeClassName = 'nav-item-active';
const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  ${({theme}) => css`
    color: ${BaseColor.black};

    &.${activeClassName} li {
      border-radius: 0.5rem;
      color: ${BaseColor.white};
      background-color: ${theme.colors.secondary};
    }

    &:hover {
      color: ${BaseColor.black};
      text-decoration: none;
      background-color: ${BaseColor.gray};
    }
  `}
`;
