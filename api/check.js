export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLang = req.headers['accept-language'] || '';

  const isBot = /google|bot|crawler|spider|preview|adsbot|mediapartners/i.test(userAgent);
  const isNotGerman = !acceptLang.toLowerCase().includes('de');

  if (isBot || isNotGerman) {
    return res.status(403).send('Forbidden');
  }

  res.status(200).json({ status: "ok" });
}
