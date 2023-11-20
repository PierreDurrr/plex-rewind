import Card from '@/components/Card/Card'
import { ALLOWED_PERIODS, metaDescription } from '@/utils/constants'
import fetchTautulli, {
  TautulliItemRows,
  getServerId,
} from '@/utils/fetchTautulli'
import { bytesToSize, secondsToTime, timeToSeconds } from '@/utils/formatting'
import getMediaAdditionalData from '@/utils/getMediaAdditionalData'
import { FilterQueryParams } from '@/utils/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shows | Plex rewind dashboard',
  description: metaDescription,
}

async function getShows(period: number) {
  const showsRes = await fetchTautulli<TautulliItemRows>('get_home_stats', {
    stat_id: 'top_tv',
    stats_count: 6,
    stats_type: 'duration',
    time_range: period,
    section_id: 2,
  })
  const usersWatched = await fetchTautulli<TautulliItemRows>('get_home_stats', {
    stat_id: 'popular_tv',
    stats_count: 25, // https://github.com/Tautulli/Tautulli/issues/2103
    time_range: period,
  })
  const usersWatchedData = usersWatched.response?.data?.rows
  const shows = await getMediaAdditionalData(
    showsRes.response?.data?.rows,
    'tv',
    usersWatchedData,
  )

  return shows
}

async function getTotalDuration(period: string) {
  const totalDuration = await fetchTautulli<{ total_duration: string }>(
    'get_history',
    {
      section_id: 2,
      after: period,
      length: 0,
    },
  )

  return secondsToTime(
    timeToSeconds(totalDuration.response?.data?.total_duration),
  )
}

async function getTotalSize() {
  const totalSize = await fetchTautulli<{ total_file_size: number }>(
    'get_library_media_info',
    {
      section_id: 2,
      length: 0,
    },
  )

  return bytesToSize(totalSize.response?.data.total_file_size)
}

export default async function Shows({
  searchParams,
}: {
  searchParams: FilterQueryParams
}) {
  const periodKey =
    searchParams.period && ALLOWED_PERIODS[searchParams.period]
      ? searchParams.period
      : '30days'
  const period = ALLOWED_PERIODS[periodKey]

  const [shows, totalDuration, totalSize, serverId] = await Promise.all([
    getShows(period.daysAgo),
    getTotalDuration(period.string),
    getTotalSize(),
    getServerId(),
  ])

  return (
    <Card
      title='TV shows'
      items={shows}
      totalDuration={totalDuration}
      totalSize={totalSize}
      nextCard='/dashboard/movies'
      page='1 / 4'
      type='shows'
      serverId={serverId}
    />
  )
}
