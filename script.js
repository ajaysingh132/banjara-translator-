// ========================================
// BANJARA TRANSLATOR - JAVASCRIPT
// ========================================

// Banjara Dictionary
const BANJARA_DICTIONARY = {
  // Water & Food
  "panni": { hi: "पानी", en: "Water", mr: "पाणी", gu: "પાણી", ta: "நீர்", te: "నీరు" },
  "roti": { hi: "रोटी", en: "Bread", mr: "रोटी", gu: "રોટલી", ta: "ரோட்டி", te: "రోటీ" },
  "nam": { hi: "नाम", en: "Name", mr: "नाव", gu: "નામ", ta: "பெயர்", te: "పేరు" },
  "tumhi": { hi: "तुम", en: "You", mr: "तुम्ही", gu: "તમે", ta: "நீ", te: "నీవు" },
  "manush": { hi: "मनुष्य", en: "Human", mr: "मनुष्य", gu: "માણસ", ta: "மனிதர்", te: "మనిషి" },
  
  // Family
  "baap": { hi: "बाप", en: "Father", mr: "बाप", gu: "બાપ", ta: "தந்தை", te: "తండ్రి" },
  "mai": { hi: "माई", en: "Mother", mr: "आई", gu: "માતા", ta: "தாய்", te: "తల్లి" },
  "bhai": { hi: "भाई", en: "Brother", mr: "भाऊ", gu: "ભાઈ", ta: "சகோதரர்", te: "సోదരుడు" },
  "bahan": { hi: "बहन", en: "Sister", mr: "बहीण", gu: "બહેન", ta: "சகோதரி", te: "సోదరి" },
  
  // Actions
  "jato": { hi: "जाता", en: "Goes", mr: "जातो", gu: "જાય", ta: "போகிறார்", te: "వెళ్తాడు" },
  "gelo": { hi: "गया", en: "Went", mr: "गेला", gu: "ગયો", ta: "சென்றார்", te: "వెళ్ళాడు" },
  "khato": { hi: "खाता", en: "Eats", mr: "खातो", gu: "ખાય", ta: "சாப்பிடுகிறார்", te: "తిన్నాడు" },
  "khalo": { hi: "खाया", en: "Ate", mr: "खाल्या", gu: "ખાધુ", ta: "சாப்பிட்டார்", te: "తిన్నాడు" },
  "pito": { hi: "पीता", en: "Drinks", mr: "पितो", gu: "પીય", ta: "குடிக்கிறார்", te: "తాగుతాడు" },
  "pilo": { hi: "पिया", en: "Drank", mr: "पिल्या", gu: "પીધુ", ta: "குடித்தார்", te: "తాగాడు" },
  
  // House & Place
  "ghar": { hi: "घर", en: "House", mr: "घर", gu: "ઘર", ta: "வீடு", te: "ఇల్లు" },
  "gali": { hi: "गली", en: "Street", mr: "गली", gu: "ગલી", ta: "தெரு", te: "గలీ" },
  "gram": { hi: "गांव", en: "Village", mr: "गाव", gu: "ગામ", ta: "கிராமம்", te: "గ్రామం" },
  
  // Time
  "din": { hi: "दिन", en: "Day", mr: "दिन", gu: "દિવસ", ta: "நாள்", te: "రోజు" },
  "rat": { hi: "रात", en: "Night", mr: "रात", gu: "રાત", ta: "இரவு", te: "రాత్రి" },
  "subah": { hi: "सुबह", en: "Morning", mr: "सकाळ", gu: "સવાર", ta: "காலை", te: "ఉదయం" },
  
  // Greetings
  "namaste": { hi: "नमस्ते", en: "Hello", mr: "नमस्कार", gu: "નમસ્તે", ta: "வணக்கம்", te: "నమస్కారం" },
  "shukriya": { hi: "शुक्रिया", en: "Thank you", mr: "धन्यवाद", gu: "આભાર", ta: "நன்றி", te: "ధన్యవాదాలు" },
};

// ========================================
// DOM ELEMENTS
// ========================================

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const fromLang = document.getElementById('fromLang');
const toLang = document.getElementById('toLang');
const translateBtn = document.getElementById('translateBtn');
const btnSwap = document.getElementById('btnSwap');
const btnClear = document.getElementById('btnClear');
const btnCopy = document.getElementById('btnCopy');
const themeToggle = document.getElementById('themeToggle');
const charCount = document.getElementById('charCount');
const outputCharCount = document.getElementById('outputCharCount');
const loadingIndicator = document.getElementById('loadingIndicator');
const statusMessage = document.getElementById('statusMessage');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const dictSearch = document.getElementById('dictSearch');

// ========================================
// EVENT LISTENERS
// ========================================

// Translation
translateBtn.addEventListener('click', handleTranslate);
inputText.addEventListener('keyup', () => {
  charCount.textContent = inputText.value.length;
  if (inputText.value.length > 0) {
    translateBtn.disabled = false;
  }
});

// Swap Languages
btnSwap.addEventListener('click', () => {
  const temp = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = temp;
  
  if (outputText.value) {
    inputText.value = outputText.value;
    outputText.value = '';
    charCount.textContent = inputText.value.length;
    outputCharCount.textContent = 0;
  }
});

