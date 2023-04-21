import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './Edit.scss'

import Button from '@/components/Button'
import Form from '@/components/Forms/Form'
import useApi from '@/hooks/useApi/useApi'
import { getApplicationURL } from '@/router/apiEndpoint'
import UiContext from '@/context/UiContext'

import ApplicationForm from './ApplicationForm'

const Edit = () => {
  const { uid } = useParams()
  const navigate = useNavigate()

  const { setToast } = useContext( UiContext )

  const { data, isLoading } = useApi( 'get', getApplicationURL( uid ) )

  const onSuccess = () => {
    setToast( {
      message: 'Form updated successfully',
      type: 'success',
    } )
    navigate( -1 )
  }

  if ( isLoading ) {
    return null
  }

  return (
    <div className='view-application-page'>
      <Button color='tertiary' title='Go back' onClick={ () => navigate( -1 ) } />

      <h5 className='heading'>View Application:</h5>

      <Form
        FormBody={ ApplicationForm }
        method='patch'
        endpoint={ getApplicationURL( uid ) }
        entries={ data }
        onSuccess={ onSuccess }
      />
    </div>
  )
}

export default Edit
