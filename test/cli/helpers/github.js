import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

describe('helpers', () => {
    describe('github', () => {
        const github = require('../../../src/cli/helpers/github');

        describe('getVersions', () => {
            it('must return promise', () => {
                const get = sinon.stub(require('request'), 'get');
                const result = github.getVersions();
                result.should.be.a('Promise');
                get.restore();
            });
        });

        describe('get', () => {
            it('must return promise', () => {
                const mkdir = sinon.stub(require('temp'), 'mkdir');
                const result = github.get();
                result.should.be.a('Promise');
                mkdir.restore();
            });

            it('must make temporary directory "roc"', () => {
                const mkdir = sinon.spy(require('temp'), 'mkdir');
                github.get();
                mkdir.should.have.been.calledWith('roc');
                mkdir.restore();
            });
        });
    });
});
