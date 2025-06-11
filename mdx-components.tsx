import type { MDXComponents } from 'mdx/types'
import type { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex'

import { Card } from '@/components/tweet-card'
import { BlockSideTitle } from '@/components/block-sidetitle'

export const components: Record<string, FC<any>> = {
  h1: (props) => (
    <h1
      className='font-semibold mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className='font-semibold mt-14 mb-7 text-rurikon-600 text-balance'
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className='mt-7 list-disc list-outside marker:text-rurikon-200 pl-5'
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className='mt-7 list-decimal list-outside marker:text-rurikon-200 pl-5'
      {...props}
    />
  ),
  li: (props) => <li className='pl-1.5' {...props} />,
  a: ({ href, ...props }) => {
    return (
      <Link
        className='break-words decoration-from-font underline underline-offset-2 decoration-rurikon-300 hover:decoration-rurikon-600 focus:outline-none focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-opacity-50 focus-visible:ring-offset-2'
        href={href}
        draggable={false}
        {...(href?.startsWith('https://')
          ? {
              target: '_blank',
              rel: 'noopener noreferrer',
            }
          : {})}
        {...props}
      />
    )
  },
  strong: (props) => <strong className='font-bold' {...props} />,
  p: (props) => <p className='mt-7' {...props} />,
  blockquote: (props) => (
    <blockquote
      className='pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 not-mobile:text-rurikon-400'
      {...props}
    />
  ),
  pre: (props) => (
    <pre className='mt-7 whitespace-pre md:whitespace-pre-wrap bg-rurikon-50 p-4 rounded overflow-x-auto' {...props} />
  ),
  code: (props) => {
    // Simple code component without any external dependencies
    return (
      <code 
        className='inline bg-rurikon-50 px-1.5 py-0.5 rounded text-[0.805rem] sm:text-[13.8px] md:text-[0.92rem] font-mono text-rurikon-700'
        {...props} 
      />
    )
  },
  Card,
  Image,
  img: async ({ src, alt, title }) => {
    let img: React.ReactNode

    if (src.startsWith('https://')) {
      img = (
        <Image
          className='mt-7'
          src={src}
          alt={alt}
          quality={95}
          placeholder='blur'
          draggable={false}
        />
      )
    } else {
      const image = await import('./assets/images/' + src)
      img = (
        <Image
          className='mt-7'
          src={image.default}
          alt={alt}
          quality={95}
          placeholder='blur'
          draggable={false}
        />
      )
    }

    if (title) {
      return <BlockSideTitle title={title}>{img}</BlockSideTitle>
    }

    return img
  },
  hr: (props) => <hr className='my-14 w-24 border-rurikon-border' {...props} />,
  BlockSideTitle,
  InlineMath,
  BlockMath,
}

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  }
}
