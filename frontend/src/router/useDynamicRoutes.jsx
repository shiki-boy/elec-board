import { useRoutes } from 'react-router-dom'

const useDynamicRoutes = ( routesConf ) => {
  const routes = routesConf.map( ( { Element, path } ) => ( {
    element: <Element />,
    path,
  } ) )

  const element = useRoutes( [
    {
      children: routes,
      path: '',
    },
  ] )

  return element
}

export default useDynamicRoutes
