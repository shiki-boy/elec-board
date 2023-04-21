import { FormProvider, useForm } from 'react-hook-form'

const StaticForm = ( {
  entries,
  FormBody,
  onSubmit, // ( values ) => {},
} ) => {
  const formMethods = useForm( {
    defaultValues: entries,
    mode: 'onChange',
    shouldUnregister: false,
  } )

  const { handleSubmit } = formMethods

  return (
    <FormProvider { ...formMethods }>
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <FormBody entries={ entries } />
      </form>
    </FormProvider>
  )
}

export default StaticForm
