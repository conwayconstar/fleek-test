import { Html, Head, Main, NextScript } from 'next/document'


const scriptTxt = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')

  base.href = ipfsMatch ? ipfsMatch[0] : '/'
  document.head.append(base)
})();
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <script dangerouslySetInnerHTML={{__html: scriptTxt}}/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
