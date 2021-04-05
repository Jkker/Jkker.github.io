import PageTitle from '@/components/PageTitle'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function About() {
  const { data, error } = useSWR('/api/geoip', fetcher)
  console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <PageTitle>My IP</PageTitle>
      <div className="flex justify-center items-center text-base">
        <ul>
          {Object.keys(data).map((key, i) => {
            return (
              <li key={i}>
                <strong>{key}: </strong>
                {data[key]}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
