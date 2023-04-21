import useDynamicRoutes from '@/router/useDynamicRoutes'

import List from './List'
import Routes from './routes'
import Edit from './Edit'

const Applications = () => {
  const routesConf = [
    {
      Element: List,
      path: '',
    },
    {
      Element: Edit,
      path: Routes.edit.path,
    },
  ]

  const routes = useDynamicRoutes( routesConf )

  return routes
}

export default Applications
