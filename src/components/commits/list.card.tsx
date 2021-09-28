import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { DataObject, User } from '../../api/types';

interface ListCardProps {
  commitData: DataObject;
  openOnClick: boolean;
  user: User | null;
}

interface ListCardState {
  isOpen: boolean;
}

/**
 * Displays information about a single data object.
 */
class ListCard extends React.Component<ListCardProps, ListCardState> {
  state = { isOpen: false };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <ListCardWrapper
        onClick={this.handleClick}
        openOnClick={this.props.openOnClick}
      >
        <div>{this.props.commitData.title}</div>
        <ExtraInfoWrapper
          variants={variants}
          initial={'closed'}
          animate={
            this.props.openOnClick && this.state.isOpen ? 'open' : 'closed'
          }
          transition={{ type: 'just' }}
        >
          <div>Date: {this.props.commitData.date.toLocaleDateString()}</div>
          {this.props.user && <div>User: {this.props.user.alias}</div>}
        </ExtraInfoWrapper>
      </ListCardWrapper>
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

const ListCardWrapper = styled(motion.div)<Partial<ListCardProps>>`
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 0.4rem;
  background-color: white;
  margin-bottom: calc(var(--padding) / 2);
  word-break: break-word;

  transition: transform 200ms ease, box-shadow 200ms ease;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.openOnClick
      ? `&:hover {
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.14);
      transform: scale(1.02);
      cursor: pointer;
    }`
      : `
    `}
`;

export default ListCard;
