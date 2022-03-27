/*
 * @Author: Kanata You 
 * @Date: 2022-03-26 22:18:57 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 15:31:03
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Anchor } from '@components/common';
import Viewer from './components';


export interface MarkdownViewerProps {
  children: string;
}

const setIdByTextContent = (children: any) => {
  if (Array.isArray(children) && children.length === 1) {
    const textContent = children[0];

    return typeof textContent === 'string' ? (
      textContent.replace(/ /g, '-').replace(/[?!.#'"]/g, '').toLowerCase()
    ) : undefined;
  }
  
  return undefined;
};

const markdownComponentsMap: Required<ReactMarkdownOptions>['components'] = {
  a: ({ children, style, ...props }) => {
    if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
      return (
        <Anchor
          href={props.href ?? ''}
          internal={Boolean(props.href?.match(/^(\/|#).*$/))}
        >
          {children[0]}
        </Anchor>
      );
    }

    return (
      <a
        {...props}
        style={{
          ...style,
          margin: '0.3em 0.2em',
          display: 'inline-block'
        }}
      >
        {children}
      </a>
    );
  },
  p: ({ children, className: _, ...props }) => (
    <Viewer.p
      {...props}
    >
      {children}
    </Viewer.p>
  ),
  pre: ({ children, className: _, ...props }) => (
    <Viewer.pre
      {...props}
    >
      {children}
    </Viewer.pre>
  ),
  ul: ({ children, className: _, ...props }) => (
    <Viewer.ul
      {...props}
    >
      {children}
    </Viewer.ul>
  ),
  ol: ({ children, className: _, ...props }) => (
    <Viewer.ol
      {...props}
    >
      {children}
    </Viewer.ol>
  ),
  img: ({ className: _, src, alt }) => (
    <Viewer.img
      src={src ?? ''}
      alt={alt ?? ''}
    />
  ),
  h1: ({ children, className: _, ...props }) => (
    <Viewer.h1
      {...props}
      id={setIdByTextContent(children)}
    >
      {children}
    </Viewer.h1>
  ),
  h2: ({ children, className: _, ...props }) => (
    <Viewer.h2
      {...props}
      id={setIdByTextContent(children)}
    >
      {children}
    </Viewer.h2>
  ),
  h3: ({ children, className: _, ...props }) => (
    <Viewer.h3
      {...props}
      id={setIdByTextContent(children)}
    >
      {children}
    </Viewer.h3>
  ),
  h4: ({ children, className: _, ...props }) => (
    <Viewer.h4
      {...props}
      id={setIdByTextContent(children)}
    >
      {children}
    </Viewer.h4>
  ),
  h5: ({ children, className: _, ...props }) => (
    <Viewer.h5
      {...props}
      id={setIdByTextContent(children)}
    >
      {children}
    </Viewer.h5>
  ),
  h6: ({ children, className: _, ...props }) => (
    <Viewer.h6
      {...props}
      id={setIdByTextContent(children)}
    >
      {children}
    </Viewer.h6>
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={dark}
        language={match[1]}
        PreTag="pre"
        {...props}
      />
    ) : (
      <Viewer.inlineCode {...props} >
        {children}
      </Viewer.inlineCode>
    )
  },
  blockquote: ({ className: _, children, ...props }) => (
    <Viewer.blockQuote {...props} >
      {children}
    </Viewer.blockQuote>
  )
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ children }) => {
  return (
    <ReactMarkdown
      components={markdownComponentsMap}
    >
      {children}
    </ReactMarkdown>
  );
};


export default MarkdownViewer;
