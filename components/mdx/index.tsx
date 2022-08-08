
import React, { useEffect, useMemo } from 'react'
import type { ReactHTMLElement } from 'react'
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import { omit } from '@arcath/utils/lib/functions/pick'
import Code from 'lib/code'
import {
  ArticleHeading,
  Paragraph,
  Image,
  hoc,
  List,
  Blockquote,
  Codebox,
  FullBleed,
  Introduce
} from 'components/mdxComponents'
import { TocContext } from 'components/mdxPage'
import styled from 'styled-components'


const PreBlock = (preProps: Partial<ReactHTMLElement<HTMLPreElement>['props']>) => {
  const props = preToCodeBlock(preProps)
  if (props) {
    return <Code {...props as any} />
  }
  return <pre {...preProps} />
}

const Heading = (props) => {
  const { observer: o } = React.useContext<{ observer?: IntersectionObserver }>(TocContext);
  return <ArticleHeading  {...props} mounted={dom => o && o?.observe(dom)} unmount={dom => o && o?.unobserve(dom)} >{props.id}</ArticleHeading>
}



const Photo = (props) => {
  const PhotoWrapper = styled.span`
    display: inline-block;
    padding: 10px 10px 0;
    border: 1px solid var(--color-gray-100);
    margin: 0 0 20px;
    width: 100%;
  `;

  const ImgTipWrapper = styled.p`
    text-align: center;
    padding:  0 0 5px;
  `;
  const ImgTip = styled.span`
    display: inline-block;  
    text-align: left;
    color: var(--color-gray-700);
    font-size: 16px;
  `;

  return <PhotoWrapper>
    <Image {...props} type="photo" />
    <ImgTipWrapper >
      <ImgTip>
        {props.alt}
      </ImgTip>
    </ImgTipWrapper>
  </PhotoWrapper>
}
export const components = {
  img: Image,
  p: Paragraph,
  // a: Anchor,
  ol: hoc(List, { type: 'ol' }),
  ul: hoc(List, { type: 'ul' }),
  li: List.Item,
  pre: PreBlock,
  h2: Heading,
  h3: Heading,
  blockquote: Blockquote,
  Codebox: Codebox,
  FullBleed: FullBleed,
  Introduce: Introduce
}
const MDX: React.FC<{ source: string, type: "photo" | "article" }> = ({ source, type }) => {

  const Component = useMemo(() => getMDXComponent(source), [])

  useEffect(()=>{
    if (type === "photo") {
      components.img = (props)=><Image  type={type} {...props} />;
    }
  }, [type])

  return <Component components={components} />
}


const preToCodeBlock = (
  preProps: any
): {
  language: string
  codeString: string
  line?: string
  fileName?: string
  url?: string
  className: string
} => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.type === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props
    const matches = className.match(/language-(?<lang>.*)/)

    return {
      codeString: codeString.trim(),
      className,
      line: props.line,
      fileName: props.filename,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : '',
      ...omit(props, ['children'])
    }
  }
}


export default MDX;