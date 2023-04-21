/* eslint-disable no-unused-vars */
import { useState, Fragment } from 'react'
import { capitalize } from 'lodash'
import classNames from 'classnames'

import './TableGrid.scss'

import useApi from '@/hooks/useApi'
import TablePagination from '../DataTable/TablePagination'
import { PAGE_LIMIT } from '@/utils/constants'
import Checkbox from '../Checkbox'

const TableGrid = ( {
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
  TableInfo = () => {}, // any component
} ) => {
  // const [ sorting, setSorting ] = useState( defaultSorting )
  const [ page, setPage ] = useState( 1 )

  const { data, isSuccess, isError, isLoading, isFetching, error } = useApi(
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

  const getColumnWidths = () => ( {
    gridTemplateColumns: columns
      .filter( ( { isSpecialContent } ) => !isSpecialContent )
      .map( ( { width } ) => `${ width ?? 1 }fr` )
      .concat(
        Actions
          ? ` ${
            columns[0].width
              ? 1 - columns.reduce( ( acc, el ) => acc + el.width, 0 )
              : '1'
          }fr`
          : '',
      )
      .join( ' ' ),
  } )

  return (
    <div className='table-grid'>
      <TableInfo />

      <div className='table-headers' style={ getColumnWidths() }>
        {columns
          .filter( ( { isSpecialContent } ) => !isSpecialContent )
          .map( ( { title, key }, index ) => (
            <div className='th' key={ key + index }>
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
            </div>
          ) )}
        {Actions && <div className='th'>Actions</div>}
      </div>

      <div className='table-body'>
        {isError && (
          <p
            style={ {
              fontSize: '1.2rem',
              textAlign: 'center',
            } }
          >
            {errorMessage}
            <br />
            {import.meta.env.VITE_SHOW_ERRORS && error.data}
          </p>
        )}

        <div className='table-row' style={ getColumnWidths() }>
          {isLoading || isFetching ? (
            <p>Loading...</p>
          ) : (
            // <TableLoading
            //   numColumns={
            //     columns.length + ( Actions ? 1 : 0 ) + ( withCheckboxes ? 1 : 0 )
            //   }
            // />
            getData().map( ( row, index ) => (
              <Fragment key={ `row_${ index }` }>
                {withCheckboxes && (
                  <div
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
                  </div>
                )}

                {columns.map( ( col, index ) => (
                  <div
                    className='td'
                    key={ `${ row[col.key] }_${ index }` }
                    style={ {
                      gridColumn:
                        col?.isSpecialContent && `span ${ columns.length }`,
                      marginLeft: 0 === index % columns.length ? '-20px' : '0',
                      marginRight: 0,
                      // 0 === index % ( columns.length - 1 ) ? '-20px' : '0',
                      paddingLeft: 0 === index % columns.length ? '20px' : '0',
                    } }
                  >
                    {getValue( col, row )}
                  </div>
                ) )}

                {Actions && (
                  <div className='td'>{getValue( 'actions', row )}</div>
                )}
              </Fragment>
            ) )
          )}
        </div>

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
    </div>
  )
}

export default TableGrid

const RadioButton = ( { checked, handleClick } ) => (
  <label className='radio-btn-container'>
    <input type='radio' checked={ checked } onChange={ handleClick } />
    <span className='checkmark'></span>
  </label>
)