// Clear Input
btnClear.addEventListener('click', () => {
  inputText.value = '';
  charCount.textContent = 0;
  clearStatus();
});

// Copy Output
btnCopy.addEventListener('click', () => {
  if (outputText.value) {
    navigator.clipboard.writeText(outputText.value).then(() => {
      showStatus('✅ अनुवाद कॉपी किया गया!', 'success');
    }).catch(() => {
      showStatus('❌ कॉपी करने में विफल', 'error');
    });
  }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeToggleIcon();
});

// Tab Navigation
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Remove active class from all tabs
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab
    btn.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// Dictionary Search
if (dictSearch) {
  dictSearch.addEventListener('keyup', filterDictionary);
}

// ========================================
// TRANSLATION FUNCTION
// ========================================

async function handleTranslate() {
  const text = inputText.value.trim();
  const from = fromLang.value;
  const to = toLang.value;

  if (!text) {
    showStatus('⚠️ कृपया कोई पाठ दर्ज करें', 'error');
    return;
  }

  if (from === to) {
    showStatus('⚠️ स्रोत और लक्ष्य भाषा अलग होनी चाहिए', 'error');
    return;
  }

  try {
    loadingIndicator.classList.add('active');
    translateBtn.disabled = true;
    clearStatus();

    const translated = await translateText(text, from, to);
    
    outputText.value = translated;
    outputCharCount.textContent = translated.length;
    showStatus('✅ अनुवाद पूर्ण!', 'success');
  } catch (error) {
    console.error('Translation error:', error);
    showStatus('❌ अनुवाद में त्रुटि: ' + error.message, 'error');
  } finally {
    loadingIndicator.classList.remove('active');
    translateBtn.disabled = false;
  }
}

async function translateText(text, from, to) {
  // Special handling for Banjara
  if (from === 'bnj' && to !== 'bnj') {
    let result = text;
    
    // Try to translate from Banjara using dictionary
    for (const [bnjWord, translations] of Object.entries(BANJARA_DICTIONARY)) {
      if (translations[to]) {
        const regex = new RegExp(`\\b${bnjWord}\\b`, 'gi');
        result = result.replace(regex, translations[to]);
      }
    }
    
    // If to is not Hindi, translate from Hindi to target
    if (to !== 'hi') {
      return await translateViaAPI(result, 'hi', to);
    }
    
    return result;
  }

  if (to === 'bnj' && from !== 'bnj') {
    // Translate to Hindi first if not already
    let hindiText = from === 'hi' ? text : await translateViaAPI(text, from, 'hi');
    
    // Create reverse dictionary
    const reverseDict = {};
    for (const [bnjWord, translations] of Object.entries(BANJARA_DICTIONARY)) {
      if (translations.hi) {
        reverseDict[translations.hi] = bnjWord;
      }
    }
    
    // Replace Hindi words with Banjara
    let result = hindiText;
    for (const [hiWord, bnjWord] of Object.entries(reverseDict)) {
      const regex = new RegExp(`\\b${hiWord}\\b`, 'gi');
      result = result.replace(regex, bnjWord);
    }
    
    return result;
  }

  // For other language pairs, use API
  return await translateViaAPI(text, from, to);
}

async function translateViaAPI(text, from, to) {
  try {
    const fromCode = from === 'auto' ? 'auto' : from;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromCode}|${to}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      throw new Error('Translation API error');
    }
  } catch (error) {
    console.error('API Translation error:', error);
    return text; // Return original text if translation fails
  }
}

// ========================================
// DICTIONARY FILTER
// ========================================

function filterDictionary() {
  const searchTerm = dictSearch.value.toLowerCase();
  const dictEntries = document.querySelectorAll('.dict-entry');

  dictEntries.forEach(entry => {
    const word = entry.querySelector('.dict-word').textContent.toLowerCase();
    const translation = entry.querySelector('.dict-translation').textContent.toLowerCase();

    if (word.includes(searchTerm) || translation.includes(searchTerm)) {
      entry.style.display = 'block';
    } else {
      entry.style.display = 'none';
    }
  });
}

// ========================================
// STATUS MESSAGES
// ========================================

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message active ${type}`;
  
  if (type === 'success') {
    setTimeout(clearStatus, 3000);
  }
}

function clearStatus() {
  statusMessage.textContent = '';
  statusMessage.className = 'status-message';
}

// ========================================
// THEME MANAGEMENT
// ========================================

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.title = isDark ? 'Light Mode' : 'Dark Mode';
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
  // Ctrl+Enter or Cmd+Enter to translate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    handleTranslate();
  }
  
  // Ctrl+Shift+C to clear
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    inputText.value = '';
    charCount.textContent = 0;
  }
});

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  console.log('🌍 Banjara Translator initialized successfully!');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Copy to clipboard helper
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
  }
}

// Language detection (basic)
async function detectLanguage(text) {
  // Simple detection based on script
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hi'; // Devanagari script
  }
  if (/[\u0C80-\u0CFF]/.test(text)) {
    return 'kn'; // Kannada script
  }
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return 'ta'; // Tamil script
  }
  return 'auto';
}

// Export functions for console testing
window.translatorAPI = {
  translate: translateText,
  detectLanguage: detectLanguage,
  dictionary: BANJARA_DICTIONARY
};

console.log('📖 Banjara Translator API available at window.translatorAPI');
