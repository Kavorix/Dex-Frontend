import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../index'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    return
  }, [dispatch])

  return null
}
