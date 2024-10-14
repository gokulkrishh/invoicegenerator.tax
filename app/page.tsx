import Image from 'next/image'
import Link from 'next/link'

import CurrencySelect from './components/currency-select'
import Form from './components/form'
import GithubStarButton from './components/github-link'

export default async function Home() {
  return (
    <div className="m-auto w-full px-4 py-4 md:max-w-4xl md:px-6 lg:max-w-[1080px]">
      <header className="flex flex-col justify-between md:flex-row print:hidden">
        <Link
          className="flex items-center gap-1.5 rounded-md transition-all duration-200 ease-in-out active:scale-[1.02]"
          href="/"
        >
          <Image src={'/logo.svg'} width={22} height={22} alt={''} />
          <h1 className="text-2xl font-extrabold tracking-tighter">Invoice Generator</h1>
        </Link>

        <div className="flex items-center gap-4 max-sm:mt-4">
          <CurrencySelect />
          <GithubStarButton />
        </div>
      </header>
      <main className="mt-5 flex w-full flex-col items-center justify-center md:mt-10">
        <Form />
      </main>
      <footer className="mt-10 flex print:hidden">
        <span className="mr-1.5 inline-flex">👋</span> Built by
        <a
          className="ml-1 flex items-center underline underline-offset-2"
          href="https://github.com/gokulkrishh"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gokul
        </a>
      </footer>
    </div>
  )
}
