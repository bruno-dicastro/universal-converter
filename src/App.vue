<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { categories, units, convert } from './units.js';
import { translations } from './i18n.js';

// Language state
const browserLang = navigator.language.split('-')[0];
const defaultLang = translations[browserLang] ? browserLang : 'en';
const currentLang = ref(defaultLang);

// Precision state
const decimalPlaces = ref(2);

// Helper for translations
const t = (key) => {
  const keys = key.split('.');
  let obj = translations[currentLang.value];
  for (const k of keys) {
    if (obj[k]) {
      obj = obj[k];
    } else {
      return key;
    }
  }
  
  // Replace version placeholder if present
  if (typeof obj === 'string' && obj.includes('{version}')) {
    return obj.replace('{version}', APP_VERSION);
  }
  
  return obj;
};

const getSymbol = (unit) => {
  const lang = currentLang.value;
  return translations[lang].symbols?.[unit.id] || unit.symbol;
};

// Re-format values when language or precision changes
watch([currentLang, decimalPlaces], () => {
  const numA = parseLocaleNumber(valA.value);
  const numB = parseLocaleNumber(valB.value);
  if (!isNaN(numA)) valA.value = formatVal(numA);
  if (!isNaN(numB)) valB.value = formatVal(numB);
});

// Application state
const valA = ref(formatVal(1));
const valB = ref(formatVal(0.3937007874));

// Default units initially: Centimeter (cm) and Inch (in)
const unitA = ref(units.find(u => u.id === 'cm'));
const unitB = ref(units.find(u => u.id === 'in'));

// Tracks which field was last edited to act as the source of truth for conversions
const lastEdited = ref('A');

// Dropdown open states
const isOpenA = ref(false);
const isOpenB = ref(false);

// Search states for filtering
const searchA = ref('');
const searchB = ref('');

// Template refs for focusing
const searchInputA = ref(null);
const searchInputB = ref(null);

// Default pairing mapping for automatic category switching
const categoryPairs = {
  length: { defaultA: 'm', defaultB: 'ft' },
  mass: { defaultA: 'kg', defaultB: 'lb' },
  temperature: { defaultA: 'C', defaultB: 'F' },
  pressure: { defaultA: 'bar', defaultB: 'psi' },
  volume: { defaultA: 'L', defaultB: 'gal' },
  area: { defaultA: 'm2', defaultB: 'ft2' },
  speed: { defaultA: 'kmh', defaultB: 'mph' },
  time: { defaultA: 's', defaultB: 'min' }
};

// Groups and filters units for Column A
const filteredGroupedUnitsA = computed(() => {
  const query = searchA.value.toLowerCase().trim();
  const lang = currentLang.value;
  return categories.map(cat => {
    const catName = translations[lang].categories[cat.id] || cat.id;
    const filtered = units.filter(u => {
      const unitName = translations[lang].units[u.id] || u.id;
      return u.category === cat.id && 
        (unitName.toLowerCase().includes(query) || u.symbol.toLowerCase().includes(query));
    });
    return { category: { ...cat, name: catName }, units: filtered };
  }).filter(group => group.units.length > 0);
});

// Groups and filters units for Column B
const filteredGroupedUnitsB = computed(() => {
  const query = searchB.value.toLowerCase().trim();
  const lang = currentLang.value;
  return categories.map(cat => {
    const catName = translations[lang].categories[cat.id] || cat.id;
    const filtered = units.filter(u => {
      const unitName = translations[lang].units[u.id] || u.id;
      return u.category === cat.id && 
        (unitName.toLowerCase().includes(query) || u.symbol.toLowerCase().includes(query));
    });
    return { category: { ...cat, name: catName }, units: filtered };
  }).filter(group => group.units.length > 0);
});

// Format numeric outputs nicely (standard decimals vs scientific notation)
function formatVal(val) {
  if (val === 0 || val === '0') return '0';
  if (val === null || val === undefined || val === '') return '';
  
  const num = typeof val === 'number' ? val : parseLocaleNumber(val);
  if (isNaN(num)) return '';
  
  const absVal = Math.abs(num);
  
  // Scientific notation for very large or very small scales
  if (absVal < 1e-5 || absVal >= 1e9) {
    return num.toExponential(4);
  }
  
  // Use Intl.NumberFormat for locale-aware formatting with thousands separators
  return new Intl.NumberFormat(currentLang.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces.value
  }).format(num);
}

