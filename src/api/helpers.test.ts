import { url } from "./helpers"

describe('api helpers', () => {
  describe('url function', () => {
    it('should create a valid url', () => {
      expect(url('endpoint', '/base')).toBe('/base/endpoint')
      expect(url('endpoint', 'base')).toBe('base/endpoint')
      expect(url('/endpoint', '/base')).toBe('/base/endpoint')
      expect(url('/directory/endpoint', '/base')).toBe('/base/directory/endpoint')
    })
  })
})