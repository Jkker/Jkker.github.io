import useQuery from '@/components/useQuery'
import { frames, links } from '@/data/config.js'
import { LinkOutlined } from '@ant-design/icons'
import { Divider, Dropdown, Menu, Tabs } from 'antd'
import mobile from 'ismobilejs'
import { debounce } from 'lodash'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import ThemeSwitch from '../components/ThemeSwitch'

const fetcher = (url) => fetch(url).then((r) => r.json())

const DEBUG = false

export default function Search() {
  const { data: geoData, error: geoError } = useSWR('/api/geoip/country', fetcher)

  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [defaultEngine, setDefaultEngine] = useState(frames('', false)[0].title)
  const [{ q, engine }, updateQuery] = useQuery({ q: '', engine: defaultEngine })
  const [inputKey, setInputKey] = useState(q ? q : '')
  // const [q, setSearchKey] = useState(q ? q : '')
  const [hasProxy, setHasProxy] = useState(false)
  const isMobile = mobile().any
  const platform = isMobile ? 'mobile' : 'desktop'

  // Detect if user has proxy & switch tabs accordingly
  useEffect(() => {
    const userHasProxy = geoData?.country === 'CN' ? false : true
    setHasProxy(userHasProxy)
    const key = userHasProxy ? frames('', userHasProxy)[0].title : frames('', userHasProxy)[1].title
    setDefaultEngine(key)
  }, [geoData])

  //* Core search functionality

  const handleSetSearch = (key) => {
    const trimmedKey = key.trim()
    if (isMobile) {
      landingSearchBarRef?.current?.blur?.()
    }
    if (trimmedKey === q) {
      setRefresher(refresher + 1)
      return
    } else {
      // setSearchKey(key)
      updateQuery({ q: trimmedKey, engine })
    }
  }
  const debounceSetSearch = useCallback(debounce(handleSetSearch, 1000), [q, engine])

  /* const handleSetSearchQuery = (key) => {
    if (key === q) {
      return
    } else {
      updateQuery({ q: key })
    }
  }
  const debounceSetSearchQuery = useCallback(debounce(handleSetSearchQuery, 1000), [engine]) */

  // Handle input change
  const handleInputChange = (e) => {
    const key = e.target.value
    if (key === inputKey) {
      return
    } else {
      if (!isMobile) {
        debounceSetSearch(key)
      }
      // debounceSetSearchQuery(key)
      setInputKey(key)
    }
  }
  // Handle search query change
  useEffect(() => {
    setInputKey(q ?? '')
  }, [q])

  // When logo or clear button is clicked
  const handleReset = () => {
    router.push(`/search?q=&${engine ? 'engine=' + engine : ''}`, undefined, { shallow: true })
    setInputKey('')
    handleSetSearch('')
  }

  const handleTabClick = (tabKey, e) => {
    if (tabKey === engine) {
      setRefresher(refresher + 1)
      return
    }
    updateQuery({ engine: tabKey })
  }

  // Auto focus search bar after refresh on desktop
  const landingSearchBarRef = useRef(null)
  useEffect(() => {
    if (!isMobile) {
      landingSearchBarRef?.current?.focus?.()
    }
  }, [q, engine])

  // Detect if user is on mobile platform & parse link accordingly
  const parseLink = (link) => {
    return link?.[platform] ?? link
  }

  const menu = isMobile ? (
    <Menu>
      {links(encodeURIComponent(q)).map(({ link, title }) => (
        <Menu.Item key={title}>
          <a
            title={title}
            key={title}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="links"
          >
            {title}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  ) : null

  const [refresher, setRefresher] = useState(0)

  return (
    <div className="app-container flex flex-col h-screen w-screen">
      <Head>
        <title>
          {q} - {engine || defaultEngine}
        </title>
      </Head>
      <div className="h-9 flex max-w-screen mt-2 justify-between items-center flex-nowrap text-center flex-none head-container bg-white dark:bg-gray-900">
        <Link href="/">
          <a className="block my-1 mx-2 h-8 flex-none">
            <Image
              src="/static/images/search-logo.png"
              alt="logo"
              layout="fixed"
              height={32}
              width={32}
            ></Image>
          </a>
        </Link>
        <div className="flex-auto meta-search-bar relative">
          <input
            aria-label="Metasearch"
            placeholder="搜你所想"
            type="text"
            ref={landingSearchBarRef}
            onChange={handleInputChange}
            className="flex-auto ring-opacity-50 w-full h-9 rounded-sm text-black dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-r-none bg-gray-100"
            value={inputKey}
            onKeyDown={({ key }) => {
              switch (key) {
                case 'Enter': {
                  handleSetSearch(inputKey)
                  break
                }
                case 'Escape': {
                  handleReset()
                  break
                }
                default:
                  break
              }
            }}
          />
          <div className="absolute text-gray-800 dark:text-gray-100 right-3 top-0 text-opacity-70 flex items-center justify-evenly space-x-4 h-full">
            <button
              className="reset button"
              onClick={handleReset}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleReset()
                }
              }}
            >
              <svg
                className="w-3 h-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times-circle"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <button
          id="search"
          className="rounded-sm rounded-l-none h-9 w-9 flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => handleSetSearch(inputKey)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSetSearch(inputKey)
            }
          }}
        >
          <svg
            className="w-5 h-5 text-gray-900 dark:text-gray-100 text-opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <Divider type="vertical" className="h-full" />
        <div className="flex-0 flex flex-nowrap space-x-1 xl:space-x-2  h-full justify-evenly">
          {isMobile ? (
            <Dropdown overlay={menu} trigger={['click', 'hover']}>
              <button
                className="rounded-sm responsive-element h-full p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center focus:outline-none"
                onClick={(e) => e.preventDefault()}
              >
                Links <LinkOutlined className="ml-1" />
              </button>
            </Dropdown>
          ) : (
            <>
              {links(encodeURIComponent(q)).map(({ link, title }) => (
                <a
                  title={title}
                  key={title}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm responsive-element h-full p-1 lg:p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center"
                >
                  {title} <LinkOutlined className="ml-1" />
                </a>
              ))}
            </>
          )}
        </div>
        <Divider type="vertical" className="h-full" />
        <div className="flex-0">
          <ThemeSwitch />
        </div>
      </div>
      <div className="search-body-container flex-1 flex items-stretch">
        <Tabs
          className="dark:text-white dark:bg-gray-900"
          activeKey={engine ? engine : defaultEngine}
          onTabClick={handleTabClick}
        >
          {frames(encodeURIComponent(q), hasProxy)
            // .sort((a, b) => (b?.priority ?? 0) - (a?.priority ?? 0))
            .map(({ title, link }) => (
              <Tabs.TabPane key={title} tab={title} className="tabpane">
                {DEBUG ? (
                  <ul className="ml-24 h-full flex flex-col justify-center leading-loose list-disc dark:text-white">
                    <li>Search Key: {q}</li>
                    <li>Engine: {engine}</li>
                    <li>Country: {geoData?.country}</li> <li>IP: {geoData?.ip}</li>
                    <li>Theme: {resolvedTheme}</li>
                    <li>Query: {q}</li>
                  </ul>
                ) : (
                  <iframe
                    title={title}
                    className="frame"
                    src={parseLink(link)}
                    key={title + refresher}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                    referrerPolicy="no-referrer"
                    style={
                      resolvedTheme === 'dark' ? { filter: 'invert(1) hue-rotate(180deg)' } : {}
                    }
                  />
                )}
              </Tabs.TabPane>
            ))}
        </Tabs>
      </div>
    </div>
  )
}