// Locale-aware parser to handle thousands separators and decimal marks
function parseLocaleNumber(val) {
  if (val === null || val === undefined || val === '') return NaN;
  const str = val.toString().trim();
  if (str === '') return NaN;

  const formatter = new Intl.NumberFormat(currentLang.value);
  const parts = formatter.formatToParts(1111.1);
  const group = parts.find(p => p.type === 'group')?.value || '';
  const decimal = parts.find(p => p.type === 'decimal')?.value || '.';
  
  // Escape group separator for regex (especially if it's a dot or space)
  const escapedGroup = group.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Support both normal space and non-breaking space for group separator
  const regexGroup = new RegExp(escapedGroup || '\\s', 'g');
  
  const normalized = str
    .replace(regexGroup, '')
    .replace(decimal, '.');
    
  return parseFloat(normalized);
}

// Convert logic when value A is typed
function updateFromA() {
  if (valA.value === '' || valA.value === null) {
    valB.value = '';
    return;
  }
  const num = parseLocaleNumber(valA.value);
  if (isNaN(num)) {
    valB.value = '';
    return;
  }
  const result = convert(num, unitA.value, unitB.value);
  valB.value = formatVal(result);
}

// Convert logic when value B is typed
function updateFromB() {
  if (valB.value === '' || valB.value === null) {
    valA.value = '';
    return;
  }
  const num = parseLocaleNumber(valB.value);
  if (isNaN(num)) {
    valA.value = '';
    return;
  }
  const result = convert(num, unitB.value, unitA.value);
  valA.value = formatVal(result);
}

// Handle inputs
function handleInputA(e) {
  lastEdited.value = 'A';
  valA.value = e.target.value;
  updateFromA();
}

function handleInputB(e) {
  lastEdited.value = 'B';
  valB.value = e.target.value;
  updateFromB();
}

// Subordinate units list filters
const secondaryUnitsA = computed(() => {
  const currentUnit = unitA.value;
  const sameSystemUnits = units.filter(u => u.category === currentUnit.category && u.system === currentUnit.system);
  
  return {
    above: sameSystemUnits.filter(u => u.rank < currentUnit.rank).sort((a, b) => a.rank - b.rank),
    below: sameSystemUnits.filter(u => u.rank > currentUnit.rank).sort((a, b) => a.rank - b.rank)
  };
});

const secondaryUnitsB = computed(() => {
  const currentUnit = unitB.value;
  const sameSystemUnits = units.filter(u => u.category === currentUnit.category && u.system === currentUnit.system);
  
  return {
    above: sameSystemUnits.filter(u => u.rank < currentUnit.rank).sort((a, b) => a.rank - b.rank),
    below: sameSystemUnits.filter(u => u.rank > currentUnit.rank).sort((a, b) => a.rank - b.rank)
  };
});

// Calculate converted value for secondary items
function getSecondaryValue(targetUnit, isColumnA) {
  let sourceVal, sourceUnit;
  if (isColumnA) {
    sourceVal = parseLocaleNumber(valA.value);
    sourceUnit = unitA.value;
  } else {
    sourceVal = parseLocaleNumber(valB.value);
    sourceUnit = unitB.value;
  }
  
  if (isNaN(sourceVal)) return '-';
  const result = convert(sourceVal, sourceUnit, targetUnit);
  return formatVal(result);
}

// Unit selections
function selectUnitA(unit) {
  unitA.value = unit;
  isOpenA.value = false;
  searchA.value = ''; // Reset search
  
  // Auto-correct B if categories mismatch
  if (unitA.value.category !== unitB.value.category) {
    const cat = unitA.value.category;
    const pair = categoryPairs[cat];
    if (unitA.value.id === pair.defaultA) {
      unitB.value = units.find(u => u.id === pair.defaultB);
    } else {
      unitB.value = units.find(u => u.id === pair.defaultA);
    }
  }

  // Recalculate
  if (lastEdited.value === 'A') {
    updateFromA();
  } else {
    updateFromB();
  }
}

