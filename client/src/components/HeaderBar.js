import React, { useState } from 'react';

// evergreen imports
import {
  Pane,
  Heading,
  Button,
  Dialog,
  AddIcon,
  IconButton,
  TrashIcon,
  TextareaField,
} from 'evergreen-ui';

const HeaderBar = (props) => {
  const { drizzle } = props;

  const [modal, setModal] = useState(false);
  const [content, setContent] = useState('');
  const [maxLimitHit, setMaxLimitHit] = useState(false);

  const publishStoryElement = async () => {
    let storyContract = drizzle.contracts.Story;
    let res = await storyContract.methods.createStoryElement(content).send();
    console.log(res);
    setContent('');
    setModal(false);
  };

  return (
    <Pane display='flex' justifyContent='space-between' paddingBottom='5%'>
      <Heading size={900}>Storyline</Heading>
      <Button
        appearance='primary'
        iconBefore={AddIcon}
        onClick={() => setModal(true)}
      >
        Add To Story
      </Button>
      <Dialog
        isShown={modal}
        hasClose={false}
        title='Add to Story'
        onCloseComplete={() => {
          setModal(false);
        }}
        confirmLabel='Publish'
        onConfirm={publishStoryElement}
      >
        <TextareaField
          label='Enter content below'
          required
          description='Your content will be added to the end of the story!'
          hint={`${content.length} characters (max. 280, hi twitter)`}
          value={content}
          isInvalid={maxLimitHit}
          onChange={(e) => {
            let newContent = e.target.value;
            if (newContent.length > 280) {
              setMaxLimitHit(true);
              return;
            }
            setContent(newContent);
            setMaxLimitHit(false);
          }}
        />
        <IconButton
          icon={TrashIcon}
          intent='danger'
          onClick={() => setContent('')}
        />
      </Dialog>
    </Pane>
  );
};

export default HeaderBar;
