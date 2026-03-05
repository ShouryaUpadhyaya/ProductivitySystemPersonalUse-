'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';

type Props = { children: React.ReactNode };

export default function QueryProvider({ children }: Props) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
