import { React, useState } from 'react';
import { Heading, Pane, Text } from 'evergreen-ui';

// internal helper packages
import TeamMember from '../models/TeamMember'
import TeamMemberCard from './TeamMemberCard';

// Avatar Image Sources
import jjImg from '../assets/jj.jpeg';
import nangImg from '../assets/nang.jpeg';
import shaneImg from '../assets/shane.jpeg';
import rickyImg from '../assets/ricky.jpeg';

// string constants
const ECE = 'Electrical and Computer Engineering';
const IS = 'Information Systems';
const CMU = 'Carnegie Mellon University';
const pageTitle = "The Storyline Team"
const pageDescription = "Storyline wouldn't exist if it weren't for the efforts of the following individuals."

const Team = () => {
  const [jj, setJJ] = useState(new TeamMember('Jonathan Cheng', ECE, jjImg, CMU));
  const [nang, setNang] = useState(new TeamMember('Nathan Ang', ECE, nangImg, CMU));
  const [shane, setShane] = useState(new TeamMember('Shane Aung', IS, shaneImg, CMU));
  const [ricky, setRicky] = useState(new TeamMember('Ricky Lee', IS, rickyImg, CMU));
  return (
    <div>
      <Heading size={900}>{pageTitle}</Heading>
      <Text>{pageDescription}</Text>
      <Pane 
        clearfix
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
      >
        <TeamMemberCard teamMember={jj} />
        <TeamMemberCard teamMember={nang} />
      </Pane>
      <Pane 
        clearfix
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
      >
        <TeamMemberCard teamMember={shane} />
        <TeamMemberCard teamMember={ricky} />
      </Pane>
    </div>
  );
};

export default Team;
