const geoip = require('geoip-lite')
const requestIp = require('request-ip')

const DEFAULT_IP = '1.0.1.0' // default CN

export default (req, res) => {
  const clientIp = requestIp.getClientIp(req)
  const geo = geoip.lookup(clientIp)
  res.status(200).json({ ...geo, ip: clientIp })
}
