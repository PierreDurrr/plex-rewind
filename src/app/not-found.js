import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='pt-32 text-center sm:pt-0 sm:text-left'>
      <div className='flex flex-col items-center gap-6 sm:flex-row'>
        <h1 className='pb-6 text-6xl font-bold uppercase border-b border-white sm:pb-0 sm:border-r sm:pr-6 sm:border-b-0'>
          404
        </h1>
        <div>
          <p className='italic'>The requested page could not be found.</p>
          <p className='italic'>
            Might be better to{' '}
            <Link href='/' className='link'>
              start over
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
