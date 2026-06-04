export const categories = [
  { id: 'length' },
  { id: 'mass' },
  { id: 'temperature' },
  { id: 'pressure' },
  { id: 'volume' },
  { id: 'area' },
  { id: 'speed' },
  { id: 'time' }
];

export const units = [
  // === LENGTH ===
  // Metric Length
  {
    id: 'mm',
    symbol: 'mm',
    category: 'length',
    system: 'metric',
    rank: 1,
    factor: 0.001
  },
  {
    id: 'cm',
    symbol: 'cm',
    category: 'length',
    system: 'metric',
    rank: 2,
    factor: 0.01
  },
  {
    id: 'm',
    symbol: 'm',
    category: 'length',
    system: 'metric',
    rank: 3,
    factor: 1.0
  },
  {
    id: 'km',
    symbol: 'km',
    category: 'length',
    system: 'metric',
    rank: 4,
    factor: 1000.0
  },
  // Imperial Length
  {
    id: 'in',
    symbol: 'in',
    category: 'length',
    system: 'imperial',
    rank: 1,
    factor: 0.0254
  },
  {
    id: 'ft',
    symbol: 'ft',
    category: 'length',
    system: 'imperial',
    rank: 2,
    factor: 0.3048
  },
  {
    id: 'yd',
    symbol: 'yd',
    category: 'length',
    system: 'imperial',
    rank: 3,
    factor: 0.9144
  },
  {
    id: 'mi',
    symbol: 'mi',
    category: 'length',
    system: 'imperial',
    rank: 4,
    factor: 1609.344
  },

  // === MASS / WEIGHT ===
  // Metric Mass
  {
    id: 'mg',
    symbol: 'mg',
    category: 'mass',
    system: 'metric',
    rank: 1,
    factor: 0.000001
  },
  {
    id: 'g',
    symbol: 'g',
    category: 'mass',
    system: 'metric',
    rank: 2,
    factor: 0.001
  },
  {
    id: 'kg',
    symbol: 'kg',
    category: 'mass',
    system: 'metric',
    rank: 3,
    factor: 1.0
  },
  {
    id: 't',
    symbol: 't',
    category: 'mass',
    system: 'metric',
    rank: 4,
    factor: 1000.0
  },
  // Imperial Mass
  {
    id: 'oz',
    symbol: 'oz',
    category: 'mass',
    system: 'imperial',
    rank: 1,
    factor: 0.028349523125
  },
  {
    id: 'lb',
    symbol: 'lb',
    category: 'mass',
    system: 'imperial',
    rank: 2,
    factor: 0.45359237
  },
  {
    id: 'st',
    symbol: 'st',
    category: 'mass',
    system: 'imperial',
    rank: 3,
    factor: 6.35029318
  },

  // === TEMPERATURE ===
  // Note: Standard base unit is Celsius
  {
    id: 'C',
    symbol: '°C',
    category: 'temperature',
    system: 'temp',
    rank: 2,
    toBase: (val) => val,
    fromBase: (val) => val
  },
  {
    id: 'F',
    symbol: '°F',
    category: 'temperature',
    system: 'temp',
    rank: 3,
    toBase: (val) => (val - 32) / 1.8,
    fromBase: (val) => val * 1.8 + 32
  },
  {
    id: 'K',
    symbol: 'K',
    category: 'temperature',
    system: 'temp',
    rank: 1,
    toBase: (val) => val - 273.15,
    fromBase: (val) => val + 273.15
  },

  // === PRESSURE ===
  // Metric/SI Pressure
  {
    id: 'Pa',
    symbol: 'Pa',
    category: 'pressure',
    system: 'metric',
    rank: 1,
    factor: 1.0
  },
  {
    id: 'kPa',
    symbol: 'kPa',
    category: 'pressure',
    system: 'metric',
    rank: 2,
    factor: 1000.0
  },
  {
    id: 'bar',
    symbol: 'bar',
    category: 'pressure',
    system: 'metric',
    rank: 3,
    factor: 100000.0
  },
  {
    id: 'MPa',
    symbol: 'MPa',
    category: 'pressure',
    system: 'metric',
    rank: 4,
    factor: 1000000.0
  },
  // Imperial / Practical Pressure
  {
    id: 'mmHg',
    symbol: 'mmHg',
    category: 'pressure',
    system: 'practical',
    rank: 1,
    factor: 133.322387415
  },
  {
    id: 'psi',
    symbol: 'psi',
    category: 'pressure',
    system: 'practical',
    rank: 2,
    factor: 6894.75729
  },
  {
    id: 'atm',
    symbol: 'atm',
    category: 'pressure',
    system: 'practical',
    rank: 3,
    factor: 101325.0
  },

  // === VOLUME ===
  // Metric Volume
  {
    id: 'mL',
    symbol: 'mL',
    category: 'volume',
    system: 'metric',
    rank: 1,
    factor: 0.001
  },
  {
    id: 'L',
    symbol: 'L',
    category: 'volume',
    system: 'metric',
    rank: 2,
    factor: 1.0
  },
  {
    id: 'm3',
    symbol: 'm³',
    category: 'volume',
    system: 'metric',
    rank: 3,
    factor: 1000.0
  },
  // Imperial / US Volume
  {
    id: 'floz',
    symbol: 'fl oz',
    category: 'volume',
    system: 'imperial',
    rank: 1,
    factor: 0.0295735295625
  },
  {
    id: 'cup',
    symbol: 'xícara',
    category: 'volume',
    system: 'imperial',
    rank: 2,
    factor: 0.24
  },
  {
    id: 'pt',
    symbol: 'pt',
    category: 'volume',
    system: 'imperial',
    rank: 3,
    factor: 0.473176473
  },
  {
    id: 'qt',
    symbol: 'qt',
    category: 'volume',
    system: 'imperial',
    rank: 4,
    factor: 0.946352946
  },
  {
    id: 'gal',
    symbol: 'gal',
    category: 'volume',
    system: 'imperial',
    rank: 5,
    factor: 3.785411784
  },

  // === AREA ===
  // Metric Area
  {
    id: 'cm2',
    symbol: 'cm²',
    category: 'area',
    system: 'metric',
    rank: 1,
    factor: 0.0001
  },
  {
    id: 'm2',
    symbol: 'm²',
    category: 'area',
    system: 'metric',
    rank: 2,
    factor: 1.0
  },
  {
    id: 'ha',
    symbol: 'ha',
    category: 'area',
    system: 'metric',
    rank: 3,
    factor: 10000.0
  },
  {
    id: 'km2',
    symbol: 'km²',
    category: 'area',
    system: 'metric',
    rank: 4,
    factor: 1000000.0
  },
  // Imperial Area
  {
    id: 'in2',
    symbol: 'in²',
    category: 'area',
    system: 'imperial',
    rank: 1,
    factor: 0.00064516
  },
  {
    id: 'ft2',
    symbol: 'ft²',
    category: 'area',
    system: 'imperial',
    rank: 2,
    factor: 0.09290304
  },
  {
    id: 'ac',
    symbol: 'ac',
    category: 'area',
    system: 'imperial',
    rank: 3,
    factor: 4046.8564224
  },
  {
    id: 'mi2',
    symbol: 'mi²',
    category: 'area',
    system: 'imperial',
    rank: 4,
    factor: 2589988.110336
  },
  // Brazilian Alqueires
  {
    id: 'alq_paulista',
    symbol: 'alq. paul.',
    category: 'area',
    system: 'practical',
    rank: 5,
    factor: 24200.0
  },
  {
    id: 'alq_mineiro',
    symbol: 'alq. min.',
    category: 'area',
    system: 'practical',
    rank: 6,
    factor: 48400.0
  },
  {
    id: 'alq_baiano',
    symbol: 'alq. baiano',
    category: 'area',
    system: 'practical',
    rank: 7,
    factor: 96800.0
  },
  {
    id: 'alq_norte',
    symbol: 'alq. norte',
    category: 'area',
    system: 'practical',
    rank: 8,
    factor: 27225.0
  },

  // === SPEED ===
  // Metric/Standard Speed
  {
    id: 'kmh',
    symbol: 'km/h',
    category: 'speed',
    system: 'metric',
    rank: 1,
    factor: 1 / 3.6
  },
  {
    id: 'ms',
    symbol: 'm/s',
    category: 'speed',
    system: 'metric',
    rank: 2,
    factor: 1.0
  },
  // Imperial Speed
  {
    id: 'mph',
    symbol: 'mph',
    category: 'speed',
    system: 'imperial',
    rank: 1,
    factor: 0.44704
  },
  {
    id: 'kt',
    symbol: 'kt',
    category: 'speed',
    system: 'imperial',
    rank: 2,
    factor: 0.514444
  },

  // === TIME ===
  {
    id: 'ms_time',
    symbol: 'ms',
    category: 'time',
    system: 'standard',
    rank: 1,
    factor: 0.001
  },
  {
    id: 's',
    symbol: 's',
    category: 'time',
    system: 'standard',
    rank: 2,
    factor: 1.0
  },
  {
    id: 'min',
    symbol: 'min',
    category: 'time',
    system: 'standard',
    rank: 3,
    factor: 60.0
  },
  {
    id: 'h',
    symbol: 'h',
    category: 'time',
    system: 'standard',
    rank: 4,
    factor: 3600.0
  },
  {
    id: 'd',
    symbol: 'd',
    category: 'time',
    system: 'standard',
    rank: 5,
    factor: 86400.0
  },
  {
    id: 'sem',
    symbol: 'sem',
    category: 'time',
    system: 'standard',
    rank: 6,
    factor: 604800.0
  },
  {
    id: 'ano',
    symbol: 'ano',
    category: 'time',
    system: 'standard',
    rank: 7,
    factor: 31536000.0 // 365 days
  }
];

export function convert(value, fromUnit, toUnit) {
  if (value === null || value === undefined || isNaN(value)) {
    return null;
  }
  
  let baseValue;
  if (fromUnit.toBase) {
    baseValue = fromUnit.toBase(value);
  } else {
    baseValue = value * fromUnit.factor;
  }

  let targetValue;
  if (toUnit.fromBase) {
    targetValue = toUnit.fromBase(baseValue);
  } else {
    targetValue = baseValue / toUnit.factor;
  }

  return targetValue;
}
