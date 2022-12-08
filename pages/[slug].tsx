import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Directory where the content files are stored
const contentDirectory = path.join(process.cwd(), 'content')
// Type of content file extension that we want to read
const contentExtension = '.md'

// The content page component that will be rendered
const Content = (props: {
  frontMatter: { [key: string]: string }
  slug: string
  content: string
}) => (
  <div>
    <h1>{props.frontMatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
  </div>
)

export default Content

// Static site generation (SSG): get the paths for the pages
// This function gets called at build time
export async function getStaticPaths() {
  const files = fs
    // Read the 'content' directory from the filesystem
    .readdirSync(contentDirectory)
    // Filter out the non-markdown files
    .filter((filename) => filename.endsWith(contentExtension))
  // Strip the '.md' from the file names
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(contentExtension, ''),
    },
  }))
  // Return the paths we want to pre-render
  return {
    paths,
    fallback: false,
  }
}

// Static site generation (SSG): get the data for the page
// This also gets called at build time
export async function getStaticProps({ params: { slug } }: never) {
  // Read the markdown files from the filesystem synchronously
  const markdownWithMeta = fs.readFileSync(
    path.join(contentDirectory, slug + contentExtension),
    'utf-8'
  )
  // Parse the markdown file into a usable object using gray-matter
  const { data: frontMatter, content } = matter(markdownWithMeta)
  // Return the parsed data as props
  return {
    props: {
      frontMatter,
      slug,
      content,
    },
  }
}
