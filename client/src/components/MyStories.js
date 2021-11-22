import React, { useState, useEffect } from 'react';

import {
  Pane,
  Paragraph,
  Button,
  Badge,
  AddToArtifactIcon,
  SelectField,
  Dialog,
  TextInputField,
  toaster,
} from 'evergreen-ui';

const MyStories = ({ drizzle, story, account }) => {
  const [myElements, setMyElements] = useState([]);
  const [selectedElem, setSelectedElem] = useState(-1);
  const [price, setPrice] = useState();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let elements = [];
    for (let elem of story) {
      if (elem.owner === account) {
        elements.push(elem);
      }
    }
    setMyElements(elements);
  }, [story, account]);

  const createListing = async () => {
    let parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      toaster.warning('Please enter a numeric value for your Price.');
      return;
    }
    let selectedIdx = parseInt(selectedElem);
    if (selectedIdx <= 0) {
      toaster.warning('No story element selected. Please try again.');
      return;
    }
    const storyContract = drizzle.contracts.Story;
    console.log('Listed: ', selectedIdx, parsedPrice, account);
    storyContract.methods
      .listStoryElement(selectedIdx, parsedPrice)
      .send({ from: account });
    setIsShown(false);
    toaster.success(
      'Listing requested! Check back in a minute or two for any updates.'
    );
  };

  return (
    <div>
      <Dialog
        title='Confirm Listing?'
        isShown={isShown}
        intent='success'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Create Listing'
        hasClose={false}
        onConfirm={createListing}
      >
        Listed story elements cannot be unlisted. Once a trade listing is
        created, the element can be acquired by any buyer.
      </Dialog>
      <Pane display='flex' alignItems='center' marginBottom='5%'>
        <SelectField
          label='Select Element'
          required
          onChange={(event) => {
            console.log('selected ', event.target.value);
            setSelectedElem(event.target.value);
          }}
        >
          <option value={-1}>-- Choose one --</option>
          {myElements.map((elem) => {
            if (elem.forSale) {
              return null;
            }
            let label = elem.id + ': ' + elem.content;
            return (
              <option key={elem.id} value={elem.id}>
                {label}
              </option>
            );
          })}
        </SelectField>
        <TextInputField
          label='Price (wei)'
          required
          placeholder='eg. 12345'
          marginLeft='3%'
          marginRight='3%'
          onChange={(event) => setPrice(event.target.value)}
        />
        <Button
          intent='success'
          iconBefore={AddToArtifactIcon}
          onClick={() => setIsShown(true)}
        >
          Create Listing
        </Button>
      </Pane>
      {myElements.map((elem) => {
        let status = elem.forSale ? 'List' : 'Hold';
        let badgeColor = elem.forSale ? 'green' : 'blue';
        return (
          <Pane display='flex' alignItems='center' key={elem.id}>
            <Badge color={badgeColor} marginRight={10}>
              {status}, ID={elem.id}
            </Badge>
            <Paragraph key={elem.id}>{elem.content}</Paragraph>
          </Pane>
        );
      })}
    </div>
  );
};

export default MyStories;
