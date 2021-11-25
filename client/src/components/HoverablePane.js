import { React } from 'react';
import { Pane, Text } from 'evergreen-ui';

import '../stylesheets/About.css';

const HoverablePane = (props) => {
  return (
    <Pane           
      elevation={1}
      float='left'
      width={400}
      marginLeft={24}
      marginRight={24}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Text class='hoverablePane' size={700} >
        {props.contentText}
      </Text>
    </Pane>
  );
};

export default HoverablePane;


