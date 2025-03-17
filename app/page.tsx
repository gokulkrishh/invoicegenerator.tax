import Link from 'next/link'

import CurrencySelect from './components/currency-select'
import Form from './components/form'
import GithubStarButton from './components/github-link'
import ThemeSwitch from './components/theme-switch'

const LogoSVG = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.9677 1.45748C3.10835 1.31682 3.29913 1.23779 3.49805 1.23779H20.498C20.9123 1.23779 21.248 1.57358 21.248 1.98779V21.5001C21.248 21.7604 21.1131 22.002 20.8916 22.1386C20.67 22.2751 20.3935 22.2871 20.161 22.1701L16.5154 20.3361L12.3623 22.6434C12.1358 22.7693 11.8603 22.7693 11.6338 22.6434L7.48072 20.3361L3.83658 22.1701C3.6041 22.2871 3.32757 22.2752 3.10599 22.1386C2.8844 22.0021 2.74945 21.7604 2.74943 21.5002L2.74805 1.98785C2.74803 1.78892 2.82704 1.59815 2.9677 1.45748ZM7.99805 10.25H11.998V11.75H7.99805V10.25ZM14.998 6.25H7.99805V7.75H14.998V6.25Z"
      fill="currentColor"
    />
  </svg>
)

export default async function Home() {
  return (
    <div className="m-auto w-full px-4 py-4 md:max-w-4xl md:px-6 lg:max-w-[1080px]">
      <header className="flex flex-col justify-between md:flex-row print:hidden">
        <Link
          className="ring-ring ring-offset-background flex items-center gap-1.5 rounded-md outline-hidden transition-all duration-200 ease-in-out hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[1.02]"
          href="/"
        >
          <LogoSVG className="text-foreground h-6 w-6" />
          <h1 className="text-2xl font-extrabold tracking-tighter">Invoice Generator</h1>
        </Link>

        <div className="flex items-center gap-4 max-md:mt-4">
          <CurrencySelect />
          <GithubStarButton />
        </div>
      </header>
      <main className="mt-5 flex w-full flex-col items-center justify-center md:mt-10">
        <Form />
      </main>
      <footer className="mt-10 flex justify-between print:hidden">
        <div className="flex items-center gap-1">
          <span className="mr-1.5 inline-flex">👋</span> Built by
          <Link
            className="ring-ring ring-offset-background flex items-center rounded-md underline outline-hidden transition-all duration-200 ease-in-out hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[1.02]"
            href="https://github.com/gokulkrishh"
            target="_blank"
          >
            Gokul
          </Link>
        </div>
        <ThemeSwitch />
      </footer>
    </div>
  )
}
