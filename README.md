## Validators
[![Build Status](https://travis-ci.com/ashwinbande/validators.svg?branch=master)](https://travis-ci.com/ashwinbande/validators)
[![](https://data.jsdelivr.com/v1/package/npm/@ashwinbande/validators/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@ashwinbande/validators)
[![codecov](https://codecov.io/gh/ashwinbande/validators/branch/master/graph/badge.svg)](https://codecov.io/gh/ashwinbande/validators)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40ashwinbande%2Fvalidators.svg)](https://badge.fury.io/js/%40ashwinbande%2Fvalidators)
![npm](https://img.shields.io/npm/dm/@ashwinbande/validators.svg)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@ashwinbande/validators.svg)
![Snyk Vulnerabilities for npm package version](https://img.shields.io/snyk/vulnerabilities/npm/@ashwinbande/validators.svg)
---------------------------------------
#### Multiple set of validators for validating codes used in Indian system such as PAN, AADHAR, GSTIN etc.
for CDN use: ```<script src="https://cdn.jsdelivr.net/npm/@ashwinbande/validators/index.min.js"></script>```

### Installation
```javascript
    npm i @ashwinbande/validators
    // or
    yarn add @ashwinbande/validators
```

### Use
In your .js file add following code

```javascript
    const isValid = require('@ashwinbande/validators')
```

#### 1. GSTIN (Goods and Service Tax Indentification Number):
validates => Input must be in format `##AAAAA####A#Z(#/A)`, and have length 15 and last char is Valid checksum.
    
```javascript
const invalid = '09AAACT2727Q1ZA'
const valid = '09AAACT2727Q1ZU'
isValid.gstin(invalid) /* returns false */
isValid.gstin(valid)   /* returns true */
``` 

You can also calculate the checksum of a GSTIN by -
```javascript
isValid.gstin.getValidDigit('09AAACT2727Q1ZA') /* return U */
isValid.gstin.getValidDigit('09AAACT2727Q1Z')  /* return U */
```
Note that only first 14 characters are required and next are ignored.

#### 2. PAN (Permanent Account Number):
validates => Input must be in format `AAAAA####A`, and have length 10 and fourth character must be either A, B, C, F, G, H, L, J, P, T, E.    
```javascript
isValid.pan('AAACT2727Q')  /* returns true  */
isValid.pan('11ACT2727Q')  /* returns false */
``` 
You can also obtain PAN holder type by -
```javascript
isValid.pan.holder('AAACT2727Q')  /* returns 'Company'  */
```
possible values are -
```
A: Association Of Persons (AOP),
B: Body Of Individuals (BOI),
C: Company,
F: Firm,
G: Government,
H: Hindu Undivided Family (HUF),
L: Local Authority,
J: Artificial Juridical Person,
P: Individual (Proprietor),
T: Trust (AOP),
E: Limited Liability Partnership (LLP),
```

#### 3. TAN (Tax Deduction and Collection Account Number):
validates => Input must be in format `AAAA#####A`, and have length 10 and last char is Valid checksum.
    
```javascript
const invalid = 'MUMT07207A'
const valid = 'MUMT07207E'
isValid.tan(invalid) /* returns false */
isValid.tan(valid)   /* returns true  */
``` 

#### 4. AADHAR (Issued by - Unique Identification Authority of India):
validates => Input must be in format `############`, and have length 12 and last char is Valid checksum.
    
```javascript
const invalid = '499128665246'
const valid =   '499118665246'
isValid.aadhar(invalid) /* returns false */
isValid.aadhar(valid)   /* returns true  */
``` 
You can also calculate the checksum of a AADHAR by -
```javascript
isValid.aadhar.getValidDigit('49911866524') /* return 6 */
```

#### 5. IMEI (International Mobile Equipment Identity):
validates => Input must be in format `###############`, and have length 15 and last digit is Valid checksum.
    
```javascript
const invalid = '357917092311929'
const valid =   '357917052311929'
isValid.imei(invalid) /* returns false */
isValid.imei(valid)   /* returns true  */
``` 

#### 6. Credit / Debit Card:
validates => Input must be in format `##############(##)`, and have length 14 or 15 or 16 and last digit is Valid checksum.
    
```javascript
const invalid = '5103720017095346'
const valid =   '5103720017096346'
isValid.card(invalid) /* returns false */
isValid.card(valid)   /* returns true  */
``` 

#### 7. IFSC (Indian Financial System Code):
validates => Input must be in format `AAAA#######`, and have length 11.
    
```javascript
const invalid = 'SBIN000I234'
const valid =   'SBIN0001234'
isValid.ifsc(invalid) /* returns false */
isValid.ifsc(valid)   /* returns true  */
``` 

#### 8. ESIC Number (Employees State Insurance Corporation Number):
validates => Input must be in format `#################`, and have length 17.
    
```javascript
const invalid = '3100123456A000001'
const valid =   '31001234560000001'
isValid.esic(invalid) /* returns false */
isValid.esic(valid)   /* returns true  */
```

#### 9. UAN (Universal Account Number):
validates => Input must be in format `############`, and have length 12.
    
```javascript
const invalid = '11122Z333444'
const valid =   '111222333444'
isValid.esic(invalid) /* returns false */
isValid.esic(valid)   /* returns true  */
```  

#### 10. Mobile Number:
validates => Input must be in format `##########`, and have length 10.
    
```javascript
const invalid = '99887766A5'
const valid =   '9988776655'
isValid.mobile(invalid) /* returns false */
isValid.mobile(valid)   /* returns true  */
```  

#### 11. PIN CODE (Postal Identification Number):
validates => Input must be in format `######`, and have length 6.
    
```javascript
const invalid = '44520'
const valid =   '445206'
isValid.pinCode(invalid) /* returns false */
isValid.pinCode(valid)   /* returns true  */
```  

#### 12. HSN (Harmonized System Nomenclature):
validates => Input must be in format `##(##)(##)(##)`, and have length 2 or 4 or 6 or 8.
    
```javascript
hsn('4')        /* returns false */
hsn('445')      /* returns false */
hsn('44556')    /* returns false */
hsn('445566A4') /* returns false */
hsn('44')       /* returns true  */
hsn('4455')     /* returns true  */
hsn('445566')   /* returns true  */
hsn('44556634') /* returns true  */
```

#### 13. SAC (Services Accounting Code):
validates => Input must be in format `########`, and have length 8.
    
```javascript
hsn('445566A4') /* returns false */
hsn('44556634') /* returns true  */
```

------------------------------------

#### For Feature requests and Error reporting:
create an issue on [github repository](https://github.com/ashwinbande/validators/issues) or contact directly to [ashwinbandeukd@gmail.com](mailto:ashwinbandeukd@gmail.com)

##### **Don't Forget to add a star to [github repo](https://github.com/ashwinbande/validators). Please provide your comments, suggest improvements and other codes which are not covered in this package.