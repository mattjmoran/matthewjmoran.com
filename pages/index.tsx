import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/example1">
        <p>Go to &quot;Example 1&quot;</p>
      </Link>
      <Link href="/example2">
        <p>Go to &quot;Example 2&quot;</p>
      </Link>
    </div>
  )
}
