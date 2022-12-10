import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'

// Directory where the content files are stored (must be in the root directory)
const contentDirectory = path.join(process.cwd(), 'content')
// Type of content file extension that we want to read (must start with a '.')
const contentExtension = '.md'
// The required frontmatter fields for each content page
const requiredFrontmatter = ['title', 'description', 'date']

// The content page component that will be rendered
const Content = (props: {
  directory: string
  frontmatter: { [key: string]: string }
  slug: string
  html: string
}) => (
  <main>
    <nav>
      <Link href="/">
        <p>Return to &quot;Home&quot;</p>
      </Link>
      <p>
        Current Path: {props.directory}/{props.slug}
      </p>
    </nav>
    <div>
      <h1>{props.frontmatter.title}</h1>
      <h2>
        <i>{new Date(props.frontmatter.date).toUTCString()}</i>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  </main>
)

export default Content

// Static site generation (SSG): get the path for each content page
// This function gets called at build time
export async function getStaticPaths() {
  // Begin validation:
  // 1. Preform some validation on the content directory
  //  1a. Check that the content directory is not empty
  if (contentDirectory.trim() === '') {
    throw new Error(
      `The '${contentDirectory}' directory is empty. Please add a directory name.`
    )
  }
  //  1b. Check that the content directory exists
  if (!fs.existsSync(contentDirectory)) {
    throw new Error(
      `The '${contentDirectory}' directory does not exist. Please create the directory.`
    )
  }
  //  1c. Check that the content directory is a directory
  if (!fs.statSync(contentDirectory).isDirectory()) {
    throw new Error(
      `The '${contentDirectory}' path is not a directory. Please make it a directory.`
    )
  }
  //  1d. Check that the content directory is not empty
  if (fs.readdirSync(contentDirectory).length === 0) {
    throw new Error(
      `The '${contentDirectory}' directory is empty. Please add some content pages.`
    )
  }
  //  1e. Check that the content directory doesn't have any files and only directories
  if (
    fs
      .readdirSync(contentDirectory)
      .filter((filename) =>
        fs.statSync(path.join(contentDirectory, filename)).isFile()
      ).length !== 0
  ) {
    throw new Error(
      `The '${contentDirectory}' directory contains files. Please remove any files and only have directories.`
    )
  }
  // 2. Preform some validation on the content extension
  //  2a. Check that the content extension is not empty
  if (contentExtension.trim() === '') {
    throw new Error(
      `The '${contentExtension}' content extension is empty. Please add a content extension.`
    )
  }
  //  2b. Check that the content extension starts with a '.' followed by at least one character
  if (!contentExtension.startsWith('.') || contentExtension.length <= 1) {
    throw new Error(
      `The '${contentExtension}' content extension is invalid. Please make sure it starts with a '.' followed by at least one character.`
    )
  }
  // 3. Preform some validation on each subdirectory in the content directory
  //  3a. Check that each subdirectory in the content directory is not an empty directory
  fs.readdirSync(contentDirectory)
    .filter((filename) =>
      fs.statSync(path.join(contentDirectory, filename)).isDirectory()
    )
    .forEach((directory) => {
      if (fs.readdirSync(path.join(contentDirectory, directory)).length === 0) {
        throw new Error(
          `The '${directory}' directory in '${contentDirectory}' is empty. Please add some content pages.`
        )
      }
    })
  //  3b. Check that each subdirectory in the content directory doesn't have any files without the content extension
  fs.readdirSync(contentDirectory)
    .filter((filename) =>
      fs.statSync(path.join(contentDirectory, filename)).isDirectory()
    )
    .forEach((directory) => {
      if (
        fs
          .readdirSync(path.join(contentDirectory, directory))
          .filter((filename) =>
            fs
              .statSync(path.join(contentDirectory, directory, filename))
              .isFile()
          )
          .filter((filename) => !filename.endsWith(contentExtension)).length !==
        0
      ) {
        throw new Error(
          `The '${directory}' directory in '${contentDirectory}' contains files that are not '${contentExtension}' files. Please remove any files that are not '${contentExtension}' files.`
        )
      }
    })
  // 3c. Assert that there are no duplicate slugs in the content directory across all subdirectories
  const slugs = fs
    .readdirSync(contentDirectory)
    .filter((filename) =>
      fs.statSync(path.join(contentDirectory, filename)).isDirectory()
    )
    .map((directory) =>
      fs
        .readdirSync(path.join(contentDirectory, directory))
        .filter((filename) => filename.endsWith(contentExtension))
        .map((filename) => filename.replace(contentExtension, ''))
    )
    .flat()
  if (new Set(slugs).size !== slugs.length) {
    throw new Error(
      `There are duplicate slugs in the '${contentDirectory}' directory. Please remove the duplicate slugs.`
    )
  }
  // All validation passed, continue...
  // Get each directory in the 'content' directory
  const directories = fs
    // Read the 'content' directory from the filesystem
    .readdirSync(contentDirectory)
    // Filter out the non-directories
    .filter((filename) =>
      fs.statSync(path.join(contentDirectory, filename)).isDirectory()
    )
  // Get the files in each directory, and map them to an object
  const pages = directories.map((directory) => ({
    // The directory name
    directory,
    // The files in the directory
    files: fs
      // Read from each directory in the 'content' directory
      .readdirSync(path.join(contentDirectory, directory))
      // Filter out the non-markdown files
      .filter((filename) => filename.endsWith(contentExtension)),
  }))
  // Assemble the paths for each content page
  const paths = pages
    .map((page) =>
      page.files.map((file) => ({
        params: {
          directory: page.directory,
          // Strip the '.md' from the file name
          slug: file.replace(contentExtension, ''),
        },
      }))
    )
    .flat()
  // Return the paths for all of the content pages
  return {
    paths,
    fallback: false,
  }
}

