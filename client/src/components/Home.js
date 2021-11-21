import React from 'react';
import StoryElement from './StoryElement';

const Home = ({ story }) => {
  return (
    <div>
      {story.map((storyObj) => (
        <StoryElement storyObj={storyObj} />
      ))}
    </div>
  );
};

export default Home;
