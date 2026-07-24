// ═══════════════════════════════════════════════════════════
// Arabic Console Utility - تشكيل وعكس النصوص العربية للطرفية
// يحل مشكلة تقطع وعكس الحروف العربية في Termux/Console
// ═══════════════════════════════════════════════════════════

// ─── جدول أشكال الحروف العربية (Isolated, Final, Medial, Initial) ───
const ARABIC_SHAPES = {
  // حرف        Isolated    Final       Medial      Initial
  'ء': ['\uFE80', '\uFE80', '\uFE80', '\uFE80'],
  'آ': ['\uFE81', '\uFE82', '\uFE82', '\uFE82'],
  'أ': ['\uFE83', '\uFE84', '\uFE84', '\uFE84'],
  'ؤ': ['\uFE85', '\uFE86', '\uFE86', '\uFE86'],
  'إ': ['\uFE87', '\uFE88', '\uFE88', '\uFE88'],
  'ئ': ['\uFE89', '\uFE8A', '\uFE8B', '\uFE8C'],
  'ا': ['\uFE8D', '\uFE8E', '\uFE8E', '\uFE8E'],
  'ب': ['\uFE8F', '\uFE90', '\uFE92', '\uFE91'],
  'ة': ['\uFE93', '\uFE94', '\uFE94', '\uFE94'],
  'ت': ['\uFE95', '\uFE96', '\uFE98', '\uFE97'],
  'ث': ['\uFE99', '\uFE9A', '\uFE9C', '\uFE9B'],
  'ج': ['\uFE9D', '\uFE9E', '\uFEA0', '\uFE9F'],
  'ح': ['\uFEA1', '\uFEA2', '\uFEA4', '\uFEA3'],
  'خ': ['\uFEA5', '\uFEA6', '\uFEA8', '\uFEA7'],
  'د': ['\uFEA9', '\uFEAA', '\uFEAA', '\uFEAA'],
  'ذ': ['\uFEAB', '\uFEAC', '\uFEAC', '\uFEAC'],
  'ر': ['\uFEAD', '\uFEAE', '\uFEAE', '\uFEAE'],
  'ز': ['\uFEAF', '\uFEB0', '\uFEB0', '\uFEB0'],
  'س': ['\uFEB1', '\uFEB2', '\uFEB4', '\uFEB3'],
  'ش': ['\uFEB5', '\uFEB6', '\uFEB8', '\uFEB7'],
  'ص': ['\uFEB9', '\uFEBA', '\uFEBC', '\uFEBB'],
  'ض': ['\uFEBD', '\uFEBE', '\uFEC0', '\uFEBF'],
  'ط': ['\uFEC1', '\uFEC2', '\uFEC4', '\uFEC3'],
  'ظ': ['\uFEC5', '\uFEC6', '\uFEC8', '\uFEC7'],
  'ع': ['\uFEC9', '\uFECA', '\uFECC', '\uFECB'],
  'غ': ['\uFECD', '\uFECE', '\uFED0', '\uFECF'],
  'ف': ['\uFED1', '\uFED2', '\uFED4', '\uFED3'],
  'ق': ['\uFED5', '\uFED6', '\uFED8', '\uFED7'],
  'ك': ['\uFED9', '\uFEDA', '\uFEDC', '\uFEDB'],
  'ل': ['\uFEDD', '\uFEDE', '\uFEE0', '\uFEDF'],
  'م': ['\uFEE1', '\uFEE2', '\uFEE4', '\uFEE3'],
  'ن': ['\uFEE5', '\uFEE6', '\uFEE8', '\uFEE7'],
  'ه': ['\uFEE9', '\uFEEA', '\uFEEC', '\uFEEB'],
  'و': ['\uFEED', '\uFEEE', '\uFEEE', '\uFEEE'],
  'ى': ['\uFEEF', '\uFEF0', '\uFEF0', '\uFEF0'],
  'ي': ['\uFEF1', '\uFEF2', '\uFEF4', '\uFEF3'],
  // لا + لم + لأ
  'لآ': ['\uFEF5', '\uFEF6', '\uFEF6', '\uFEF6'],
  'لأ': ['\uFEF7', '\uFEF8', '\uFEF8', '\uFEF8'],
  'لإ': ['\uFEF9', '\uFEFA', '\uFEFA', '\uFEFA'],
  'لا': ['\uFEFB', '\uFEFC', '\uFEFC', '\uFEFC'],
  // Persian/Arabic additions
  'پ': ['\uFB56', '\uFB57', '\uFB59', '\uFB58'],
  'چ': ['\uFB7A', '\uFB7B', '\uFB7D', '\uFB7C'],
  'ژ': ['\uFB8A', '\uFB8B', '\uFB8B', '\uFB8B'],
  'ک': ['\uFB8E', '\uFB8F', '\uFB91', '\uFB90'],
  'گ': ['\uFB92', '\uFB93', '\uFB95', '\uFB94'],
  'ی': ['\uFBFC', '\uFBFD', '\uFBFF', '\uFBFE'],
};

