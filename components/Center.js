import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistsIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]
function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistsId = useRecoilValue(playlistsIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistsId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistsId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((error) => console.log('Something wrong', error))
  }, [spotifyApi, playlistsId])

  console.log(playlist)

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black  p-1 pr-2 text-emerald-100 opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`padding-8 flex h-80 w-full items-end space-x-7 bg-gradient-to-b ${color} to-black text-white`}
      >
        <img
          className="h=-44 w-44 shadow-2xl"
          src={playlist?.images?.[0].url}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <Songs />
      <div></div>
    </div>
  )
}

export default Center
