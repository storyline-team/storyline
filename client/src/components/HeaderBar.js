import React, { useState } from 'react';
import '../App.css';

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
  Link,
} from 'evergreen-ui';
import { useNavigate } from 'react-router';

const HeaderBar = (props) => {
  const { drizzle } = props;
  const navigate = useNavigate();

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

  const goHome = () => {
    navigate('/');
  };

  return (
    <Pane display='flex' justifyContent='space-between' paddingBottom='5%'>
      <Pane display='flex' alignItems='center'>
        <Heading size={500} marginRight='10%' onClick={goHome} cursor='pointer'>
          Storyline
        </Heading>
        <Link color='neutral' marginRight='10%' href='/about'>
          About
        </Link>
        <Link color='neutral' marginRight='10%' href='/team'>
          Team
        </Link>
        <Link color='neutral' marginRight='10%' href='/instructions'>
          Instructions
        </Link>
      </Pane>
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
          label='Enter content below.'
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
