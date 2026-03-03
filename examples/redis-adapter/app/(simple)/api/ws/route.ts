import { headers } from 'next/headers';

export function GET() {
  const responseHeaders = new Headers();
  responseHeaders.set('Connection', 'Upgrade');
  responseHeaders.set('Upgrade', 'websocket');
  return new Response('Upgrade Required', { status: 426, headers: responseHeaders });
}

export async function UPGRADE(client: import('ws').WebSocket) {
  await headers();

  client.send(
    JSON.stringify({
      author: 'System',
      content: `Connected to instance ${process.env.INSTANCE_ID || 'unknown'}`,
    }),
  );
}
