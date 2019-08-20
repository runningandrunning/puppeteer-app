function findCookie (ctx, hostname, cookie) {
  let cookies = cookie || ctx.get('Cookie');
  if (Array.isArray(cookies)) {
    cookies = cookies.join('; ');
  }
  const result = [];
  if (cookies) {
    const list = cookies.split('; ');
    result = list.map(item => {
      const [name, value] = item.split('=');
      return {
        name,
        value,
        domain: hostname
      }
    })
  }
  return result;
}

module.exports = findCookie;