const { lookup } = require('fast-geoip')
const requestIp = require('request-ip')

const DEFAULT_IP = '1.0.1.0' // default CN

export default async (req, res) => {
  const clientIp = await requestIp.getClientIp(req)
  const geo = await lookup(clientIp?.replace('::1', '')?.replace('127.0.0.1', '') || DEFAULT_IP)
  await res.status(200).json({ ...geo, ip: clientIp })
}
