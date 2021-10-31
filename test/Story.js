const Story = artifacts.require("./contracts/Story.sol");
const assert = require('assert');

contract("Story", accounts => {
    before(async () => {
        this.story = await Story.deployed();
    })

    it('deploys successfully', async () => {
        const fullStory = await this.story.getFullStory();
        assert.notEqual(fullStory, 0x0)
        assert.notEqual(fullStory, '')
        assert.notEqual(fullStory, null)
        assert.notEqual(fullStory, undefined)
      })
    
    it("tests with story initialization 'Once upon a time '", async () => {
        const fullStory = await this.story.getFullStory();
        assert.equal(fullStory[0].content,"Once upon a time ");
        assert.equal(fullStory[0].id,1);
        await this.story.getStoryElement(1);
    });

    it("tests after adding the story 'there was a girl named red riding hood '", async () => {
        await this.story.createStoryElement("there was a girl named red riding hood ");
        const fullStory = await this.story.getFullStory(); 
        const storyElement1 = await this.story.getStoryElement(1)
        const storyElement2 = await this.story.getStoryElement(2)     
        
        // testing getFullStory()
        assert.equal(fullStory[0].content,"Once upon a time ");
        assert.equal(fullStory[1].content,"there was a girl named red riding hood ");
        assert.equal(fullStory.length, 2);
        for (let i = 0; i < fullStory.length; ++i) {
            assert.notEqual(fullStory[i].dateTime, null);
            assert.notEqual(fullStory[i].dateTime, undefined);
        }
        
        // testing getStoryElement()
        assert.equal(storyElement1.content,"Once upon a time ");
        assert.equal(storyElement2.content, "there was a girl named red riding hood ");
        assert.equal(storyElement1.id,1);
        assert.equal(storyElement2.id,2);
        
        // expected error testing
        const revertNotFound =
        {
            name: 'Error',
            message: 'Returned error: VM Exception while processing transaction: revert Not found'
        }
        toReject = [];
        for (const i of [0, 3, 4, 5, 6]) {
            toReject.push(assert.rejects(
                async () => this.story.getStoryElement(i),
                revertNotFound
            ));
        }
        for (const promise of toReject) {
            await promise
        }
    });
    
    it("tests after adding the story 'who enjoyed a raspberry rose tea from Fuku '", async () => {
        await this.story.createStoryElement("who enjoyed a raspberry rose tea from Fuku ");
        const fullStory = await this.story.getFullStory(); 
        const storyElement1 = await this.story.getStoryElement(1)
        const storyElement2 = await this.story.getStoryElement(2)  
        const storyElement3 = await this.story.getStoryElement(3)     
        
        // testing getFullStory()
        assert.equal(fullStory[0].content,"Once upon a time ");
        assert.equal(fullStory[1].content,"there was a girl named red riding hood ");
        assert.equal(fullStory[2].content,"who enjoyed a raspberry rose tea from Fuku ");
        assert.equal(fullStory.length, 3);
        for (let i = 0; i < fullStory.length; ++i) {
            assert.notEqual(fullStory[i].dateTime, null);
            assert.notEqual(fullStory[i].dateTime, undefined);
        }
        
        // testing getStoryElement()
        assert.equal(storyElement1.content,"Once upon a time ");
        assert.equal(storyElement2.content, "there was a girl named red riding hood ");
        assert.equal(storyElement3.content, "who enjoyed a raspberry rose tea from Fuku ");
        assert.equal(storyElement1.id,1);
        assert.equal(storyElement2.id,2);
        assert.equal(storyElement3.id,3);
        
        // expected error testing
        const revertNotFound =
        {
            name: 'Error',
            message: 'Returned error: VM Exception while processing transaction: revert Not found'
        }
        toReject = [];
        for (const i of [0, 4, 5, 6]) {
            toReject.push(assert.rejects(
                async () => this.story.getStoryElement(i),
                revertNotFound
            ));
        }
        for (const promise of toReject) {
            await promise
        }
    });
});