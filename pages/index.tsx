import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/projects/1">
        <p>Go to &quot;Example Project 1&quot;</p>
      </Link>
      <Link href="/projects/2">
        <p>Go to &quot;Example Project 2&quot;</p>
      </Link>
      <Link href="/guides/1">
        <p>Go to &quot;Example Guide 1&quot;</p>
      </Link>
      <Link href="/guides/2">
        <p>Go to &quot;Example Guide 2&quot;</p>
      </Link>
    </div>
  )
}
