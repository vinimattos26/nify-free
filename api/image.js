import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'Amiga';
  
  // sua imagem base do Imgur
  const backgroundUrl = 'https://i.imgur.com/3OZN2d8.png';

  return new ImageResponse(
    (
      <div
        style={{
          width: '800px',
          height: '600px',
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 64,
          fontFamily: 'sans-serif',
          color: 'black',
          fontWeight: 'bold',
          textShadow: '2px 2px 10px rgba(255,255,255,0.9)',
        }}
      >
        {name}
      </div>
    ),
    {
      width: 800,
      height: 600,
    }
  );
}
