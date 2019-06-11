(function (global, factory) {
  // eslint-disable-next-line no-nested-ternary,no-unused-expressions
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
    // eslint-disable-next-line no-undef
    : typeof define === 'function' && define.amd ? define(factory)
    // eslint-disable-next-line no-param-reassign,no-restricted-globals
      : (global = global || self, global.isValid = factory());
}(this, () => {
  const REGX = {
    PAN: /^[A-Z]{5}\d{4}[A-Z]$/,
    GSTIN_WO_CHK: /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d][Z]$/,
    GSTIN: /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d][Z][A-Z\d]$/,
    TAN: /^[A-Z]{4}\d{5}[A-Z]$/,
    AADHAR: /^[2-9]\d{11}$/,
    IMEI: /^\d{15}$/,
    CARD: /^\d{14,16}$/,
    IFSC: /^[A-Z]{4}[A-Z0-9]{7}$/,
    ESIC: /^\d{17}$/,
    UAN: /^\d{12}$/,
    MOBILE: /^\d{10}$/,
    PINCODE: /^\d{6}$/,
    HSN: /^\d{2}(\d{2})?(\d{2})?(\d{2})?$/,
    SAC: /^\d{8}$/,
  };
  const PAN_HOLDER = {
    A: 'Association Of Persons (AOP)',
    B: 'Body Of Individuals (BOI)',
    C: 'Company',
    F: 'Firm',
    G: 'Government',
    H: 'Hindu Undivided Family (HUF)',
    L: 'Local Authority',
    J: 'Artificial Juridical Person',
    P: 'Individual (Proprietor)',
    T: 'Trust (AOP)',
    E: 'Limited Liability Partnership (LLP)',
  };
  const luhnCheck = value => value.split('').reverse().map((x, i) => (i % 2 ? +x * 2 : +x))
    .map(x => (x > 9 ? (x % 10) + 1 : x))
    .reduce((a, x) => a + x) % 10 === 0;
  const getValidDigit = (gstino) => {
    const gstNo = gstino.toUpperCase().substring(0, 14).split('');
    const ref = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sum = gstNo.map((x, i) => ref.indexOf(x) * ((i % 2) + 1))
      .map(x => Math.floor(x / 36) + (x % 36))
      .reduce((a, c) => a + c, 0);
    return ref.charAt(36 - (sum % 36));
  };
  const gstin = (gstNo) => {
    if (gstNo.length === 15 && REGX.GSTIN.test(gstNo.toUpperCase())) {
      return getValidDigit(gstNo) === gstNo.toUpperCase().substr(-1);
    }
    return false;
  };
  gstin.getValidDigit = getValidDigit;
  const pan = (panNo) => {
    if (panNo.length === 10 && REGX.PAN.test(panNo.toUpperCase())) {
      const panTypes = ['A', 'B', 'C', 'F', 'G', 'H', 'L', 'J', 'P', 'T', 'E'];
      return panTypes.includes(panNo[3].toUpperCase());
    }
    return false;
  };
  pan.holder = (panNo) => {
    if (panNo.length !== 10 || !REGX.PAN.test(panNo.toUpperCase())) throw Error('Invalid PAN Format');
    return PAN_HOLDER[panNo[3].toUpperCase()] || 'UNKNOWN';
  };
  const tan = (tanNo) => {
    if (tanNo.length === 10 && REGX.TAN.test(tanNo.toUpperCase())) {
      return 'ABCDEFG'[Number(tanNo.substring(4, 9)) % 7] === tanNo.toUpperCase().substr(-1);
    }
    return false;
  };
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];
  const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
  function invArray(arr) {
    let array = arr;
    if (Object.prototype.toString.call(array) === '[object Number]') array = String(array);
    if (Object.prototype.toString.call(array) === '[object String]') array = array.split('').map(Number);
    return array.reverse();
  }
  const generate = number => inv[invArray(number).reduce((a, c, i) => d[a][p[(i + 1) % 8][c]], 0)];
  const aadhar = (number) => {
    if (REGX.AADHAR.test(number.toString())) {
      return !invArray(number).reduce((a, c, i) => d[a][p[i % 8][c]], 0);
    }
    return false;
  };
  aadhar.getValidDigit = generate;
  const imei = (number) => {
    const val = number.toString();
    if (val.length === 15 && REGX.IMEI.test(val)) return luhnCheck(val);
    return false;
  };
  const card = (number) => {
    const val = number.toString();
    if ([14, 15, 16].includes(val.length) && REGX.CARD.test(val)) return luhnCheck(val);
    return false;
  };
  const ifsc = code => REGX.IFSC.test(code);
  const esic = number => REGX.ESIC.test(number);
  const uan = number => REGX.UAN.test(number);
  const mobile = number => REGX.MOBILE.test(number);
  const pinCode = number => REGX.PINCODE.test(number);
  const hsn = (code, length) => {
    let result = REGX.HSN.test(code);
    if ([2, 4, 6, 8].includes(length)) result = result && (length === code.length);
    return result;
  };
  const sac = code => REGX.SAC.test(code);
  const isValid = {
    gstin, pan, tan, aadhar, imei, card, ifsc, esic, uan, mobile, pinCode, hsn, sac,
  };

  return isValid;
}));
