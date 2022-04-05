import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import {
  CodeLine,
  CodeSnippetOuterWrapper,
  StaticCodeSnippet,
  StaticCodeSnippetInertEditor,
  StaticCodeWrapper,
  StaticCodeWrapperLanguage,
} from "./style";
import { theme } from "./theme";
// className: "language-ts"
// codeString: "const fileCache: Record<string, File<any, any>> = {}\r\n\r\nexport const file = <Frontmatter extends {}, Properties extends {}>(\r\n  filePath: string,\r\n  properties: Properties\r\n): File<Frontmatter, Properties> => {\r\n  if (!fileCache[filePath]) {\r\n    fileCache[filePath] = createFile(filePath, properties)\r\n  }\r\n\r\n  return fileCache[filePath] as File<Frontmatter, Properties>\r\n}"
// fileName: "lib/data/file.ts"
// filename: "lib/data/file.ts"
// language: "ts"
// line: undefined

const Code: React.FC<{
  className: string;
  codeString: string;
  line?: string;
  fileName?: string;
  url?: string;
  language: Language;
}> = ({ className, codeString, line, fileName, url, language }) => {
  
  return (
    <pre>
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          return (
            <CodeSnippetOuterWrapper className={className} style={style}>
              <StaticCodeWrapperLanguage>{language}</StaticCodeWrapperLanguage>
              <StaticCodeWrapper>
                <StaticCodeSnippetInertEditor>
                  <textarea defaultValue={codeString} ></textarea>
                  <pre>
                    {tokens.map((line, i) => {
                      return (
                        <CodeLine key={i} {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => {
                            return <span key={key} {...getTokenProps({ token, key })} />;
                          })}
                        </CodeLine>
                      );
                    })}
                  </pre>
                </StaticCodeSnippetInertEditor>
              </StaticCodeWrapper>
            </CodeSnippetOuterWrapper>
          );
        }}
      </Highlight>
    </pre>
  );
};

export default Code;
