import { React } from 'react';
import { Heading, Pane, Text } from 'evergreen-ui';

import '../stylesheets/About.css';

const Subsection = (props) => {
  return (
    <Pane>
      <Heading size={600}>{props.headingText}</Heading>
      <Text>{props.contentText}</Text>
    </Pane>
  );
};

export default Subsection;