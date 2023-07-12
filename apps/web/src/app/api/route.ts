import { NextResponse } from 'next/server'


export async function GET(request: Request) {
    const data = {
        'status': 'ok'
    }

    return NextResponse.json({ data })
}
