import React, { useContext, useEffect, useState } from 'react';
import { useTheme, withTheme } from '@material-ui/core';
import styled from 'styled-components';
import ListCard from './list.card';
import { DataObject, User } from '../../api/types';
import { ViewStreamOutlined, ViewWeekOutlined } from '@material-ui/icons';
import IconButtonWithLabel from '../buttonWithLabel';
import { useWindowWidth } from '@react-hook/window-size';
import { FilterContext } from '../../context/filter.context';

interface ListProps {
  commits: DataObject[];
  users: User[];
}

const List = ({ commits, users }: ListProps) => {
  const [showColumnToggle, setShowToggleButton] = useState<boolean>(false);
  const [showColumns, setShowColumns] = useState<boolean>(true);

  const width: number = useWindowWidth();

  const {
    state: { category }
  } = useContext(FilterContext);

  const {
    breakpoints: {
      values: { md }
    }
  } = useTheme();

  useEffect(() => {
    const showColumnToggleBasedOnWidth = width > md;

    if (showColumnToggleBasedOnWidth !== showColumnToggle) {
      setShowToggleButton(showColumnToggleBasedOnWidth);
    }
  }, [width, md, showColumnToggle]);

  useEffect(() => {
    if (!showColumnToggle) setShowColumns(false);
  }, [showColumnToggle]);

  const columns = users.filter((u) => u.show).length;

  const getColumnNum = (user: User) => users.indexOf(user) + 1;

  const getUser = (user: User) =>
    users.map((user) => user).indexOf(user) !== -1
      ? users[users.indexOf(user)]
      : null;

  return (
    <OuterScrollWrapper>
      <MainWrapper showColumns={showColumns}>
        <ToggleButtonWrapper>
          {showColumnToggle && (
            <IconButtonWithLabel
              onClick={() => setShowColumns(!showColumns)}
              icon={showColumns ? <ViewStreamOutlined /> : <ViewWeekOutlined />}
              label={showColumns ? 'List' : 'Columns'}
            />
          )}
        </ToggleButtonWrapper>

        <ColumnTitlesWrapper columns={columns} showColumns={showColumns}>
          {showColumns ? (
            users
              .filter((u) => u.show)
              .map((user: User, index: number) => (
                <ColumnTitle key={'c-user-' + index}>{user.alias}</ColumnTitle>
              ))
          ) : (
            <ColumnTitle>All {category.toLowerCase()}</ColumnTitle>
          )}
        </ColumnTitlesWrapper>
        <BackgroundWrapper>
          {showColumns &&
            Array.from(Array(columns + 1)).map((e, index) => (
              <span key={'span' + index} />
            ))}
        </BackgroundWrapper>

        <ListWrapper columns={columns} showColumns={showColumns}>
          {commits
            .filter((u) => u.user.show)
            .map((commitData, index) => (
              <CardWrapper
                columns={columns}
                showColumns={showColumns}
                currentColumn={getColumnNum(commitData.user)}
                key={'commit-wrapper-' + index}
              >
                <ListCard
                  commitData={commitData}
                  key={'commit-' + index}
                  openOnClick={!showColumns}
                  user={getUser(commitData.user)}
                />
              </CardWrapper>
            ))}
        </ListWrapper>
      </MainWrapper>
    </OuterScrollWrapper>
  );
};

interface ColumnsProps {
  columns: number;
  showColumns: boolean;
}

interface CommitCardWrapperProps extends ColumnsProps {
  currentColumn: number;
}

const ToggleButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 3%;
`;

const CardWrapper = styled.div<CommitCardWrapperProps>`
  ${(props) =>
    props.showColumns
      ? props.currentColumn
        ? `
  grid-column: ${props.currentColumn} / span ${
            props.columns - props.currentColumn + 1
          };
  `
        : `opacity: 0.3;`
      : `
  grid-column: 1 / span ${props.columns};
  `}

  display: ${(props) => (props.showColumns ? 'grid' : 'block')};
  grid-template-columns: repeat(
    ${(props) => props.columns - props.currentColumn + 1},
    1fr
  );
  gap: 0 var(--padding);
`;

const ListWrapper = styled.div<ColumnsProps>`
  padding: var(--padding);
  position: relative;
  z-index: 2;
  margin-top: 1rem;

  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 0 var(--padding);
  padding: 0 calc(var(--padding) / 2);
`;

const ColumnTitle = withTheme(styled.h2`
  text-align: center;
`);

const ColumnTitlesWrapper = withTheme(styled.div<ColumnsProps>`
  display: ${(props) => (props.showColumns ? 'grid' : 'block')};
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 1rem var(--padding);
  padding: 0 calc(var(--padding) / 2);
  border-bottom: 2px solid ${(props) => props.theme.palette.grey[200]};
`);

const OuterScrollWrapper = styled.div`
  max-width: 100%;
  overflow: auto;
`;

const MainWrapper = withTheme(styled.div<{ showColumns: boolean }>`
  border: 2px solid ${(props) => props.theme.palette.grey[200]};
  border-radius: 1rem;

  position: relative;
  overflow: hidden;

  margin-top: 2rem;

  --padding: 2rem;

  ${(props) => props.showColumns && 'min-width: 60rem;'}
`);

const BackgroundWrapper = withTheme(styled.div`
  position: absolute;
  top: 0;
  width: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  & > span {
    width: 2px;
    background-color: ${(props) => props.theme.palette.grey[200]};
    pointer-events: none;
  }

  & :first-child,
  & :last-child {
    opacity: 0;
  }
`);

export default List;
