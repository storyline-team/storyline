import { React, useState, useEffect } from 'react';
import { Avatar, Heading, Pane, Text } from 'evergreen-ui';
import jjImg from '../assets/jj.jpeg';
import nangImg from '../assets/nang.jpeg';
import shaneImg from '../assets/shane.jpeg';
import rickyImg from '../assets/ricky.jpeg';

const ECE = 'Electrical and Computer Engineering';
const IS = 'Information Systems';
const CMU = 'Carnegie Mellon University';

class TeamMemberInfo {
  constructor(name, major, imageResource) {
    this.name = name;
    this.major = major;
    this.imageResource = imageResource;
  }
}

const jj = new TeamMemberInfo('Jonathan Cheng', ECE, jjImg);
const nang = new TeamMemberInfo('Nathan Ang', ECE, nangImg);
const shane = new TeamMemberInfo('Shane Aung', IS, shaneImg);
const ricky = new TeamMemberInfo('Ricky Lee', IS, rickyImg);

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([jj, nang, shane, ricky]);

  useEffect(() => {
    setTeamMembers([jj, nang, shane, ricky]);
  }, []);
  return (
    <div>
      <Heading size={900}>The Storyline Team</Heading>
      <Text>
        Storyline wouldn't exist if it weren't for the efforts of the following
        individuals.
      </Text>
      <Pane clearfix>
        {teamMembers.map((teamMember) => (
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
              src={teamMember.imageResource}
              name={teamMember.name}
              size={100}
            />
            <Text paddingTop={20} size={700}>
              {teamMember.name}
            </Text>
            <Text size={300}>{CMU}</Text>
            <Text size={300}>{teamMember.major}</Text>
          </Pane>
        ))}
      </Pane>
    </div>
  );
};

export default Team;
