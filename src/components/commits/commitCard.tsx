import React from 'react';
import styled from 'styled-components';
import { CommitData } from './commits';
import { motion, Variants } from 'framer-motion';
import { User } from '../../api/useApi';

interface CommitCardProps {
  commitData: CommitData;
  openOnClick: boolean;
  user: User | null;
}

interface CommitCardState {
  isOpen: boolean;
}

class CommitCard extends React.Component<CommitCardProps, CommitCardState> {
  state = { isOpen: false };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <CommitCardWrapper
        onClick={this.handleClick}
        openOnClick={this.props.openOnClick}
      >
        <div>{this.props.commitData.message}</div>
        <ExtraInfoWrapper
          variants={variants}
          initial={'closed'}
          animate={
            this.props.openOnClick && this.state.isOpen ? 'open' : 'closed'
          }
          transition={{ type: 'just' }}
        >
          <div>Date: {this.props.commitData.committed_date}</div>
          {this.props.user && <div>User: {this.props.user.alias}</div>}
        </ExtraInfoWrapper>
      </CommitCardWrapper>
    );
  }
}

const variants: Variants = {
  closed: { height: 0, opacity: 0, scaleY: 0 },
  open: { height: 'auto', opacity: 1, scaleY: 1 }
};

const ExtraInfoWrapper = styled(motion.div)`
  overflow: hidden;
`;

const CommitCardWrapper = styled(motion.div)<Partial<CommitCardProps>>`
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 0.4rem;
  background-color: white;
  cursor: pointer;
  margin-bottom: calc(var(--padding) / 2);

  transition: transform 200ms ease, box-shadow 200ms ease;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.openOnClick
      ? `&:hover {
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.14);
        transform: scale(1.02);
        }`
      : ''}
`;

export default CommitCard;
