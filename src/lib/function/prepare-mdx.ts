// @ts-nocheck
import path from "path"
import { remarkMdxImages } from 'remark-mdx-images'
import meta from 'meta.json'

// 获取代码的meta
const getRehypeMdxCodeMeta = async (toc) => {
    const { visit } = await import('unist-util-visit')

    return (options = {}) => {
        return tree => {
            visit(tree, 'element', visitor)
        }

        function visitor(node, index, parentNode) {
            // 处理标题
            if (node.tagName.includes('h')) {
                let id = node.children?.[0]?.value     
                let level = Number(node.tagName.match(/^h(\S*)/)[1]);
                let allow =  meta.article.catalogue.level.includes(level)                                                                                                                                                                          
                let addons = {
                    id,
                    level
                } 
                if (allow) {
                    node.properties = addons;
                    toc.push(addons)
                }
            }
            if (node.tagName === 'code' && node.data && node.data.meta) {
                const blocks = node.data.meta.split(' ') as string[]
                node.properties = blocks.reduce((props, block) => {                    
                    const [prop, value] = block.split('=')
                    if (typeof value === 'undefined') {
                        props.line = prop
                        return props
                    }
                    props[prop] = value
                    return props
                }, node.properties)
            }
        }
    }
}


export const prepareMDX = async (
    source: string,
    options: {
        files?: Record<string, string>
        directory?: string
        imagesUrl?: string
    }
) => {
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }
    const { bundleMDX } = await import('mdx-bundler');
    const { directory, imagesUrl } = options;
    console.log("图片地址", imagesUrl);
    
    const gfm = (await import('remark-gfm')) as any
    let toc = []
    const rehypeMdxCodeMeta = await getRehypeMdxCodeMeta(toc)
    const { code, errors, frontmatter, matter } = await bundleMDX({
        source,
        cwd: directory,
        xdmOptions: options => {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                gfm,
                remarkMdxImages
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeMdxCodeMeta
            ]
            return options
        },
        esbuildOptions: options => {
            options.outdir = path.join(process.cwd(), 'public', imagesUrl)
            options.loader = {
                ...options.loader,
                '.png': 'file',
                '.jpg': 'file',
                '.gif': 'file',
                '.mp4': 'file',
                '.MP4': 'file',
                '.jsx': 'jsx',
                '.tsx': 'tsx'
            }
            options.publicPath = imagesUrl
            options.write = true

            return options
        },
        grayMatterOptions: options => {
            options.excerpt = true

            return options
        }
    })
    
    if (errors.length > 0) {
        
        console.dir(errors.map(({ detail }) => detail))
    }
    
    return {code, toc}
}