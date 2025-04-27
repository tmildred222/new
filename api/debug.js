export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLang = req.headers['accept-language'] || '';
  const country = req.headers['x-vercel-ip-country'] || '';
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '';
  
  return res.status(200).json({
    userAgent,
    acceptLang,
    country,
    ip,
    allHeaders: req.headers
  });
}
