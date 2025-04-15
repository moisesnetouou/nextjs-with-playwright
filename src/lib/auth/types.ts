export type PublicRoute = {
  path: RegExp
  whenAuthenticated: 'redirect' | 'next'
}
