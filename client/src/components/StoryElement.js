import React, { useState, useEffect } from 'react';

import {
  Paragraph,
  Position,
  Tooltip,
  toaster,
  Dialog,
  Code,
} from 'evergreen-ui';

const availableColor = 'green600';

/*
props: {
  storyObj: {
    content string,
    forSale bool,
    owner int
  }
}
 */

const StoryElement = ({ drizzle, storyObj }) => {
  let { id, content, forSale, price, owner } = storyObj;

  const [textColor, setTextColor] = useState('none');
  const [name, setName] = useState('untradable');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setTextColor(forSale && id > 1 ? availableColor : 'muted');
    if (owner !== '0x0') setName(owner.substring(0, 8) + '...');
  }, [id, content, forSale, owner]);

  const handleClick = () => {
    if (forSale && name !== 'untradable') setModal(true);
    else handleCopy();
  };

  const handleBuy = async () => {
    let selectedIdx = parseInt(id);
    console.log('Buying: ', selectedIdx);
    const storyContract = drizzle.contracts.Story;
    storyContract.methods.buyStoryElement(selectedIdx).send({ value: price });
    setModal(false);
  };

  const handleCopy = () => {
    if (name === 'untradable') {
      toaster.warning('Sorry, the first story element is not owned by anyone.');
      return;
    }
    navigator.clipboard.writeText(owner);
    let msg = forSale ? 'Copied seller address: ' : 'Copied owner address: ';
    toaster.success(msg + owner);
  };

  return (
    <div>
      <Tooltip content={name} position={Position.LEFT}>
        <Paragraph color={textColor} onClick={handleClick}>
          {content}
        </Paragraph>
      </Tooltip>
      <Dialog
        isShown={modal}
        hasClose={false}
        title='Buy Story Element'
        onCloseComplete={() => {
          setModal(false);
        }}
        confirmLabel='Buy'
        onConfirm={handleBuy}
      >
        <Paragraph>
          Story Element ID: <Code>{id}</Code>
        </Paragraph>
        <Paragraph>
          Price: <Code>{price / 1000000000000000000} ETH</Code>
        </Paragraph>
        <Paragraph>
          Owner: <Code>{owner}</Code>
        </Paragraph>
        <Paragraph>"{content}"</Paragraph>
      </Dialog>
    </div>
  );
};

export default StoryElement;
