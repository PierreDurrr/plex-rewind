import { RewindStory } from '@/types'
import {
  FilmIcon,
  MusicalNoteIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline'
import RewindStat from '../RewindStat'
import StoryWrapper from '../StoryWrapper'

export default function StoryGoodbye({
  userRewind,
  isPaused,
  pause,
  resume,
}: RewindStory) {
  return (
    <StoryWrapper isPaused={isPaused} pause={pause} resume={resume}>
      <RewindStat scaleDelay={2} isPaused={isPaused}>
        <p>
          Thanks for tuning into your{' '}
          <span className='whitespace-nowrap'>
            <span className='gradient-plex'>Plex Rewind</span>,
          </span>{' '}
          <span className='whitespace-nowrap'>
            <span className='rewind-cat'>{userRewind.user.name}!</span>
          </span>
        </p>
      </RewindStat>
      <RewindStat renderDelay={2} scaleDelay={4} isPaused={isPaused}>
        <p>
          From your favorite{' '}
          {userRewind.movies.duration && (
            <span className='rewind-cat'>
              Movies
              <FilmIcon />
            </span>
          )}{' '}
          to the most entertaining{' '}
          {userRewind.shows.duration && (
            <span className='rewind-cat'>
              Shows
              <PlayCircleIcon />
            </span>
          )}
          {userRewind.audio.duration && (
            <>
              {' '}
              and memorable{' '}
              <span className='rewind-cat'>
                Tracks
                <MusicalNoteIcon />
              </span>
            </>
          )}
          , it&apos;s been a year to remember.
        </p>
      </RewindStat>
      <RewindStat
        renderDelay={6}
        scaleDelay={3}
        loaderDelay={2}
        isPaused={isPaused}
      >
        <p>
          We&apos;ll be back next year with even more{' '}
          <span className='rewind-cat'>insights and stats.</span>
        </p>
      </RewindStat>
      <RewindStat renderDelay={9} loaderDelay={6} isPaused={isPaused} noScale>
        <p>
          Until then, keep exploring and enjoying all that{' '}
          <span className='gradient-plex'>Plex</span> has to offer.
        </p>
      </RewindStat>
    </StoryWrapper>
  )
}
