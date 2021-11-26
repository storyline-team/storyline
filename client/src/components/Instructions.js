import React from 'react';
import {
  Heading,
  Pane,
  Link,
  Paragraph,
  OrderedList,
  ListItem,
} from 'evergreen-ui';
import Subsection from './Subsection';

const pageTitle = 'Instructions for Using Storyline';

const Instructions = () => {
  return (
    <div>
      <Heading size={900}>{pageTitle}</Heading>
      <br></br>
      <Pane
        clearfix
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
      ></Pane>
      <Heading size={600}>Setting up Metamask</Heading>
      <Paragraph>
        To use Storyline, you will install{' '}
        <Link href='https://metamask.io/'>Metamask</Link> if you don't already
        have it. Note that this is only only available on Chromium-based
        browsers (either Chrome or Brave).
      </Paragraph>
      <br />
      <Paragraph>
        Metamask allows your browser to interact with the ethereum network
        Storyline is deployed to. Once you have the browser extension installed,
        continue on.
      </Paragraph>
      <br />
      <Subsection
        headingText={'Linking your Ethereum Wallet to Metamask'}
        contentText={
          'If you already have an Ethereum wallet, you can link it to Metamask and start contributing!'
        }
      />
      <OrderedList>
        <ListItem>
          Click on the Metamask Icon (top right corner of your browser)
        </ListItem>
        <ListItem>
          Select the option labeled 'import using Secret Recovery Phrase'
        </ListItem>
        <ListItem>
          Paste your 12-word mnemonic (from your existing wallet) into the
          prompt and select a password.
        </ListItem>
      </OrderedList>
      <Paragraph>
        If you do not yet have an Ethereum wallet, not to worry! Metamask can
        provide one to you easily. Upon installing and opening Metamask for the
        first time, you should be guided through the short process of creating
        of a new wallet. If you get stuck,{' '}
        <Link href='https://nftnow.com/guides/how-to-set-up-metamask-wallet/'>
          this guide
        </Link>{' '}
        might help.
      </Paragraph>
      <br />
      <Heading size={600}>Contribute to the Storyline</Heading>
      <OrderedList>
        <ListItem>
          On the Storyline website, click on the blue "Write" button at the top
          right of the page. A pop-up will appear with a text box in which you
          can enter your desired addition to the story.
        </ListItem>
        <ListItem>
          Once you are finished typing, click on the "Publish" button. The
          Metamask Chrome extension will pop up and ask for you to confirm an
          ETH payment to Storyline in order to process and publish your content.
          This fee is proportional to the size of your story component.
        </ListItem>
        <ListItem>
          Confirm the payment within Metamask and your story component will be
          published, and you can head back to the main Storyline page to see
          your content added!'
        </ListItem>
      </OrderedList>
      <br />
    </div>
  );
};

export default Instructions;
