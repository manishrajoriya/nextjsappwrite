import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDb from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup' 

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
    await Promise.all([
        getOrCreateDb(),
        getOrCreateStorage()
    ])
  
  
    return NextResponse.next()
}
// See "Matching Paths" below to learn more
export const config = {
    // match all request paths except for the one that starts with:
    // -api
    // -_next/static
    // -_next/image
    // -favicon.ico
    // (this is the default value)
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}
