import React, { useState, useEffect } from 'react';
import '../App.css';

// evergreen imports
import { Pane, Heading, Paragraph } from 'evergreen-ui';
import HeaderBar from './HeaderBar';

const AppWrapper = (props) => {
  // unwrap props
  const { drizzle, drizzleState } = props;

  const [story, setStory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let fetchStory = async () => {
      const storyContract = drizzle.contracts.Story;
      let storyElems = await storyContract.methods.getFullStory().call();
      let story = [];
      storyElems.forEach((element) => {
        story.push(element.content);
      });
      setStory(story);
      setLoaded(true);
    };
    fetchStory();
  }, [drizzle.contracts.Story]);

  if (!loaded) {
    return (
      <Pane display='flexbox' flexDirection='column' padding='10%'>
        <Heading size={900} paddingBottom='5%'>
          Fetching Story...
        </Heading>
      </Pane>
    );
  }
  return (
    <Pane display='flexbox' flexDirection='row' padding='10%'>
      <HeaderBar drizzle={drizzle} />
      {story.map((text) => (
        <div key={text}>
          <Paragraph>{text}</Paragraph>
        </div>
      ))}
      {/* Example of splitting text based on full stop */}
      {/* {sampleText.split('. ').map((text) => (
        <div>
          <Paragraph>
            {text}
            {text === '' ? null : '.'}
          </Paragraph>
        </div>
      ))} */}
    </Pane>
  );
};

export default AppWrapper;
