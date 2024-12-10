import { readChannelsJson } from '@/utils/io';
import { BACKEND } from '@/utils/logging';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const uploadId = req.url.split('/').pop();

    if (!uploadId) {
        return NextResponse.json({ error: 'Missing uploadId', status: 400 });
    }

    try {
        BACKEND.info(`Fetching channels for uploadId: ${uploadId}`);
        const channels = await readChannelsJson(uploadId as string);
        BACKEND.success(`Fetched channels!`);
        return NextResponse.json({ message: 'Server fetch Success', status: 200, data: {channels}});
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', status: 500 });
    }
}