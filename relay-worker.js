// ═══════════════════════════════════════════════════
// Cloudflare Worker - Relay AI API للالتفاف على حظر Railway
// انشر هذا الملف على Cloudflare Workers (مجاني)
// ═══════════════════════════════════════════════════

export default {
  async fetch(request) {
    // السماح فقط بـ POST
    if (request.method !== 'POST') {
      return new Response('OK - AI Relay Active', { status: 200 });
    }

    const url = new URL(request.url);
    const target = url.pathname.slice(1); // إزالة الـ / الأولى

    // الأهداف المسموحة
    if (target === 'groq') {
      const key = request.headers.get('X-Auth-Key') || '';
      const body = await request.text();
      
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key
        },
        body
      });
      
      return new Response(await res.text(), {
        status: res.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (target === 'gemini') {
      const key = request.headers.get('X-Auth-Key') || '';
      const body = await request.text();
      
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        }
      );
      
      return new Response(await res.text(), {
        status: res.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response('Unknown target', { status: 400 });
  }
};
