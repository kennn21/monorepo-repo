'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  // Set Dashboard as homepage, because this page is out of context
  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);
  return <></>;
}