// Static site generation (SSG): get the data for each content page
// This also gets called at build time
export async function getStaticProps({ params: { directory, slug } }: never) {
  // Read the markdown files from the filesystem
  const markdownWithMeta = fs.readFileSync(
    path.join(contentDirectory + '/' + directory, slug + contentExtension),
    'utf-8'
  )
  // Parse the markdown file into a usable object using gray-matter
  const { data: frontmatter, content } = matter(markdownWithMeta)
  // Parse the markdown file's content into HTML using marked
  const html = marked.parse(
    // Remove any zero-width characters from the beginning of the content
    content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')
  )
  // Begin validation:
  // 1. Preform some validation on the frontmatter
  //  1a. Check that the frontmatter has all of the required fields
  requiredFrontmatter.forEach((field) => {
    if (!frontmatter[field]) {
      throw new Error(
        `Missing '${field}' field in frontmatter for ${directory}/${slug}${contentExtension}. Required fields: ${requiredFrontmatter.join(
          ', '
        )}`
      )
    }
  })
  //  1b. Check that the frontmatter doesn't have any extra fields
  Object.keys(frontmatter).forEach((field) => {
    if (!requiredFrontmatter.includes(field)) {
      throw new Error(
        `Unexpected '${field}' field in frontmatter for ${directory}/${slug}${contentExtension}. Only the following fields are allowed: ${requiredFrontmatter.join(
          ', '
        )}`
      )
    }
  })
  //  1c. Check that the frontmatter fields are not empty
  Object.keys(frontmatter).forEach((field) => {
    if (frontmatter[field].trim() === '') {
      throw new Error(
        `Empty '${field}' field in frontmatter for ${directory}/${slug}${contentExtension}.`
      )
    }
  })
  //  1d. Check that the frontmatter 'date' field is a valid date and in the correct format of 'YYYY-MM-DD'
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date) ||
    !Date.parse(frontmatter.date)
  ) {
    throw new Error(
      `Invalid 'date' field in frontmatter for ${directory}/${slug}${contentExtension}. Must be in the format of 'YYYY-MM-DD'.`
    )
  }
  // 2. Preform some validation on the HTML content
  //  2a. Check that the HTML content is not empty
  if (html.trim() === '') {
    throw new Error(
      `Content for ${directory}/${slug}${contentExtension} is empty`
    )
  }
  //  2b. Check that the HTML content has no h1 tags (since we use h1 tags for the page title)
  if (/<h1[^>]*>.*<\/h1>/.test(html)) {
    throw new Error(
      `Content for ${directory}/${slug}${contentExtension} has an h1 tag. h1 tags are reserved for the page title.`
    )
  }
  //  2c. Check that each header tag's follows a valid header hierarchy (i.e., the current header is higher, lower, or the same level as the next header)
  const headers = html.match(/<h[1-6][^>]*>.*<\/h[1-6]>/g)
  headers?.forEach((header, index) => {
    if (index === headers.length - 1) return
    const currentLevelMatch = header.match(/<h([1-6])/)
    const nextLevelMatch = headers[index + 1].match(/<h([1-6])/)
    if (!currentLevelMatch || !nextLevelMatch) {
      throw new Error(
        `Content for ${directory}/${slug}${contentExtension} has an invalid header tag.`
      )
    }
    const currentLevel = parseInt(currentLevelMatch[1])
    const nextLevel = parseInt(nextLevelMatch[1])
    if (nextLevel && Math.abs(currentLevel - nextLevel) > 1) {
      throw new Error(
        `Content for ${directory}/${slug}${contentExtension} has an invalid header hierarchy.`
      )
    }
  })
  //  2d. Check that the HTML content's code blocks have a language specified (i.e., the code block is wrapped in a <pre><code class="language-..."> tag)
  const codeBlocks = html.match(/<pre><code[^>]*>/g)
  codeBlocks?.forEach((codeBlock) => {
    if (!/<pre><code class="language-[^"]*">/.test(codeBlock)) {
      throw new Error(
        `Content for ${directory}/${slug}${contentExtension} has a code block without a language specified.`
      )
    }
  })
  // All validation passed, continue...
  // Return the parsed data as props
  return {
    props: {
      directory,
      slug,
      frontmatter,
      html,
    },
  }
}
