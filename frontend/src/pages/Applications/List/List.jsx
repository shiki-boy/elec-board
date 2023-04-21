import { useNavigate } from 'react-router-dom'

import DataTable from '@/components/DataTable'
import { listApplicationsURL } from '@/router/apiEndpoint'
import categoryChoices from '@/utils/categoryChoices'
import dateFormatter from '@/utils/dateFormatter'
import statusChoices from '@/utils/statusChoices'

import routes from '../routes'

const List = () => {
  const navigate = useNavigate()

  const columns = [
    { key: 'id_number' },
    {
      key: 'load_applied',
      title: 'Load Applied (in KV)',
    },
    { key: 'state' },
    { key: 'district' },
    {
      extractData: ( val ) => statusChoices[val],
      key: 'status',
    },
    {
      extractData: ( val ) => categoryChoices[val],
      key: 'category',
    },
    {
      extractData: dateFormatter,
      key: 'created',
    },
    {
      extractData: dateFormatter,
      key: 'modified',
    },
  ]

  const viewRow = ( row ) => {
    navigate( routes.edit.getNavigatePath( row.uid ) )
  }

  return (
    <>
      <DataTable
        endpoint={ listApplicationsURL }
        columns={ columns }
        overflowTable
        onDoubleClickRow={ viewRow }
      />
    </>
  )
}

export default List
