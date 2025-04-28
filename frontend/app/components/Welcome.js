'use client';

import dynamic from 'next/dynamic';
const PlayerChart = dynamic(() => import('./PlayerChart'), { ssr: false });

export default function Welcome() {
  return (
      <div className="w-full max-w-6xl">
        <PlayerChart/>
    </div>
  );
}
