import React from 'react';
import { Paragraph } from 'evergreen-ui';

const Home = ({ story }) => {
  return (
    <div>
      {story.map((text) => (
        <div key={text}>
          <Paragraph>{text}</Paragraph>
        </div>
      ))}
    </div>
  );
};

export default Home;
