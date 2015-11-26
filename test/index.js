import chai from 'chai';
chai.should();

describe('roc', () => {
    describe('prompt', () => {
        const prompts = require('../src').prompt;

        it('must expose array of prompts', () => {
            prompts.should.be.an('array');
        });

        it('must provide a type, name, message and default on every prompt', () => {
            for (const prompt of prompts) {
                prompt.type.should.be.a('string');
                prompt.name.should.be.a('string');
                prompt.message.should.be.a('string');
                prompt.default.should.be.a('string');
            }
        });
    });
});
