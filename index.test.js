const assert = require('assert');
const { gstin } = require('./index');

describe('gstin', () => {
  it('It should not accept string more than 15 chars', () => assert.equal(gstin('09AAACT2727Q1ZUU'), false));
  it('It should not accept string less than 15 chars', () => assert.equal(gstin('09AAACT2727Q1Z'), false));
  it('It should not accept syntax other than "00AAAAA0000A0Z(A/N)"', () => assert.equal(gstin('09AAACTA727Q1ZU'), false));
  it('It should not accept invalid checksum digit', () => assert.equal(gstin('09AAACT2727Q1ZP'), false));
  it('It should always accept valid gstin', () => assert.equal(gstin('09AAACT2727Q1ZU'), true));
});
