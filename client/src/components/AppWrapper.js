import React, { useState, useEffect } from 'react';
import '../App.css';

// evergreen imports
import { Pane, Heading, Paragraph } from 'evergreen-ui';

const sampleText =
  'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.';

const AppWrapper = (props) => {
  // unwrap props
  const { drizzle, drizzleState } = props;

  const [story, setStory] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let fetchStory = async () => {
      const storyContract = drizzle.contracts.Story;
      let story = await storyContract.methods.getFullStory().call();
      console.log(story);
      setStory(story);
      setLoaded(true);
    };
    fetchStory();
  }, [drizzle.contracts.Story]);

  if (!loaded) {
    return (
      <Pane display='flexbox' flexDirection='column' padding='10%'>
        <Heading size='900' paddingBottom='5%'>
          Fetching Story...
        </Heading>
      </Pane>
    );
  }
  return (
    <Pane display='flexbox' flexDirection='column' padding='10%'>
      <Heading size='900' paddingBottom='5%'>
        Storyline
      </Heading>
      <div>
        <Paragraph>{story[0].content}</Paragraph>
      </div>
      {/* Example of splitting text based on full stop */}
      {sampleText.split('. ').map((text) => (
        <div>
          <Paragraph>
            {text}
            {text === '' ? null : '.'}
          </Paragraph>
        </div>
      ))}
    </Pane>
  );
};

export default AppWrapper;
