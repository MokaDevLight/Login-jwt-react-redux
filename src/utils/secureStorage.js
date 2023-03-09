// @flow

export const tokenType = {
  JWT: 'JWT',
  REFRESH: 'REFRESH',
  CONTINUE: 'CONTINUE',
  UUID: 'UUID',
  MENU: 'MENU'
}
const SecureStorage = {
  setToken: async (tokenName: string, token: string) => {
    await localStorage.setItem(tokenName, token)
  },
  getToken: async (tokenName: string) => await localStorage.getItem(tokenName),
  clearToken: async (_tokenType: string) => {
    await localStorage.removeItem(_tokenType)
  },
  clearTokens: async () => {
    await localStorage.removeItem(tokenType.REFRESH)
    await localStorage.removeItem(tokenType.CONTINUE)
    await localStorage.removeItem(tokenType.JWT)
  }
}

export default SecureStorage
