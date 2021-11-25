import React from 'react';
import { Heading, Pane, Text } from 'evergreen-ui';
import Subsection from './Subsection'

const pageTitle = "Instructions for Using Storyline"

const Instructions = () => {
  return (<div>
    <Heading size={900}>{pageTitle}</Heading>
    <br></br>
    
    <Pane 
      clearfix
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='row'
    >
    </Pane>
    
    <Subsection
      headingText={"Setting up Metamask"}
      contentText={"To interact with Storyline by contributing to the story, you will need to set up an ethereum wallet with the Metamask Chrome extension. Ensure that you are using a Chromium-based browser (we recommend either Google Chrome or Brave), as browsers not based off of Chromium cannot utilize Chrome extensions. Then download the Chrome extension for Metamask."}
    />
    <br></br>
    <a href="https://metamask.io/" target='_blank'>
        Follow this link to install the Metamask extension.
    </a>
    <br></br>
    <br></br>
    <Subsection
      headingText={"Linking your Ethereum Wallet to Metamask"}
      contentText={'Assuming that you already have an Ethereum wallet, you can link it to Metamask so that you can spend ETH to contribute to Storyline\'s ongoing story. Click on the Metamask icon at the top right corner of your browser. You will be given the option to import an existing Ethereum wallet; once you click this option you will be prompted to enter the 12-word mnemonic that identifies your account. Paste this in and confirm that you are importing your wallet from the correct Ethereum network, then click "Submit". Metamask should now have access to your Ethereum wallet.'}
    />
    <br></br>
    <Subsection
      headingText={"Contribute to the Story"}
      contentText={'On the Storyline website, click on the blue "Add to Story" button at the top right of the window. A pop-up will appear with a text box in which you can enter your desired addition to the story. Once you are finished typing, click on the "Publish" button. The Metamask Chrome extension will pop up and ask for you to confirm an ETH payment to Storyline in order to process and publish your content. This fee is proportional to the size of your story component. Confirm the payment within Metamask and your story component will be published, and you can head back to the main Storyline page to see your content added!'}
    />
    <br></br>

    
  </div>);
};

export default Instructions;
