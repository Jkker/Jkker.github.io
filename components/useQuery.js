// import { useHistory, useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

const useQuery = function (defaultValues = {}) {
  const router = useRouter()
  const { pathname, query } = router
  const updateQuery = useCallback(
    function (updatedParams) {
      const newQuery = Object.assign({}, query, updatedParams)
      router.push({ pathname, query: newQuery }, undefined, { shallow: true })
    },
    [query, pathname]
  )
  const queryWithDefault = useMemo(
    function () {
      return Object.assign({}, defaultValues, query)
    },
    [query, defaultValues]
  )
  return [queryWithDefault, updateQuery]
}

export default useQuery
