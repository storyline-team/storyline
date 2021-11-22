import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App.css';

// Contract imports
import NFT from '../contracts/NFT.json';

// evergreen imports
import { Pane } from 'evergreen-ui';
import HeaderBar from './HeaderBar';
import Home from './Home';
import About from './About';
import Team from './Team';
import Instructions from './Instructions';
import MyStories from './MyStories';

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
      for (let elemID in await storyElems) {
        let elem = storyElems[elemID];
        let addr = await elem.nft;
        let selling = true;
        let owner = '0x0';
        if (elem.nft !== '0x0000000000000000000000000000000000000000') {
          let nftContract = new drizzle.web3.eth.Contract(NFT.abi, addr);
          selling = await nftContract.methods.isForSale().call();
          owner = await nftContract.methods.getOwner().call();
        }
        let storyObj = {
          id: parseInt(elemID) + 1,
          content: elem.content,
          forSale: selling,
          owner: owner,
        };
        story.push(storyObj);
      }
      return story;
    };
    fetchStory()
      .then((res) => setStory(res))
      .then(() => setLoaded(true));
  }, [drizzle.contracts.Story, drizzle.web3.eth.Contract]);

  if (!loaded) {
    return <div></div>;
  }
  return (
    <Pane display='flexbox' flexDirection='row' padding='10%'>
      <HeaderBar drizzle={drizzle} drizzleState={drizzleState} />
      <Routes>
        <Route path='about' element={<About />} />
        <Route path='team' element={<Team />} />
        <Route path='instructions' element={<Instructions />} />
        <Route
          path='my-stories'
          element={
            <MyStories
              drizzle={drizzle}
              story={story}
              account={drizzleState.accounts[0]}
            />
          }
        />
        <Route path='/' element={<Home story={story} />} />
      </Routes>
    </Pane>
  );
};

export default AppWrapper;
