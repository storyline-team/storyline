import React from 'react';
import { Heading, Pane, Text } from 'evergreen-ui';

const pageTitle = "Instructions for Using Storyline"

const Instructions = () => {
  return (<div>
    <Heading size={900}>{pageTitle}</Heading>
    <Pane 
      clearfix
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='row'
    >
    </Pane>
  </div>);
};

export default Instructions;
