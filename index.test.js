const assert = require('assert');
const { gstin, pan, tan, aadhar, imei, card, ifsc, esic, uan, mobile, pinCode, hsn, sac } = require('./index');

describe('gstin', () => {
  it('It should not accept string more than 15 chars', () => assert.equal(gstin('09AAACT2727Q1ZUU'), false));
  it('It should not accept string less than 15 chars', () => assert.equal(gstin('09AAACT2727Q1Z'), false));
  it('It should not accept syntax other than "00AAAAA0000A0Z(A/N)"', () => assert.equal(gstin('09AAACTA727Q1ZU'), false));
  it('It should not accept invalid checksum digit', () => assert.equal(gstin('09AAACT2727Q1ZP'), false));
  it('It should always accept valid gstin', () => assert.equal(gstin('09AAACT2727Q1ZU'), true));
  it('It should not be case sensitive', () => assert.equal(gstin('09aaact2727q1zu'), true));
});

describe('gstin.getValidDigit', () => {
  it('It should provide valid checksum digit of first 14 chars', () => assert.equal(gstin.getValidDigit('09AAACT2727Q1Z'), 'U'));
});

describe('pan', () => {
  it('It should not accept string more than 10 chars', () => assert.equal(pan('AAACT2727QU'), false));
  it('It should not accept string less than 10 chars', () => assert.equal(pan('AAACT2727'), false));
  it('It should not accept syntax other than "AAAAA0000A"', () => assert.equal(pan('0AAACTA727'), false));
  it('It should always accept valid pan', () => assert.equal(pan('AAACT2727Q'), true));
  it('It should not be case sensitive', () => assert.equal(pan('aaact2727q'), true));
});

describe('pan.holder', () => {
  it('It should not accept string more than 10 chars', () => assert.throws(() => pan.holder('AAACT2727QU'), Error, 'Invalid PAN Format'));
  it('It should not accept string less than 10 chars', () => assert.throws(() => pan.holder('AAACT2727'), Error, 'Invalid PAN Format'));
  it('It should not accept syntax other than "AAAAA0000A"', () => assert.throws(() => pan.holder('0AAACTA727'), Error, 'Invalid PAN Format'));
  it('It should always accept valid pan', () => assert.equal(pan.holder('AAACT2727Q'), 'Company'));
  it('It should not be case sensitive', () => assert.equal(pan.holder('aaact2727q'), 'Company'));
});

describe('tan', () => {
  it('It should not accept string more than 10 chars', () => assert.equal(tan('MUMT07207EX'), false));
  it('It should not accept string less than 10 chars', () => assert.equal(tan('MUMT0720E'), false));
  it('It should not accept syntax other than "AAAA00000A"', () => assert.equal(tan('5MUMT07207'), false));
  it('It should not accept invalid checksum', () => assert.equal(tan('MUMT07207B'), false));
  it('It should always accept valid tan', () => assert.equal(tan('MUMT07207E'), true));
  it('It should not be case sensitive', () => assert.equal(tan('mumt07207e'), true));
});

describe('aadhar', () => {
  it('It should not accept string more than 12 numerals', () => assert.equal(aadhar('3038927050145'), false));
  it('It should not accept string less than 12 chars', () => assert.equal(aadhar('30389270501'), false));
  it('It should not accept syntax other than "############"', () => assert.equal(aadhar('303892AB5014'), false));
  it('It should not accept invalid checksum', () => assert.equal(aadhar('303892705015'), false));
  it('It should not accept invalid number starting from 0 & 1', () => assert.equal(aadhar('103892705015'), false));
  it('It should always accept valid Aadhar', () => assert.equal(aadhar('303892705014'), true));
});

describe('aadhar.getValidDigit', () => {
  it('It should return valid checksum digit', () => assert.equal(aadhar.getValidDigit('30389270501'), '4'));
});

describe('imei', () => {
  it('It should not accept string more than 15 numerals', () => assert.equal(imei('3579170523119294'), false));
  it('It should not accept string less than 15 chars', () => assert.equal(imei('3579170523119'), false));
  it('It should not accept syntax other than "###############"', () => assert.equal(imei('3579170GF311929'), false));
  it('It should not accept invalid checksum', () => assert.equal(imei('357917052311925'), false));
  it('It should always accept valid IMEI', () => assert.equal(imei('357917052311929'), true));
});

