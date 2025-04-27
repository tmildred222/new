export default async function handler(request, context) {
  const { request: req } = context;
  const ua = req.headers.get('user-agent') || '';
  const acceptLanguage = req.headers.get('accept-language') || '';
  const country = req.cf?.country || '';

  const isGoogleBot = /(google|bing|facebook|crawler|spider|archive|preview)/i.test(ua);
  const isIPhone = /iPhone/i.test(ua);
  const isGermanLang = acceptLanguage.toLowerCase().startsWith('de');
  const isGermanCountry = country === 'DE';

  if (!isGoogleBot && isIPhone && isGermanLang && isGermanCountry) {
    return new Response(JSON.stringify({ go: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ go: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
