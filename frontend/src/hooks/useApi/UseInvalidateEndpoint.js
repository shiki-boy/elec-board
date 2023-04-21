import { useQueryClient } from 'react-query'

const UseInvalidateEndpoint = () => {
  const queryClient = useQueryClient()

  return ( endpoint ) => {
    queryClient.invalidateQueries( endpoint, {
      refetchActive: true,
      refetchInactive: true,
    } )
    queryClient.refetchQueries( [ endpoint ] )
  }
}

export default UseInvalidateEndpoint
