const geoip = require('geoip-country')
const requestIp = require('request-ip')

export default (req, res) => {
  const clientIp = requestIp.getClientIp(req).replace('::1', '').replace('127.0.0.1', '')
  console.log(clientIp)
  const geo = geoip.lookup(clientIp)
  res.status(200).json({ country: geo.country.country, ip: clientIp })
}
