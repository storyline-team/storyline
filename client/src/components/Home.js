import React from 'react';
import StoryElement from './StoryElement';

const Home = ({ drizzle, story }) => {
  let counter = 0;
  return (
    <div>
      {story.map((storyObj) => {
        counter += 1;
        return (
          <StoryElement key={counter} drizzle={drizzle} storyObj={storyObj} />
        );
      })}
    </div>
  );
};

export default Home;
