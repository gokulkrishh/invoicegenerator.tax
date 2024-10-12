import Link from 'next/link'

const owner: string = 'gokulkrishh'
const repo: string = 'invoicegenerator.tax'

async function getStarCount(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { next: { revalidate: 1200 } }, // 20 minutes
    )
    const data = await response.json()
    if (response.ok) {
      return data.stargazers_count
    } else {
      return 0
    }
  } catch (error) {
    console.error('Error:', error)
    return 0
  }
}

export default async function GithubStarButton() {
  const count = await getStarCount()
  return (
    <Link
      target="_blank"
      href={`https://github.com/${owner}/${repo}`}
      className="inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap text-nowrap rounded-lg border border-gray-300 bg-white px-2 font-medium text-black outline-none ring-blue-600 transition-all duration-200 ease-in-out hover:bg-gray-100/90 focus:border-gray-200 focus:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus-visible:border-gray-200 focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-gray-300/10 disabled:bg-gray-300/5 disabled:text-gray-400 disabled:text-white disabled:ring-0 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0"
    >
      <StarIcon className="!h-3.5 !w-3.5 text-yellow-600" />{' '}
      <span className="text-sm tabular-nums text-black">{count}</span>
    </Link>
  )
}

function StarIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={'#000000'}
      fill={'currentColor'}
    >
      <path
        d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