function selectUnitB(unit) {
  unitB.value = unit;
  isOpenB.value = false;
  searchB.value = ''; // Reset search

  // Auto-correct A if categories mismatch
  if (unitB.value.category !== unitA.value.category) {
    const cat = unitB.value.category;
    const pair = categoryPairs[cat];
    if (unitB.value.id === pair.defaultB) {
      unitA.value = units.find(u => u.id === pair.defaultA);
    } else {
      unitA.value = units.find(u => u.id === pair.defaultB);
    }
  }

  // Recalculate
  if (lastEdited.value === 'B') {
    updateFromB();
  } else {
    updateFromA();
  }
}

function openSelectA() {
  isOpenA.value = !isOpenA.value;
  if (isOpenA.value) {
    isOpenB.value = false;
    searchA.value = ''; // Reset search on open
    nextTick(() => {
      const activeEl = document.querySelector('.converter-column:first-of-type .option-item.selected');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    });
  }
}

function openSelectB() {
  isOpenB.value = !isOpenB.value;
  if (isOpenB.value) {
    isOpenA.value = false;
    searchB.value = ''; // Reset search on open
    nextTick(() => {
      const activeEl = document.querySelector('.converter-column:last-of-type .option-item.selected');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    });
  }
}

// Focus search input when user starts typing while dropdown is open
const handleGlobalKeyDown = (e) => {
  if (!isOpenA.value && !isOpenB.value) return;

  // Only focus if it's a single character key and not a control key
  // This allows common typing to trigger focus but ignores keys like Shift, Alt, etc.
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const target = isOpenA.value ? searchInputA.value : searchInputB.value;
    if (target && document.activeElement !== target) {
      target.focus();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown);
});
</script>

