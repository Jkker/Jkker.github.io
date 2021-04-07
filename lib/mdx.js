import MDXComponents from '@/components/MDXComponents'
import fs from 'fs'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import readingTime from 'reading-time'
import imgToJsx from './img2jsx'
import writeTreeDebug from './writeTreeDebug'

const root = process.cwd()

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-green',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-red',
  string: 'text-code-yellow',
  function: 'text-code-blue',
  boolean: 'text-code-purple',
  comment: 'text-gray-400 italic',
}

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type))
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

// TODO: TOC.
export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug}.md`)
  const sourcePath = fs.existsSync(mdxPath) ? mdxPath : mdPath
  const staticPath = path.join(root, 'public', 'static', 'images', `${slug}`)
  const source = fs.readFileSync(sourcePath, 'utf8')

  const { data, content } = matter(source)
  data.destinationDir = staticPath
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      filepath: staticPath,
      remarkPlugins: [
        require('remark-slug'),
        require('remark-normalize-headings'),
        [
          require('remark-autolink-headings'),
          {
            content: {
              type: 'element',
              tagName: 'span',
              properties: {
                className: [
                  'invisible',
                  'sm:visible',
                  'fas',
                  'fa-link',
                  'float-left',
                  'text-lg',
                  '-ml-8',
                  'pr-4',
                ],
              },
            },
          },
        ],
        require('remark-code-titles'),
        require('remark-math'),

        [
          require('remark-external-links'),
          {
            rel: ['nofollow', 'noopener'],
          },
        ],
        require('remark-gemoji'),
        // [writeTreeDebug, { slug, prefix: 'before' }],
        require('remark-mermaid'),
        require('remark-graphviz'),
        [
          imgToJsx,
          {
            sourcePath,
            slug,
          },
        ],
        // [writeTreeDebug, { slug, prefix: 'after' }],
      ],
      inlineNotes: true,
      rehypePlugins: [
        require('rehype-katex'),
        [
          // require('@mapbox/rehype-prism'),
          require('rehype-highlight'),
          {
            ignoreMissing: true,
          },
        ],
        // require('@jsdevtools/rehype-toc'),
        /* () => {
          return (tree) => {
            fs.writeFileSync(`${slug}-unist-tree.json`, JSON.stringify(tree, null, 2))

            visit(tree, 'element', (node, index, parent) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [tokenClassNames[type]]
              }
            })
          }
        }, */
      ],
    },
  })

  return {
    mdxSource,
    frontMatter: {
      readingTime: readingTime(content),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type) {
  const dirents = fs.readdirSync(path.join(root, 'data', type), { withFileTypes: true })
  const files = []
  dirents.forEach((file) => {
    if (file.isFile()) {
      files.push(file.name)
    }
  })
  const allFrontMatter = []

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'data', type, file), 'utf8')
    const { data } = matter(source)
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(file) })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
