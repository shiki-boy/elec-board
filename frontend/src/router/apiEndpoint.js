/* eslint-disable sort-vars */
const base = '/api'

const loginURL = `${ base }/auth/login`,
      logoutURL = `${ base }/auth/logout`,
      signupURL = `${ base }/auth/register`,
      refreshTokenURL = `${ base }/auth/token/refresh/`,
      forgotPasswordURL = `${ base }/auth/password/reset`,
      resetPasswordURL = `${ base }/auth/password/reset/confirm`,
      changePasswordURL = `${ base }/auth/password/change`,

      listApplicationsURL = `${ base }/application`,
      getApplicationURL = ( uid ) => `${ base }/application/${ uid }`,

      statusCountsURL = `${ base }/application/stats/status-counts`


export {
  loginURL,
  logoutURL,
  signupURL,
  refreshTokenURL,
  forgotPasswordURL,
  resetPasswordURL,
  changePasswordURL,

  listApplicationsURL,
  getApplicationURL,

  statusCountsURL,
}
