import React from 'react';

import { Paragraph, Tooltip } from 'evergreen-ui';

const availableColor = 'purple600';
const availableBg = 'purpleTint';

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

  return (
    <Tooltip content={owner}>
      <Paragraph
        color={forSale ? availableColor : null}
        background={forSale ? availableBg : null}
      >
        {content}
      </Paragraph>
    </Tooltip>
  );
};

export default StoryElement;
