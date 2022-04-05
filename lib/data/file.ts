// @ts-nocheck
import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { prepareMDX } from "lib/function/prepare-mdx";
import { asyncMap } from "@arcath/utils/lib/functions/async-map";
import { defaults } from "@arcath/utils/lib/functions/defaults";
export interface BaseProperties {
  bundleDir: string;
}

export type File<Frontmatter extends {}, Properties extends BaseProperties> = {
  readonly contents: Promise<string>;
  readonly data: Promise<Frontmatter & Properties>;
  readonly bundle: Promise<string>;
  readonly file: {
    directory: string;
    extension: string;
    path: string;
    rawContents: string;
  };
  readonly index: number;
  clear: () => void;
  getProperty: (property: keyof (Frontmatter & Properties)) => Promise<any>;
  readonly properties: Properties;
};

const fileCache: Record<string, File<any, any>> = {};

export const file = <Frontmatter extends {}, Properties extends BaseProperties>(
  filePath: string,
  properties: Properties
): File<Frontmatter, Properties> => {
  if (!fileCache[filePath]) {
    fileCache[filePath] = createFile(filePath, properties);
  }

  return createFile(filePath, properties);
};

const createFile = <Frontmatter extends {}, Properties extends BaseProperties>(
  filePath: string,
  properties: Properties
): File<Frontmatter, Properties> => {
  let rawContents: string;
  let contents: string;
  let frontmatter: Frontmatter;
  let bundle: string;
  let bundlePromise: Promise<string>;

  const getRawContents = async () => {
    rawContents = (await readFile(filePath)).toString();
  };

  const getContents = () => {
    const parsed = matter(rawContents);

    contents = parsed.content;
  };

  const getFrontmatter = () => {
    const parsed = matter(rawContents);

    frontmatter = parsed.data as any;
  };

  const clear = () => {
    rawContents = undefined;
    contents = undefined;
    frontmatter = undefined;
    bundle = undefined;
  };

  const file = {
    directory: path.dirname(filePath),
    extension: path.extname(filePath),
    path: filePath,
    rawContents,
  };
  return {
    properties,
    index: Object.keys(fileCache).length,
    file,
    clear,
    getProperty: async (property: keyof (Frontmatter & Properties)) => {
      if (properties.hasOwnProperty(property)) {
        return properties[property as keyof Properties];
      }

      if (typeof rawContents !== "string") {
        await getRawContents();
      }

      if (typeof frontmatter === "undefined") {
        getFrontmatter();
      }

      return frontmatter[property as keyof Frontmatter];
    },
    get contents(): Promise<string> {
      return (async () => {
        if (typeof rawContents !== "string") {
          await getRawContents();
        }

        if (typeof contents !== "string") {
          getContents();
        }

        return contents;
      })();
    },
    get data(): Promise<Frontmatter & Properties> {
      return (async () => {
        if (typeof rawContents !== "string") {
          await getRawContents();
        }

        if (typeof frontmatter === "undefined") {
          getFrontmatter();
        }

        return {
          ...frontmatter,
          ...properties,
        };
      })();
    },
    get bundle(): Promise<string> {
      return (async () => {
        if (typeof rawContents !== "string") {
          await getRawContents();
        }

        if (typeof contents !== "string") {
          getContents();
        }

        if (typeof bundle !== "string") {
          if (!bundlePromise) {
            bundlePromise = prepareMDX(contents, {
              directory: file.directory,
              imagesUrl: properties.bundleDir,
            });
          }

          bundle = await bundlePromise;
        }
        
        return bundle;
      })();
    },
  };
};

export interface ContentQueryParams<
  Frontmatter,
  Properties extends BaseProperties
> {
  limit: number | false;
  orderBy: keyof (Frontmatter & Properties);
  /** Only works if `limit` is defined */
  skip: number;
  order: "ASC" | "DESC";
}

export const getFiles = <
  Frontmatter extends {},
  Properties extends BaseProperties
>({
  directory,
  getProperties,
  defaultQueryParams,
  getFilePath,
}: {
  directory: string;
  getProperties: (filePath: string) => Properties;
  defaultQueryParams: ContentQueryParams<Frontmatter, Properties>;
  getFilePath?: (dir: string) => string;
}): ((
  query?: Partial<ContentQueryParams<Frontmatter, Properties>>
) => void) => {
  return async (query) => {
    const dirs = await readdir(directory);

    const { limit, orderBy, order, skip } = defaults(query, defaultQueryParams);

    let files = dirs.map((dir) => {
      const filePath = getFilePath
      ? getFilePath(dir)
      : path.join(directory, dir, 'index.mdx');
      return file(filePath, getProperties(filePath));
    });

    const sortOnMap = await asyncMap(files, async (entry, index) => {
      const value = await entry.getProperty(orderBy);
      return { index, value };
    });

    const sorted = sortOnMap.sort((a, b) => a.value - b.value);

    files = sorted.map(({ index }) => files[index]);

    if (order === "DESC") {
      files = files.reverse();
    }

    if (limit !== false) {
      files = files.slice(skip, skip + limit);
    }
    return files;
  };
};
