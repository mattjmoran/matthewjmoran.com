import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/projects/p1">
        <p>Go to &quot;Example Project 1&quot;</p>
      </Link>
      <Link href="/projects/p2">
        <p>Go to &quot;Example Project 2&quot;</p>
      </Link>
      <Link href="/guides/g1">
        <p>Go to &quot;Example Guide 1&quot;</p>
      </Link>
      <Link href="/guides/g2">
        <p>Go to &quot;Example Guide 2&quot;</p>
      </Link>
    </div>
  )
}
