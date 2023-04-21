import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

import './ImageUploader.scss'

import { CloseIcon } from '../../../../assets/icons'

import Icon from '../../../Icon'

const ImageUploader = ( { name = 'name' } ) => {
  const { setValue } = useFormContext()

  const [ fileName, setFileName ] = useState( null )

  const onDrop = useCallback( async ( acceptedFiles ) => {
    setFileName( acceptedFiles[0].name )
    setValue( name, acceptedFiles[0] )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  const { getRootProps, getInputProps, isDragActive } = useDropzone( { onDrop } )

  const clear = ( e ) => {
    e.stopPropagation()
    setValue( name, '' )
    setFileName( null )
  }

  const getContent = () => {
    if ( isDragActive ) {
      return <p>Drop the files here ...</p>
    }

    if ( fileName ) {
      return (
        <>
          <p>
            {fileName}{' '}
            <span className='clear-file' onClick={ clear }>
              <Icon IconComponent={ CloseIcon } className='danger md' />
            </span>
          </p>
        </>
      )
    }

    return (
      <>
        <p>Drag & drop a file, or browse files</p>
        <span>Max file size: 2MB</span>
      </>
    )
  }

  return (
    <div
      { ...getRootProps( {
        className: classNames( {
          dropzone: true,
          'file-loaded': !!fileName,
        } ),
      } ) }
    >
      <input { ...getInputProps() } />
      {getContent()}
    </div>
  )
}

export default ImageUploader
