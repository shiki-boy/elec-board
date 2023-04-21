import { useState } from 'react'
import { Pie, PieChart, Tooltip } from 'recharts'

import useApi from '@/hooks/useApi/useApi'
import { statusCountsURL } from '@/router/apiEndpoint'
import statusChoices from '@/utils/statusChoices'
import FormLabel from '@/components/Forms/Helpers/FormLabel/FormLabel'
import ReactDatePicker from 'react-datepicker'

const StatusCounts = () => {
  const [ year, setYear ] = useState( new Date() )

  const { data, isLoading } = useApi( 'getList', statusCountsURL, { year: year.getFullYear() } )

  const getFormattedData = () => {
    if ( !data ) return []

    return data.map( ( d ) => ( {
      ...d,
      name: statusChoices[d.status],
    } ) )
  }

  if ( isLoading ) {
    return null
  }

  console.log( getFormattedData() )

  return (
    <>
      <h5>Status counts by year: {year.getFullYear()}</h5>

      <div className='filters'>
        <FormLabel name='year' field='In the Year'>
          <ReactDatePicker
            selected={ year }
            onChange={ ( date ) => setYear( date ) }
            showYearPicker
            dateFormat='yyyy'
          />
        </FormLabel>
      </div>

      <div className='chart'>
        {0 === data.length ? (
          <p>No data</p>
        ) : (
          <PieChart width={ 250 } height={ 250 }>
            <Pie
              dataKey='status_count'
              isAnimationActive={ false }
              data={ getFormattedData() }
              cx='50%'
              cy='50%'
              outerRadius={ 80 }
              fill='#8884d8'
              label
            />
            <Tooltip />
          </PieChart>
        )}

        <div className='labels'>
          {
            getFormattedData().map( ( { name, status_count } ) => (
              <div className='label' key={ name }>
                <span>{name}</span>: { ' ' }
                <span>{status_count}</span>
              </div>
            ) )
          }
        </div>
      </div>
    </>
  )
}

export default StatusCounts
