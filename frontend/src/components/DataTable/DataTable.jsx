/* eslint-disable sort-keys */
import React, { useState } from 'react'
import { capitalize } from 'lodash'
import classNames from 'classnames'

import './DataTable.scss'

import useApi from '../../hooks/useApi'

import Checkbox from '../Checkbox'
import TableLoading from './TableLoading'
import TablePagination from './TablePagination'
import { PAGE_LIMIT } from '@/utils/constants'

const DataTable = ( {
  columns,
  endpoint = '/',
  // defaultSorting = '',
  filters = {},
  rows, // for testing, will be removed when the backend APIs are connected
  withCheckboxes = false,
  Actions = null, // ( { row } ) => {}, Component
  overflowTable = false,
  showSelectAll = true,
  formatRows = ( row ) => row,
  errorMessage = 'An error occurred',
  onDoubleClickRow = ( row ) => row,
} ) => {
  // const [ sorting, setSorting ] = useState( defaultSorting )
  const [ page, setPage ] = useState( 1 )

  const { data, isSuccess, isError, isLoading, isFetching } = useApi(
    'getList',
    endpoint,
    {
      ...filters,
      limit: PAGE_LIMIT,
      page,
    },
    {
      enabled: '/' !== endpoint,
      retry: 1,
    },
  )

  const getValue = ( col, row ) => {
    if ( col.extractData ) {
      return col.extractData( row[col.key], row )
    }
    if ( 'actions' === col ) {
      return <Actions row={ row } />
    }
    return row[col.key]
  }

  const makeTitle = ( name, title ) =>
    title
    ?? name
      .split( '_' )
      .map( ( chunk ) => capitalize( chunk ) )
      .join( ' ' )

  const getData = () => {
    if ( '/' === endpoint ) return rows?.results ?? rows

    return formatRows( isSuccess ? data?.results : [] )
  }

  return (
    <div
      className={ `data-table-container ${ overflowTable && 'overflow-table' }` }
    >
      <table className='data-table'>
        {false !== withCheckboxes && (
          <colgroup>
            <col width='20px' />
          </colgroup>
        )}

        <thead>
          <tr>
            {withCheckboxes && (
              <th
                className={ classNames( {
                  'checkbox-th': true,
                  'make-inline': showSelectAll,
                } ) }
              >
                {showSelectAll && (
                  <>
                    <Checkbox
                      name='selectAll'
                      checked={
                        withCheckboxes.selectedRows.length === rows?.length
                      }
                      small={ true }
                      onChange={ () => withCheckboxes.selectAll( rows ) }
                      label=''
                    />
                    Select All
                  </>
                )}
              </th>
            )}

            {columns.map( ( { title, key }, index ) => (
              <th key={ key + index }>
                {title ?? makeTitle( key )}
                {/* <Icon
                  IconComponent={ SortIcon }
                  className={ classNames( {
                    desc: sorting === `-${ key }`,
                    primary: true,
                    show:
                      !!sorting && ( sorting === key || `-${ key }` === sorting ),
                    md: true,
                  } ) }
                /> */}
              </th>
            ) )}

            {Actions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {isError && <p style={ {
            textAlign: 'center',
            fontSize: '1.2rem',
          } }>{errorMessage}</p>}

          {isLoading || isFetching ? (
            <TableLoading
              numColumns={
                columns.length + ( Actions ? 1 : 0 ) + ( withCheckboxes ? 1 : 0 )
              }
            />
          ) : (
            getData().map( ( row, index ) => (
              <tr key={ `row_${ index }` } onDoubleClick={ () => onDoubleClickRow( row ) }>
                {withCheckboxes && (
                  <td
                    className={ classNames( {
                      'checkbox-td': !withCheckboxes.allowOnlyOneSelect,
                      'radiobutton-td': withCheckboxes.allowOnlyOneSelect,
                    } ) }
                  >
                    {withCheckboxes.allowOnlyOneSelect ? (
                      <RadioButton
                        checked={
                          withCheckboxes.isCheckboxSelected( row ) ?? false
                        }
                        handleClick={ () =>
                          withCheckboxes.toggleCheckbox( row, index )
                        }
                      />
                    ) : (
                      <Checkbox
                        small={ true }
                        checked={
                          withCheckboxes.isCheckboxSelected( row ) ?? false
                        }
                        onChange={ () =>
                          withCheckboxes.toggleCheckbox( row, index )
                        }
                        label=''
                      />
                    )}
                  </td>
                )}

                {columns.map( ( col, index ) => (
                  <td key={ `${ row[col.key] }_${ index }` }>{getValue( col, row )}</td>
                ) )}

                {Actions && <td>{getValue( 'actions', row )}</td>}
              </tr>
            ) )
          )}
        </tbody>
      </table>

      {'/' !== endpoint && isSuccess && (
        <TablePagination
          total={ data.count }
          currentPageTotal={ data.results.length }
          hasNext={ data.next }
          hasPrevious={ data.previous }
          nextPage={ () => setPage( page + 1 ) }
          previousPage={ () => setPage( page - 1 ) }
          activePage={ page }
          changePage={ ( val ) => setPage( val ) }
        />
      )}
    </div>
  )
}

export default DataTable

/*
columns: [
  {
    key: string
    title?: string  ( default will make title from key)
    extractData: ( obj ) => { ... }   ( obj is make from [key] )
  },
]
endpoint: string
*/

const RadioButton = ( { checked, handleClick } ) => (
  <label className='radio-btn-container'>
    <input type='radio' checked={ checked } onChange={ handleClick } />
    <span className='checkmark'></span>
  </label>
)
