import React from 'react'

const TableLoading = ( { numColumns } ) => {
  const rows = []
  const columns = []

  for ( let i = 0; i < numColumns; i++ ) {
    columns.push( Math.random() )
  }
  for ( let i = 0; 10 > i; i++ ) {
    rows.push( i )
  }

  return (
    <>
      {rows.map( ( i ) => (
        <tr key={ i } className='loading-placeholder'>
          {columns.map( ( j ) => (
            <td key={ j * ( i + 1 ) }>
              <div className='shimmer' />
            </td>
          ) )}
        </tr>
      ) )}
    </>
  )
}

export default TableLoading
