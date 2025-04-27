export default async function handler(request, response) {
  const ua = request.headers['user-agent'] || '';
  const cf = request.headers['x-vercel-forwarded-for'] || ''; // В Vercel IP передаётся по-другому
  const country = request.headers['x-vercel-ip-country'] || '';

  const isBotUA = /(google|facebook|twitter|bing|bot|crawler|spider|archive|search|preview)/i.test(ua);

  if (isBotUA || !ua) {
    return response.status(200).json({ status: "bot" });
  }

  // Ограничиваем только Германией (DE)
  if (country && country !== 'DE') {
    return response.status(200).json({ status: "bot" });
  }

  return response.status(200).json({ status: "ok" });
}
