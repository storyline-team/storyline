import React, { useState, useEffect } from 'react';

import { Paragraph, Position, Tooltip, toaster } from 'evergreen-ui';

const availableColor = 'green800';

/*
props: {
  storyObj: {
    content string,
    forSale bool,
    owner int
  }
}
 */

const StoryElement = (props) => {
  let { content, forSale, owner } = props.storyObj;

  const [textColor, setTextColor] = useState('none');
  const [name, setName] = useState('untradable');

  useEffect(() => {
    setTextColor(forSale ? availableColor : 'muted');
    if (owner !== '0x0') setName(owner.substring(0, 8) + '...');
  }, [content, forSale, owner]);

  const handleClick = () => {
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
    </div>
  );
};

export default StoryElement;
