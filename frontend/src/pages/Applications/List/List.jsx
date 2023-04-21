import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, parse } from 'date-fns'
import ReactDatePicker from 'react-datepicker'

import './List.scss'

import DataTable from '@/components/DataTable'
import { listApplicationsURL } from '@/router/apiEndpoint'
import categoryChoices, { categoryChoicesList } from '@/utils/categoryChoices'
import dateFormatter from '@/utils/dateFormatter'
import statusChoices, { statusChoicesList } from '@/utils/statusChoices'

import routes from '../routes'
import FormLabel from '@/components/Forms/Helpers/FormLabel/FormLabel'
import Select from '@/components/Forms/Helpers/Select/Select'
import { debounce } from 'lodash'

const List = () => {
  const navigate = useNavigate()

  const [ filters, setFilters ] = useState( {} )
  const [ searchFilter, setSearchFilter ] = useState( '' )
  const searchId = useRef( '' )

  const _createdDateFrom = filters?.created__gte ?? null
  const _createdDateTo = filters?.created__lte ?? null

  const columns = [
    { key: 'id_number' },
    {
      isSortable: true,
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
      isSortable: true,
      key: 'created',
    },
    {
      extractData: dateFormatter,
      isSortable: true,
      key: 'modified',
    },
  ]

  const viewRow = ( row ) => {
    navigate( routes.edit.getNavigatePath( row.uid ) )
  }

  const handleSelect = ( option, key ) => {
    setFilters( ( old ) => ( {
      ...old,
      [key]: option.value,
    } ) )
  }

  const handleClear = ( key ) => {
    setFilters( ( old ) => {
      // eslint-disable-next-line no-unused-vars
      const _copy = { ...old }

      delete _copy[key]
      return _copy
    } )
  }

  const handleDateChange = ( val, key ) => {
    if ( !val ) {
      handleClear( key )
      return
    }

    setFilters( ( old ) => ( {
      ...old,
      [key]: format( val, 'yyyy-MM-dd' ),
    } ) )
  }

  const handleSearch = ( val ) => {
    searchId.current = val
    debounceFn( val )
  }

  const handleDebounceFn = ( val ) => {
    setSearchFilter( val )
  }
  const debounceFn = useCallback( debounce( handleDebounceFn, 500 ), [] )

  return (
    <div className='applications-list-page'>
      <h5>Filter by:</h5>

      <div className='filters'>
        <Select
          name='status'
          defaultOptions={ statusChoicesList }
          label='Status'
          labelField='label'
          valueField='value'
          onSelect={ ( option ) => handleSelect( option, 'status' ) }
          onClear={ () => handleClear( 'status' ) }
          placeholder='Filter by status'
        />

        <Select
          name='category'
          defaultOptions={ categoryChoicesList }
          label='Category'
          labelField='label'
          valueField='value'
          onSelect={ ( option ) => handleSelect( option, 'category' ) }
          onClear={ () => handleClear( 'category' ) }
          placeholder='Filter by cateogry'
        />

        <FormLabel name='date_from' field='Created Date From'>
          <ReactDatePicker
            selected={
              _createdDateFrom
                ? parse( _createdDateFrom, 'yyyy-MM-dd', new Date() )
                : null
            }
            todayButton='Today'
            onChange={ ( val ) => handleDateChange( val, 'created__gte' ) }
            isClearable={ true }
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
            placeholderText='Date From'
            dateFormat='yyyy-MM-dd'
          />
        </FormLabel>

        <FormLabel name='date_to' field='Created Date To'>
          <ReactDatePicker
            selected={
              _createdDateTo
                ? parse( _createdDateTo, 'yyyy-MM-dd', new Date() )
                : null
            }
            todayButton='Today'
            onChange={ ( val ) => handleDateChange( val, 'created__lte' ) }
            isClearable={ true }
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
            placeholderText='Date To'
            dateFormat='yyyy-MM-dd'
          />
        </FormLabel>

        <FormLabel name='search' field='Search ID Number' required>
          <input
            type='search'
            onChange={ ( e ) => handleSearch( e.target.value ) }
            placeholder='Search'
          />
        </FormLabel>
      </div>

      <h5>
        Connection Applications:
        <br />
        <span className='subtext'>*Double click to view application</span>
      </h5>

      <DataTable
        endpoint={ listApplicationsURL }
        columns={ columns }
        overflowTable
        onDoubleClickRow={ viewRow }
        defaultSorting='-modified'
        filters={ {
          ...filters,
          search: searchFilter,
        } }
      />
    </div>
  )
}

export default List
