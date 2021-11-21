import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App.css';

// evergreen imports
import { Pane, Heading } from 'evergreen-ui';
import HeaderBar from './HeaderBar';
import Home from './Home';
import About from './About';
import Team from './Team';
import Instructions from './Instructions';

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
      storyElems.forEach(async (element) => {
        // let selling = await element.NFT.selling();
        let owner = await element.nft._owner();
        let storyObj = {
          content: element.content,
          forSale: true,
          owner: owner,
        };
        story.push(storyObj);
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
      <Routes>
        <Route path='about' element={<About />} />
        <Route path='team' element={<Team />} />
        <Route path='instructions' element={<Instructions />} />
        <Route path='/' element={<Home story={story} />} />
      </Routes>
    </Pane>
  );
};

export default AppWrapper;
