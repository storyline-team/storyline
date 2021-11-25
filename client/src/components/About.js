
import { React, useState } from 'react';
import { Heading, Pane, Text } from 'evergreen-ui';
import '../stylesheets/About.css';
import HoverablePane from './HoverablePane';
import Subsection from './Subsection';

const About = () => {

  const firstHoverPaneText = "Storyline is not hosted by a governing service, which has full control over all content. Since Storyline is blockchain-powered, no governing service can add, delete, or modify existing content. Your work will not be censored or altered.";
  const secondHoverPaneText = "The distributed nature of blockchain networks ensure that it is extremely unlikely the Storyline gets destroyed. Decentralization of the data drastically decreases the risk of data loss. Your work will never be lost.";
  
  return (
    <div>
      <Heading size={900}>About Storyline</Heading>
      <Text size={500} color='#703EFA'>
          Storyline was created with a vision of revolutionizing online writing.
      </Text>
      <br></br><br></br>

      <Subsection
        headingText={"Own, sell and trade your writing"}
        contentText={"Storyline makes it possible to collectively write a story for the world to read. From reading the full Storyline from start to finish, to publishing content onto the Storyline, the possibilities are endless. As a writer you will truly own your writing and contributions, no strings attached. Storyline is a tool that empowers writers to create content that is permanent, public, and provably owned."}
      />
      <br></br>

      <Subsection
        headingText={"How it works"}
        contentText={"Storyline is a blockchain-powered writing platform running on Ethereum. As an Ethereum blockchain solution, users are able to mint their contributions as nonfungible tokens, or NFTs. These tokens are unique for every contributed Story, so no two users own identical tokens. It's a click away - get started by visiting the main Storyline page, and adding a Story today!"}
      />
      <br></br>
    
      <a href="https://github.com/shane-aung/storyline" target='_blank'>
        Check out the source code for Storyline here.
      </a>
      <br></br><br></br>

      <Subsection
        headingText={"Innovation in security and control"}
        contentText={"How is Storyline different from Google Docs or any social media thread? There are two main advantages."}
      />
      <br></br>

      <Pane
        clearfix
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
      >
        <HoverablePane contentText={firstHoverPaneText} />
        <HoverablePane contentText={secondHoverPaneText} />
      </Pane>
      <br></br><br></br><br></br>
    </div>
  );
};

export default About;