import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import ReactDatePicker from 'react-datepicker'

import './Dashboard.scss'

import useApi from '@/hooks/useApi/useApi'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import StatusCounts from './StatusCounts'

const Dashboard = () => {
  const [ year, setYear ] = useState( new Date() )

  const { data, isLoading } = useApi( 'getList', '/api/application/stats', {
    by: 'month',
    year: year.getFullYear(),
  } )

  if ( isLoading ) {
    return null
  }

  return (
    <div className='dashboard-page'>
      <h5>
        Applications created in the year: {year.getFullYear()}
        <br />
        <span className='subtext'>
          *The counts shown are only from applications assgined to you
        </span>
      </h5>

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
        <LineChart
          width={ 700 }
          height={ 300 }
          data={ data.results }
          margin={ {
            bottom: 5,
            left: 20,
            right: 30,
            top: 5,
          } }
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='count'
            stroke='#8884d8'
            activeDot={ { r: 8 } }
          />
        </LineChart>
      </div>

      <hr className='divider' />

      <StatusCounts />
    </div>
  )
}

export default Dashboard
