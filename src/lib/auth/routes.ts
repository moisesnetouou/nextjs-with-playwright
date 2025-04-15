import type { PublicRoute } from './types'

export const publicRoutes: readonly PublicRoute[] = [
  {
    path: /^\/$/,
    whenAuthenticated: 'redirect',
  },
]
