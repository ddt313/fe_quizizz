import {observer} from 'mobx-react';
import React from 'react';
import Countdown from 'react-countdown';
import styled, {css} from 'styled-components';

import {BaseColor} from '../../../theme';
import {useStudentStore} from '../store';

type Props = {
  time: number;
};

const CountDown: React.FunctionComponent<Props> = ({time}: Props) => {
  const store = useStudentStore();

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      store.contestCompleted = true;
    }

    return (
      <Wrapper>
        <BlockTime>{hours}h</BlockTime>
        <BlockTime>{minutes}m</BlockTime>
        <BlockTime>{seconds}s</BlockTime>
      </Wrapper>
    );
  };

  return <Countdown date={Date.now() + time} renderer={renderer} />;
};

export default observer(CountDown);

const Wrapper = styled.div`
  ${({theme}) => css`
    background-color: ${theme.colors.primary};
    position: fixed;
    top: 8rem;
    left: 2rem;
    border-radius: 0.5rem;
    color: ${BaseColor.white};
    font-weight: 500;
    font-size: 1.6rem;
  `}
`;

const BlockTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 5rem;
`;
