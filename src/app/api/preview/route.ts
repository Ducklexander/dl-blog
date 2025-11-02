// Location: src/app/api/preview/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const collection = searchParams.get('collection')
  const mode = searchParams.get('mode')

  if (mode === 'create') {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              background: #000;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
            }
            .container {
              text-align: center;
            }
            h1 {
              font-size: 2rem;
              margin-bottom: 1rem;
            }
            p {
              opacity: 0.7;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Preview Mode</h1>
            <p>Save your draft to see the live preview</p>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }

  return NextResponse.redirect(new URL('/', request.url))
}