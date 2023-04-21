import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import './ApplicationForm.scss'

import FormLabel from '@/components/Forms/Helpers/FormLabel'
import ControlledSelect from '@/components/Forms/Helpers/ControlledSelect'
import { statusChoicesList } from '@/utils/statusChoices'
import { categoryChoicesList } from '@/utils/categoryChoices'
import { ownershipChoicesList } from '@/utils/ownershipChoices'
import { govtIdChoicesList } from '@/utils/govtIdChoices'
import Button from '@/components/Button/Button'
import { parseISO } from 'date-fns'
import ReactDatePicker from 'react-datepicker'

const ApplicationForm = ( { isLoading } ) => {
  const navigate = useNavigate()

  const { register, formState, getValues } = useFormContext()

  const applicationDate = getValues( 'created' )

  return (
    <>
      <div className='application-form'>
        <FormLabel name='id_number' field='ID Number'>
          <input
            readOnly
            type='text'
            { ...register( 'id_number' ) }
            placeholder='ID Number'
          />
        </FormLabel>

        <FormLabel name='applicant_name' field='Applicant Name'>
          <input
            readOnly
            type='text'
            { ...register( 'applicant_name' ) }
            placeholder='Applicant Name'
          />
        </FormLabel>

        <FormLabel name='state' field='State' required>
          <input
            type='text'
            { ...register( 'state', { required: 'This field is required' } ) }
            placeholder='State'
            className={ formState.errors?.state && 'error' }
          />
        </FormLabel>

        <FormLabel name='district' field='District' required>
          <input
            type='text'
            { ...register( 'district', { required: 'This field is required' } ) }
            placeholder='District'
            className={ formState.errors?.district && 'error' }
          />
        </FormLabel>

        <FormLabel name='load_applied' field='Load (in KV)'>
          <input
            readOnly
            type='number'
            { ...register( 'load_applied', { max: 200 } ) }
            placeholder='Load (in KV)'
          />
        </FormLabel>

        <FormLabel name='created' field='Application Date'>
          <ReactDatePicker
            readOnly
            selected={ parseISO( applicationDate, 'yyyy-MM-dd' ) }
            dropdownMode='select'
            dateFormat='yyyy-MM-dd'
          />
        </FormLabel>

        <ControlledSelect
          readOnly
          name='govt_id_type'
          labelField='label'
          label='Govt. ID Type'
          defaultOptions={ govtIdChoicesList }
          rules={ { required: 'This field is required' } }
        />

        <ControlledSelect
          name='status'
          labelField='label'
          label='Status'
          defaultOptions={ statusChoicesList }
          rules={ { required: 'This field is required' } }
        />

        <ControlledSelect
          name='category'
          labelField='label'
          label='Category'
          defaultOptions={ categoryChoicesList }
          rules={ { required: 'This field is required' } }
        />

        <ControlledSelect
          name='ownership'
          labelField='label'
          label='Ownership'
          defaultOptions={ ownershipChoicesList }
          rules={ { required: 'This field is required' } }
        />

        <FormLabel name='comments' field='Comments'>
          <textarea
            { ...register( 'comments' ) }
            placeholder='Reviewer Comments'
            className={ formState.errors?.comments && 'error' }
          />
        </FormLabel>
      </div>

      <div className='buttons'>
        <Button
          title='Submit'
          color='primary'
          type='submit'
          isLoading={ isLoading }
        />

        <Button
          title='Cancel'
          color='tertiary'
          type='button'
          onClick={ () => navigate( -1 ) }
        />
      </div>
    </>
  )
}

export default ApplicationForm
