import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from '@material-ui/core';
import styled from 'styled-components';
import ListCard from './list.card';
import { DataObject, User } from '../../api/types';
import { ViewStreamOutlined, ViewWeekOutlined } from '@material-ui/icons';
import IconButtonWithLabel from '../buttonWithLabel';
import { useWindowWidth } from '@react-hook/window-size';

interface ListProps {
  commits: DataObject[];
  users: User[];
}

/**
 * Displays a list of data objects.
 */
const List = ({ commits, users }: ListProps) => {
  const [showColumnToggle, setShowToggleButton] = useState<boolean>(false);
  const [showColumns, setShowColumns] = useState<boolean>(true);

  const width: number = useWindowWidth();

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

  // make table-bars stay at right place
  const scrollingElement = document.getElementById('scroll');
  const backgroundElement = document.getElementById('background');
  if (scrollingElement && backgroundElement) {
    scrollingElement.addEventListener('scroll', () => {
      backgroundElement.style.left = -scrollingElement.scrollLeft + 'px';
    });
  }

  return (
    <MainWrapper showColumns={showColumns} columns={columns}>
      <InnerScrollWrapper id="scroll">
        <TopBarWrapper columns={columns} showColumns={showColumns}>
          <ToggleButtonWrapper showColumns={showColumns}>
            {showColumnToggle && (
              <IconButtonWithLabel
                onClick={() => setShowColumns(!showColumns)}
                icon={
                  showColumns ? <ViewStreamOutlined /> : <ViewWeekOutlined />
                }
                label={showColumns ? 'List' : 'Columns'}
              />
            )}
          </ToggleButtonWrapper>
          <ColumnTitlesWrapper columns={columns} showColumns={showColumns}>
            {showColumns ? (
              users
                .filter((c) => c.show)
                .map((user, index) => (
                  <ColumnTitle key={'c-user-' + index}>
                    {user.alias}
                  </ColumnTitle>
                ))
            ) : (
              <ColumnTitle>Alle commits</ColumnTitle>
            )}
          </ColumnTitlesWrapper>
        </TopBarWrapper>

        <BackgroundWrapper
          id="background"
          showColumns={showColumns}
          columns={columns}
        >
          {showColumns &&
            Array.from(Array(columns + 1)).map((e, index) => (
              <span key={'span' + index} />
            ))}
        </BackgroundWrapper>

        <ListWrapper columns={columns} showColumns={showColumns}>
          {commits
            .filter((c) => c.user.show)
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
                  user={commitData.user}
                />
              </CardWrapper>
            ))}
        </ListWrapper>
      </InnerScrollWrapper>
    </MainWrapper>
  );
};

interface ColumnsProps {
  columns: number;
  showColumns: boolean;
}

interface CommitCardWrapperProps extends ColumnsProps {
  currentColumn: number;
}

const ToggleButtonWrapper = styled.div<{ showColumns: boolean }>`
  position: absolute;
  top: ${(props) => (props.showColumns ? '1rem' : '0')};
  left: 1rem;

  // position: sticky;
  z-index: 10;
`;

const CardWrapper = withTheme(styled.div<CommitCardWrapperProps>`
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
  // min-width: 50rem;
`);

const ListWrapper = styled.div<ColumnsProps>`
  // margin: 0 calc(-var(--padding) / 2);
  position: relative;
  z-index: 2;
  margin-top: 1rem;
  // overflow: hidden;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 0 var(--padding);

  padding: 0 calc(var(--padding) / 2);
  --minimum: calc(100% - var(--padding));

  width: max(var(--minimum), var(--maximum));
  ${(props) => !props.showColumns && 'width: unset;'}//width for list
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

const TopBarWrapper = styled.div<ColumnsProps>`
  position: sticky;
  z-index: 10;
  background-color: white;
  top: 0;
  min-width: 100%;
  width: calc(var(--maximum) + var(--padding));
  ${(props) => !props.showColumns && 'width: unset;'}
`;

const InnerScrollWrapper = styled.div`
  overflow: auto;

  // max-width: 90vw;
  max-height: 90vh;
`;

const MainWrapper = withTheme(styled.div<ColumnsProps>`
  border: 2px solid ${(props) => props.theme.palette.grey[200]};
  max-width: min(100%, var(--maximum));
  --lg: ${(props) => props.theme.breakpoints.values['lg']}px;
  ${(props) => !props.showColumns && 'max-width: var(--lg)'};
  border-radius: 1rem;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  margin: auto;
  z-index: 15;
  --maximum: calc(${(props) => props.columns}*20rem);
  --padding: 2rem;
`);

const BackgroundWrapper = withTheme(styled.div<ColumnsProps>`
  position: absolute;
  top: 0;
  width: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 15;
  min-width: 100%;
  width: calc(
    (${(props) => props.columns}*20rem) + var(--padding)
  ); // width of x times 20rem + the padding
  ${(props) => !props.showColumns && 'width: unset;'}

  & > span {
    width: 2px;
    background-color: ${(props) => props.theme.palette.grey[200]};
    pointer-events: none;
    height: 100%;
  }

  & :first-child,
  & :last-child {
    opacity: 0;
  }
`);

export default List;
