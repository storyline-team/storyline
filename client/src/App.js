import React from 'react';

// component imports
import AppWrapper from './components/AppWrapper.js';

// drizzle imports
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';

// contract imports
import Story from './contracts/Story.json';
import NFT from './contracts/NFT.json';

// initialize drizzle
const drizzleOptions = {
  contracts: [Story, NFT],
};

const drizzle = new Drizzle(drizzleOptions);

function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return 'Loading...';
          }
          return <AppWrapper drizzle={drizzle} drizzleState={drizzleState} />;
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
