import React from 'react';
import StoryElement from './StoryElement';

const Home = (props) => {
  let counter = 0;
  return (
    <div>
      {props.story.map((storyObj) => {
        counter += 1;
        return <StoryElement key={counter} storyObj={storyObj} />;
      })}
    </div>
  );
};

export default Home;
