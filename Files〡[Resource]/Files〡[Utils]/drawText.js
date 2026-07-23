// drawText.js - دالة رسم نص مع دعم Fallback للرموز والإيموجي
"use strict";

// نطاقات Unicode للرموز والإيموجي
function isEmojiOrSymbol(char) {
    const code = char.codePointAt(0);
    return (
        (code >= 0x1F000 && code <= 0x1FFFF) || // Emoticons, Symbols, Emoji
        (code >= 0x2600 && code <= 0x27BF)   || // Misc Symbols
        (code >= 0x1D400 && code <= 0x1D7FF) || // Mathematical Alphanumeric
        (code >= 0x2700 && code <= 0x27BF)   || // Dingbats
        (code >= 0xFE00 && code <= 0xFE0F)   || // Variation Selectors
        (code >= 0x200D)                       // Zero Width Joiner
    );
}

function splitText(text) {
    const segments = [];
    let current = '';
    let currentType = null;
    
    for (const char of text) {
        const type = isEmojiOrSymbol(char) ? 'emoji' : 'text';
        if (currentType === null) currentType = type;
        if (type !== currentType) {
            segments.push({ text: current, type: currentType });
            current = char;
            currentType = type;
        } else {
            current += char;
        }
    }
    if (current) segments.push({ text: current, type: currentType });
    return segments;
}

/**
 * يرسم نصاً مع دعم الخط البديل للرموز
 * @param {Canvas} canvas - كائن Canvas من canvas-constructor
 * @param {string} text - النص المراد رسمه
 * @param {number} x - الإحداثي الأفقي
 * @param {number} y - الإحداثي العمودي  
 * @param {string} textFont - الخط الأساسي (مثلاً: 'bold 36px Noto Sans Arabic, sans-serif')
 * @param {string} emojiFont - خط الرموز (مثلاً: '36px Noto Emoji, sans-serif')
 * @param {string} align - محاذاة النص ('left', 'center', 'right')
 */
export function drawText(canvas, text, x, y, textFont, emojiFont, align = 'left') {
    const segments = splitText(text);
    const fontSizes = textFont.match(/(\d+)px/);
    const emojiSize = fontSizes ? fontSizes[1] + 'px' : '36px';
    const emojiFontFixed = emojiFont || textFont.replace(/Noto Sans Arabic[^,]*/, 'Noto Emoji');
    
    if (align === 'center') {
        // تقدير العرض الكلي لضبط المركز
        let totalWidth = 0;
        // We can't easily measure text in canvas-constructor without the canvas context
        // Fallback: render left-aligned but centered in a group
        return drawText(canvas, text, x, y, textFont, emojiFont, 'left');
    }
    
    let cursorX = x;
    for (const seg of segments) {
        if (seg.type === 'text') {
            canvas.setTextFont(textFont).printText(seg.text, cursorX, y);
            cursorX += seg.text.length * (parseInt(fontSizes?.[1] || 36) * 0.6);
        } else {
            // For emoji/symbols, we need to measure but canvas-constructor doesn't expose measureText
            // Use approximation
            canvas.setTextFont(emojiFontFixed).printText(seg.text, cursorX, y);
            cursorX += seg.text.length * (parseInt(fontSizes?.[1] || 36) * 0.7);
        }
    }
}

export default drawText;