// حروف لا تتصل بما بعدها
const RIGHT_JOINING = new Set(['ء','آ','أ','ؤ','إ','ئ','ا','ة','د','ذ','ر','ز','و','ى','ژ','ی']);

// حروف عربية (للتحقق)
const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * تحديد نوع اتصال الحرف
 * 0=isolated, 1=final, 2=medial, 3=initial
 */
function getCharType(prevArabic, nextArabic) {
  if (!prevArabic && !nextArabic) return 0; // isolated
  if (!prevArabic && nextArabic)  return 3; // initial
  if (prevArabic && !nextArabic)  return 1; // final
  return 2; // medial
}

/**
 * تشكيل النص العربي - تحويل الحروف المنفصلة إلى متصلة
 */
export function reshapeArabic(text) {
  if (!text || !ARABIC_RANGE.test(text)) return text;
  
  const chars = [...text];
  const result = [];
  
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    
    // التحقق من ligatures (لا، لأ، لإ، لآ)
    if (i + 1 < chars.length) {
      const lig = ch + chars[i + 1];
      if (ARABIC_SHAPES[lig]) {
        const prevArabic = i > 0 && ARABIC_RANGE.test(chars[i - 1]) && !RIGHT_JOINING.has(chars[i - 1]);
        const nextArabic = i + 2 < chars.length && ARABIC_RANGE.test(chars[i + 2]);
        const type = getCharType(prevArabic, nextArabic);
        result.push(ARABIC_SHAPES[lig][type]);
        i++; // skip next char
        continue;
      }
    }
    
    if (ARABIC_SHAPES[ch]) {
      const prevArabic = i > 0 && ARABIC_RANGE.test(chars[i - 1]) && !RIGHT_JOINING.has(chars[i - 1]);
      const nextArabic = i + 1 < chars.length && ARABIC_RANGE.test(chars[i + 1]);
      // إذا كان الحرف من النوع الذي لا يتصل بما بعده، فالحرف التالي لا يمكنه الاتصال
      const effectiveNext = RIGHT_JOINING.has(ch) ? false : nextArabic;
      const effectivePrev = i > 0 && RIGHT_JOINING.has(chars[i - 1]) ? false : prevArabic;
      const type = getCharType(effectivePrev, effectiveNext);
      result.push(ARABIC_SHAPES[ch][type]);
    } else {
      result.push(ch);
    }
  }
  
  return result.join('');
}

/**
 * تطبيق اتجاه RTL مع Bidi باستخدام أحرف التحكم Unicode
 */
export function applyRTL(text) {
  if (!text) return text;
  // RLE (Right-to-Left Embedding) + text + PDF (Pop Directional Formatting)
  // + RLM (Right-to-Left Mark) في النهاية لتثبيت الاتجاه
  return '\u202B' + text + '\u202C\u200F';
}

/**
 * طباعة نص عربي مشكّل في الطرفية
 */
export function logAr(...args) {
  const shaped = args.map(arg => {
    if (typeof arg === 'string') {
      return applyRTL(reshapeArabic(arg));
    }
    return arg;
  });
  console.log(...shaped);
}

/**
 * تغليف console.log الأصلي لضبط اتجاه النصوص العربية تلقائياً
 * نستخدم RLE فقط لأن الطرفيات الحديثة تشكّل الحروف تلقائياً
 */
export function patchConsole() {
  const originalLog = console.log;
  console.log = function(...args) {
    const shaped = args.map(arg => {
      if (typeof arg === 'string' && ARABIC_RANGE.test(arg)) {
        // RLE يجعل النص يُقرأ من اليمين لليسار
        // PDF ينهي التضمين + RLM يثبت الاتجاه
        return '‫' + arg + '‬‏';
      }
      return arg;
    });
    originalLog(...shaped);
  };
}

export default { reshapeArabic, applyRTL, logAr, patchConsole };
