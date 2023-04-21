/* eslint-disable sort-vars */
const base = '/api'

const loginURL = `${ base }/auth/login`,
      logoutURL = `${ base }/auth/logout`,
      signupURL = `${ base }/auth/register`,
      refreshTokenURL = `${ base }/auth/token/refresh/`,

      listApplicationsURL = `${ base }/application`,
      getApplicationURL = ( uid ) => `${ base }/application/${ uid }`,

      statusCountsURL = `${ base }/application/stats/status-counts`


export {
  loginURL,
  logoutURL,
  signupURL,
  refreshTokenURL,

  listApplicationsURL,
  getApplicationURL,

  statusCountsURL,
}
