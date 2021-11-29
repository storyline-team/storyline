import React from 'react';

// component imports
import AppWrapper from './components/AppWrapper.js';

// drizzle imports
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';

// contract imports
import Story from './contracts/Story.json';

// initialize drizzle
const drizzleOptions = {
  contracts: [Story],
};

const drizzle = new Drizzle(drizzleOptions);

function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            console.log('Not Initialized, attempting to connect...');
            return '';
          }
          return <AppWrapper drizzle={drizzle} drizzleState={drizzleState} />;
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
