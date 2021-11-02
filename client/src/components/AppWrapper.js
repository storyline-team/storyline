import React, { useState, useEffect } from 'react';
import '../App.css';

const AppWrapper = (props) => {
  // unwrap props
  const { drizzle, drizzleState } = props;

  const [story, setStory] = useState([]);

  useEffect(() => {
    let fetchStory = async () => {
      const storyContract = drizzle.contracts.Story;
      let story = await storyContract.methods.getFullStory().call();
      console.log(story);
      setStory(story);
    };
    fetchStory();
  }, [drizzle.contracts.Story]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>{story ? story[0]['content'] : null}</h1>
      </header>
    </div>
  );
};

export default AppWrapper;
