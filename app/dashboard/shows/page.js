import CardContent from '../../../ui/CardContent'
import { ALLOWED_PERIODS, DAYS_AGO_30_STRING } from '../../../utils/constants'
import fetchTautulli from '../../../utils/fetchTautulli'
import { bytesToSize, removeAfterMinutes } from '../../../utils/formatting'

async function getShows() {
  const showsData = await fetchTautulli('get_home_stats', {
    stat_id: 'top_tv',
    stats_count: 6,
    stats_type: 'duration',
    time_range: 30,
  })

  const shows = showsData.response?.data?.rows

  // FIXME: Workaround for Tautulli not properly returning year via get_home_stats collection
  let ratingKeys = []
  shows.map((show) => {
    ratingKeys.push(show.rating_key)
  })
  const years = await Promise.all(
    ratingKeys.map(async (key) => {
      const itemData = await fetchTautulli('get_metadata', {
        rating_key: key,
      })

      return itemData.response?.data?.year
    }),
  )

  shows.map((show, i) => {
    show.year = years[i]
  })

  return shows
}

async function getTotalDuration() {
  const totalDuration = await fetchTautulli('get_history', {
    section_id: 2,
    after: DAYS_AGO_30_STRING,
    length: 0,
  })

  return removeAfterMinutes(totalDuration.response?.data?.total_duration)
}

async function getTotalSize() {
  const totalSize = await fetchTautulli('get_library_media_info', {
    section_id: 2,
    length: 0,
  })

  return bytesToSize(totalSize.response?.data.total_file_size)
}

async function getRatings() {
  const shows = await getShows()

  const ratings = Promise.all(
    shows.map(async (show) => {
      const showData = await fetchTautulli('get_metadata', {
        rating_key: show.rating_key,
        year: show.year,
      })

      return {
        title: show.title,
        rating: showData.response?.data.audience_rating,
      }
    }),
  )

  return ratings
}

export default async function Shows({ searchParams }) {
  let period = ALLOWED_PERIODS
  if (ALLOWED_PERIODS[searchParams.period]) {
    // period = ALLOWED_PERIODS[searchParams.period]
  }

  console.log(period)

  const [shows, totalDuration, totalSize, ratings] = await Promise.all([
    getShows(),
    getTotalDuration(),
    getTotalSize(),
    getRatings(),
  ])

  return (
    <CardContent
      title="TV shows"
      items={shows}
      totalDuration={totalDuration}
      totalSize={totalSize}
      nextCard="dashboard/movies"
      page="1 / 4"
      type="shows"
      ratings={ratings}
    />
  )
}
