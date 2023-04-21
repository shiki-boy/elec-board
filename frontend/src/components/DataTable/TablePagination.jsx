import React from 'react'
import classNames from 'classnames'

import './TablePagination.scss'

import {
  NextPageIcon,
  PreviousPageIcon,
  FirstPageIcon,
  LastPageIcon,
} from '../../assets/icons'

import Icon from '../Icon'
import { PAGE_LIMIT } from '@/utils/constants'

const TablePagination = ( {
  total,
  hasNext,
  hasPrevious,
  nextPage,
  previousPage,
  activePage,
  changePage,
} ) => {
  const range = ( start, end ) => {
    const length = end - start

    return Array.from( { length }, ( _, i ) => start + i )
  }

  const getPageNumbers = () => {
    const totalPages = Math.ceil( total / PAGE_LIMIT )

    const leftside = range( Math.max( 1, activePage - 4 ), activePage )
    const rightside = range( activePage, Math.min( totalPages + 1, activePage + 4 ) )

    const leftdots = 1 < activePage - 4 ? [ '...' ] : []
    const rightdots = activePage + 4 < totalPages + 1 ? [ '...' ] : []

    return [ ...leftdots, ...leftside, ...rightside, ...rightdots ]

  }

  return(
    <div className='table-pagination-container'>
      {0 < total && (
        <p>
          {activePage * PAGE_LIMIT - PAGE_LIMIT + 1} -{' '}
          {Math.min( activePage * PAGE_LIMIT, total )} of {total}
        </p>
      )}

      <div className='spacer' />

      <button
        className='custom pagination-btn'
        onClick={ () => changePage( 1 ) }
        disabled={ !hasPrevious }
        type='button'
      >
        <Icon IconComponent={ FirstPageIcon } className='primary md' />
      </button>

      <button
        className='custom pagination-btn'
        disabled={ !hasPrevious }
        onClick={ previousPage }
        type='button'
      >
        <Icon IconComponent={ PreviousPageIcon } className='primary md' />
      </button>

      <div
        className={ classNames( {
          'more-than-10': 10 < Math.ceil( total / PAGE_LIMIT ),
          'page-numbers': true,
        } ) }
      >
        {getPageNumbers().map( ( pageNumber ) => (
          <div
            key={ `pagination-${ pageNumber }` }
            className={ classNames( {
              active: activePage === pageNumber,
              dots: '...' === pageNumber,
              'page-button': true,
            } ) }
            onClick={ () => changePage( pageNumber ) }
          >
            {pageNumber}
          </div>
        ) )}
      </div>

      <button
        className='custom pagination-btn'
        disabled={ !hasNext }
        onClick={ nextPage }
        type='button'
      >
        <Icon IconComponent={ NextPageIcon } className='primary md' />
      </button>

      <button
        className='custom pagination-btn'
        onClick={ () => changePage( Math.ceil( total / PAGE_LIMIT ) ) }
        disabled={ !hasNext }
        type='button'
      >
        <Icon IconComponent={ LastPageIcon } className='primary md' />
      </button>
    </div>
  )
}

export default TablePagination
