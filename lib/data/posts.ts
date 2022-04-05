import { getFiles, BaseProperties, file } from './file'
import path from 'path';

export interface PostProperties extends BaseProperties {
    /** The posts slug, used for linking */
    slug: string
    year: string
    month: string
    href: string
}
export interface PostFrontmatter {
    title: string
    content: string
    date: Date
    lead: string
    tags: string[]
  }
/** post direction */
const POSTS_DIRECTORY = path.join(process.cwd(), '_content', 'posts')

const postProperties = (filePath: string): PostProperties => {
    const directory = path.dirname(filePath);
    const dir = path.basename(directory);

    const [year, month, ...slug] = dir.split('-')
    const href = '/' + [year, month, slug.join('-')].join('/')
    return {
        slug: slug.join('-'),
        year,
        month,
        href,
        bundleDir: `/img/posts${href}/`
    }
}

export const getPosts = getFiles<PostFrontmatter, PostProperties>({
    directory: POSTS_DIRECTORY,
    getProperties: postProperties,
    defaultQueryParams: {
      limit: 10,
      orderBy: 'date',
      skip: 0,
      order: 'DESC'
    }
});

export const getPost = (filePath: string) => {
    return file<PostFrontmatter, PostProperties>(
      filePath,
      postProperties(filePath)
    )
  }

export const getPostFromTitle = (year: string, month: string, title: string) => {
    const filePath = path.join(
      POSTS_DIRECTORY,
      [year, month, title].join('-'),
      'index.mdx'
    )
  
    return getPost(filePath)
  }
  