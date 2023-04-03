function ConvertHandler() {
  const unitMap = {
    'gal': { to: 'L', name: 'gallons' },
    'L': { to: 'gal', name: 'liters' },
    'mi': { to: 'km', name: 'miles' },
    'km': { to: 'mi', name: 'kilometers' },
    'lbs': { to: 'kg', name: 'pounds' },
    'kg': { to: 'lbs', name: 'kilograms' }
  };

  this.getNum = function (input) {
    let result = input.replace(/[^0-9.\/]/g, "");

    if (result.includes('/') && !/^[^\/]*\/[^\/]*$/.test(result)) return 'invalid number';
    if (result == "") return 1;
    return Math.round(eval(result) * 100000) / 100000;;
  };

  this.getUnit = function (input) {
    let result = input.replace(/[^a-zA-Z]/ig, "").toLowerCase();
    let units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!units.includes(result)) return "invalid unit";
    if (result == 'l') return 'L';
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    if(unitMap[initUnit]) return unitMap[initUnit].to;
    return "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    if(unitMap[unit]) return unitMap[unit].name;
    return "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }

    return Math.round(result * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
