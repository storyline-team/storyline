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
  HelpIcon,
} from 'evergreen-ui';
import { useNavigate } from 'react-router';

const HeaderBar = (props) => {
  const { drizzle, drizzleState } = props;
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [helpShown, setHelpShown] = useState(false);
  const [content, setContent] = useState('');
  const [maxLimitHit, setMaxLimitHit] = useState(false);

  const publishStoryElement = async () => {
    let storyContract = drizzle.contracts.Story;
    let res = await storyContract.methods
      .createStoryElement(content)
      .send({ from: drizzleState.accounts[0] });
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
        <Link color='neutral' marginRight='10%' href='/my-stories'>
          MyStories
        </Link>
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
      <Pane display='flex' alignItems='center'>
        <IconButton
          icon={HelpIcon}
          size='small'
          marginRight='5%'
          onClick={() => setHelpShown(true)}
        />
        <Button
          appearance='primary'
          iconBefore={AddIcon}
          onClick={() => setModal(true)}
        >
          Write
        </Button>
        <Dialog
          title='Help'
          isShown={helpShown}
          intent='success'
          onCloseComplete={() => setHelpShown(false)}
          hasFooter={false}
        >
          For additional help or questions, please directly contact any
          Storyline team member, or email storylinehelp@gmail.com
        </Dialog>
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
            description='Your story element will be added to the end of the story!'
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
    </Pane>
  );
};

export default HeaderBar;
