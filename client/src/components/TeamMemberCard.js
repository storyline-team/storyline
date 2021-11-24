import { React, useState } from 'react';
import { Avatar, Pane, Text } from 'evergreen-ui';

const TeamMemberCard = (props) => {
  return (
    <Pane
      elevation={3}
      float='left'
      backgroundColor='white'
      width={300}
      height={200}
      margin={24}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Avatar
          src={props.teamMember.imageResource}
          name={props.teamMember.name}
          size={100}
      />
      <Text paddingTop={20} size={700}>
          {props.teamMember.name}
      </Text>
      <Text size={300}>{props.teamMember.college}</Text>
      <Text size={300}>{props.teamMember.major}</Text>
    </Pane>
  );
};

export default TeamMemberCard;