<template>
  <div class="technical-paper">
    <!-- Grid rulers -->
    <div class="top-ruler"></div>
    <div class="left-ruler"></div>

    <!-- Paper Header -->
    <header class="technical-header">
      <h1>{{ t('title') }}</h1>
      <p>{{ t('subtitle') }}</p>
    </header>

    <!-- Main Converter -->
    <main class="converter-container">
      
      <!-- COLUMN A -->
      <div class="converter-column">
        <!-- Smaller Units (Above) -->
        <div class="sub-units-above">
          <div 
            v-for="u in secondaryUnitsA.above" 
            :key="u.id" 
            class="sub-unit-item"
            @click="selectUnitA(u)"
            :title="t('unitTooltip') + ': ' + t(`units.${u.id}`)"
          >
            {{ getSecondaryValue(u, true) }} {{ getSymbol(u) }}
          </div>
        </div>

        <!-- Input Box A -->
        <div class="main-input-box">
          <div class="input-wrapper">
            <span class="field-label">{{ t('labelValue') }}</span>
            <input 
              type="text" 
              inputmode="decimal"
              class="value-input" 
              :value="valA" 
              @input="handleInputA"
              @blur="valA = formatVal(valA)"
              placeholder="0"
            />
          </div>
          
          <div class="select-wrapper">
            <span class="field-label">{{ t('labelUnit') }}</span>
            <!-- Custom Unit Selector A -->
            <div class="custom-select" :class="{ open: isOpenA }">
              <div class="selected-val" @click.stop="openSelectA">
                <span>{{ t(`units.${unitA.id}`) }} ({{ getSymbol(unitA) }})</span>
                <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
              </div>
              
              <template v-if="isOpenA">
                <div class="dropdown-backdrop" @click.stop="isOpenA = false"></div>
                <div class="options-dropdown">
                  <div class="search-container" @click.stop>
                    <input 
                      type="text" 
                      v-model="searchA" 
                      class="search-input" 
                      :placeholder="t('filterPlaceholder')"
                      ref="searchInputA"
                    />
                  </div>
                  <div v-for="group in filteredGroupedUnitsA" :key="group.category.id" class="category-group">
                    <div class="category-label">{{ group.category.name }}</div>
                    <div 
                      v-for="u in group.units" 
                      :key="u.id" 
                      class="option-item"
                      :class="{ selected: u.id === unitA.id }"
                      @click.stop="selectUnitA(u)"
                    >
                      {{ t(`units.${u.id}`) }} ({{ getSymbol(u) }})
                    </div>
                  </div>
                  <div v-if="filteredGroupedUnitsA.length === 0" class="no-results">
                    {{ t('noResults') }}
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Larger Units (Below) -->
        <div class="sub-units-below">
          <div 
            v-for="u in secondaryUnitsA.below" 
            :key="u.id" 
            class="sub-unit-item"
            @click="selectUnitA(u)"
            :title="t('unitTooltip') + ': ' + t(`units.${u.id}`)"
          >
            {{ getSecondaryValue(u, true) }} {{ getSymbol(u) }}
          </div>
        </div>
      </div>

      <!-- Connection Arrow Indicator -->
      <div class="converter-arrow">
        <svg viewBox="0 0 24 24" class="arrow-icon">
          <!-- Right arrow -->
          <path d="M19 8l-4-4v3H5v2h10v3z" />
          <!-- Left arrow -->
          <path d="M5 16l4 4v-3h10v-2H9v-3z" />
        </svg>
      </div>

      <!-- COLUMN B -->
      <div class="converter-column">
        <!-- Smaller Units (Above) -->
        <div class="sub-units-above">
          <div 
            v-for="u in secondaryUnitsB.above" 
            :key="u.id" 
            class="sub-unit-item"
            @click="selectUnitB(u)"
            :title="t('unitTooltip') + ': ' + t(`units.${u.id}`)"
          >
            {{ getSecondaryValue(u, false) }} {{ getSymbol(u) }}
          </div>
        </div>

        <!-- Input Box B -->
        <div class="main-input-box">
          <div class="input-wrapper">
            <span class="field-label">{{ t('labelValue') }}</span>
            <input 
              type="text" 
              inputmode="decimal"
              class="value-input" 
              :value="valB" 
              @input="handleInputB"
              @blur="valB = formatVal(valB)"
              placeholder="0"
            />
          </div>
          
          <div class="select-wrapper">
            <span class="field-label">{{ t('labelUnit') }}</span>
            <!-- Custom Unit Selector B -->
            <div class="custom-select" :class="{ open: isOpenB }">
              <div class="selected-val" @click.stop="openSelectB">
                <span>{{ t(`units.${unitB.id}`) }} ({{ getSymbol(unitB) }})</span>
                <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
              </div>
              
              <template v-if="isOpenB">
                <div class="dropdown-backdrop" @click.stop="isOpenB = false"></div>
                <div class="options-dropdown">
                  <div class="search-container" @click.stop>
                    <input 
                      type="text" 
                      v-model="searchB" 
                      class="search-input" 
                      :placeholder="t('filterPlaceholder')"
                      ref="searchInputB"
                    />
                  </div>
                  <div v-for="group in filteredGroupedUnitsB" :key="group.category.id" class="category-group">
                    <div class="category-label">{{ group.category.name }}</div>
                    <div 
                      v-for="u in group.units" 
                      :key="u.id" 
                      class="option-item"
                      :class="{ selected: u.id === unitB.id }"
                      @click.stop="selectUnitB(u)"
                    >
                      {{ t(`units.${u.id}`) }} ({{ getSymbol(u) }})
                    </div>
                  </div>
                  <div v-if="filteredGroupedUnitsB.length === 0" class="no-results">
                    {{ t('noResults') }}
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Larger Units (Below) -->
        <div class="sub-units-below">
          <div 
            v-for="u in secondaryUnitsB.below" 
            :key="u.id" 
            class="sub-unit-item"
            @click="selectUnitB(u)"
            :title="t('unitTooltip') + ': ' + t(`units.${u.id}`)"
          >
            {{ getSecondaryValue(u, false) }} {{ getSymbol(u) }}
          </div>
        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="technical-footer">
      🄯 dicastro.io
    </footer>

    <div class="lang-selector">
      <div class="precision-selector">
        <span>{{ currentLang === 'pt' ? 'Decimais:' : (currentLang === 'fr' ? 'Décimales:' : 'Decimals:') }}</span>
        <select v-model.number="decimalPlaces">
          <option v-for="n in 11" :key="n-1" :value="n-1">{{ n-1 }}</option>
        </select>
      </div>
      <select v-model="currentLang">
        <option value="pt">PT</option>
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
/* Backdrop overlay to dismiss dropdowns clicking anywhere outside */
.dropdown-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background: transparent;
}
</style>