describe('card', () => {
  it('It should not accept string more than 16 numerals', () => assert.equal(card('3579170523119294'), false));
  it('It should not accept string less than 14 numerals', () => assert.equal(card('51037200170963465'), false));
  it('It should not accept syntax other than "##############(##)"', () => assert.equal(card('510372001ED96346'), false));
  it('It should not accept invalid checksum', () => assert.equal(card('5103720017096345'), false));
  it('It should always accept valid Card Number', () => assert.equal(card('5103720017096346'), true));
});

describe('ifsc', () => {
  it('It should not accept string more than 11 chars', () => assert.equal(ifsc('SBIN00012345'), false));
  it('It should not accept string less than 11 chars', () => assert.equal(ifsc('SBIN000123'), false));
  it('It should not accept syntax other than "AAAA0######"', () => assert.equal(ifsc('SB0N0001234'), false));
  it('It should always accept valid IFSC', () => assert.equal(ifsc('SBIN0001234'), true));
});

describe('esic', () => {
  it('It should not accept string more than 17 chars', () => assert.equal(esic('310012345600000019'), false));
  it('It should not accept string less than 17 chars', () => assert.equal(esic('3100123456000001'), false));
  it('It should not accept syntax other than "#################"', () => assert.equal(esic('31001234AD0000001'), false));
  it('It should always accept valid esic number', () => assert.equal(esic('31001234560000001'), true));
});

describe('uan', () => {
  it('It should not accept string more than 12 chars', () => assert.equal(uan('1112223334445'), false));
  it('It should not accept string less than 12 chars', () => assert.equal(uan('11122233344'), false));
  it('It should not accept syntax other than "############"', () => assert.equal(uan('11122233344A'), false));
  it('It should always accept valid uan number', () => assert.equal(uan('111222333444'), true));
});

describe('mobile', () => {
  it('It should not accept string more than 10 chars', () => assert.equal(mobile('94562456789'), false));
  it('It should not accept string less than 10 chars', () => assert.equal(mobile('945624567'), false));
  it('It should not accept syntax other than "##########"', () => assert.equal(mobile('945624567A9'), false));
  it('It should always accept valid mobile number', () => assert.equal(mobile('9456245678'), true));
});

describe('pincode', () => {
  it('It should not accept string more than 6 chars', () => assert.equal(pinCode('4452066'), false));
  it('It should not accept string less than 6 chars', () => assert.equal(pinCode('44520'), false));
  it('It should not accept syntax other than "######"', () => assert.equal(pinCode('445a6'), false));
  it('It should always accept valid pincode number', () => assert.equal(pinCode('445206'), true));
});

describe('hsn', () => {
  it('It should not accept string more than 8 chars and even', () => assert.equal(hsn('445206678'), false));
  it('It should not accept string of 1 chars', () => assert.equal(hsn('4'), false));
  it('It should not accept string of 3 chars', () => assert.equal(hsn('444'), false));
  it('It should not accept string of 5 chars', () => assert.equal(hsn('44455'), false));
  it('It should not accept string of 7 chars', () => assert.equal(hsn('4445533'), false));
  it('It should not accept syntax other than "##(##)(##)(##)"', () => assert.equal(hsn('445a6'), false));
  it('It should always accept valid 2 digit hsn code', () => assert.equal(hsn('44'), true));
  it('It should always accept valid 4 digit hsn code', () => assert.equal(hsn('4455'), true));
  it('It should always accept valid 6 digit hsn code', () => assert.equal(hsn('445566'), true));
  it('It should always accept valid 8 digit hsn code', () => assert.equal(hsn('44556634'), true));
});

describe('sac', () => {
  it('It should not accept string more than 8 chars', () => assert.equal(sac('445206678'), false));
  it('It should not accept string less than 8 chars', () => assert.equal(sac('44520'), false));
  it('It should not accept syntax other than "########"', () => assert.equal(sac('56445a66'), false));
  it('It should always accept valid sac code', () => assert.equal(sac('44529906'), true));
});