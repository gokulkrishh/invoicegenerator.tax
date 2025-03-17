import Link from 'next/link'

const owner: string = 'gokulkrishh'
const repo: string = 'invoicegenerator.tax'

export default async function GithubStarButton() {
  return (
    <Link
      target="_blank"
      href={`https://github.com/${owner}/${repo}`}
      className="group border-border bg-foreground/10 text-foreground ring-ring ring-offset-background hover:bg-foreground/20 focus:border-border focus:bg-background focus-visible:border-border focus-visible:bg-background inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border px-2 font-medium text-nowrap whitespace-nowrap outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:shrink-0 [&>svg]:pointer-events-none [&>svg]:size-4"
    >
      <div className="flex items-center gap-1.5">
        <svg
          className="text-foreground group-hover:text-foreground group-focus-visible:text-foreground fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6C16 3.6 12.4 0 8 0Z"></path>
        </svg>
        <span className="text-foreground text-sm tabular-nums">Star</span>
        <svg
          className="text-foreground group-hover:text-foreground group-focus-visible:text-foreground fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="9"
          fill="none"
        >
          <path d="M1.65 8.514.74 7.6l5.514-5.523H2.028l.01-1.258h6.388v6.394H7.16l.01-4.226L1.65 8.514Z"></path>
        </svg>
      </div>
    </Link>
  )
}
