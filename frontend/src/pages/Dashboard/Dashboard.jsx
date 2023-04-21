import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import useApi from '@/hooks/useApi/useApi'

const Dashboard = () => {
  const { data, isLoading } = useApi( 'getList', '/api/application/stats', {
    by: 'month',
    year: 2021,
  } )

  if ( isLoading ) {
    return null
  }

  return (
    <div className='dashboard-page'>
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
  )
}

export default Dashboard
