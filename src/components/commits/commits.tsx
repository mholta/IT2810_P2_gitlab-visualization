import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from '@material-ui/core';
import styled from 'styled-components';
import CommitCard from './commitCard';
import { User } from '../../api/useApi';
import { ViewStreamOutlined, ViewWeekOutlined } from '@material-ui/icons';
import IconButtonWithLabel from '../buttonWithLabel';
import { useWindowWidth } from '@react-hook/window-size';

interface CommitsProps {
  commits: CommitData[];
  users: User[];
}

const Commits = ({ commits, users }: CommitsProps) => {
  console.log('Commits rendered');

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

  const columns = users.length;

  const getColumnNum = (user: string) =>
    users.map((user) => user.id).indexOf(user) + 1;

  const getUser = (user: string) =>
    users.map((user) => user.id).indexOf(user) !== -1
      ? users[users.map((user) => user.id).indexOf(user)]
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
            users.map((user, index) => (
              <ColumnTitle key={'c-user-' + index}>{user.alias}</ColumnTitle>
            ))
          ) : (
            <ColumnTitle>Alle commits</ColumnTitle>
          )}
        </ColumnTitlesWrapper>
        <BackgroundWrapper>
          {showColumns &&
            Array.from(Array(columns + 1)).map((e, index) => (
              <span key={'span' + index} />
            ))}
        </BackgroundWrapper>

        <CommitListWrapper columns={columns} showColumns={showColumns}>
          {commits.map((commitData, index) => (
            <CommitCardWrapper
              columns={columns}
              showColumns={showColumns}
              currentColumn={getColumnNum(commitData.author_name)}
              key={'commit-wrapper-' + index}
            >
              <CommitCard
                commitData={commitData}
                key={'commit-' + index}
                openOnClick={!showColumns}
                user={getUser(commitData.author_name)}
              />
            </CommitCardWrapper>
          ))}
        </CommitListWrapper>
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

const CommitCardWrapper = styled.div<CommitCardWrapperProps>`
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

const CommitListWrapper = styled.div<ColumnsProps>`
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

export interface CommitData {
  id: string;
  short_id: string;
  created_at: string; //"2021-09-13T10:53:17.000+02:00",
  parent_ids: string[]; // ["925fd59727b8eab6c5f5b4115546d8636eb3f4c3"],
  title: string; //"add prettier config #2",
  message: string; //"add prettier config #2\n",
  author_name: string; //"Magnus Holta",
  author_email: string; //"magnus.holta@gmail.com",
  authored_date?: string; //"2021-09-13T08:42:23.000+02:00",
  committer_name: string; //"Magnus Holta",
  committer_email: string; //"magnus.holta@gmail.com",
  committed_date: string; //"2021-09-13T10:53:17.000+02:00",
  web_url: string; //"https://gitlab.stud.idi.ntnu.no/it2810-h21/team-21/gitlab-visualization/-/commit/43c3a9c7d07c42402a0c27a58f73865dadae23bd"
}

export default Commits;
