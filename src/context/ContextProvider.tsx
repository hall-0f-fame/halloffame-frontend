'use client'

import { createAppKit } from '@reown/appkit/react'
import { networks, projectId, metadata, bitcoinAdapter } from '@/config'
import React, { type ReactNode } from 'react'
import { Connect } from '@stacks/connect-react';
import { userSession } from '@/config';

if (!projectId) {
  console.warn('Project ID is not defined')
}

// Create AppKit instance
createAppKit({
  adapters: [bitcoinAdapter],
  networks,
  metadata,
  projectId: projectId || 'placeholder',
  themeMode: 'dark',
  features: {
    analytics: true, 
    email: false,
    socials: []
  },
  themeVariables: {
    '--w3m-accent': '#8b5cf6', // Violet matching our theme
    '--w3m-border-radius-master': '1px'
  }
})

function ContextProvider({ children }: { children: ReactNode }) {
  const authOptions = {
    appDetails: {
      name: "Hall of Fame",
      icon: typeof window !== 'undefined' ? window.location.origin + '/next.svg' : '/next.svg',
    },
    userSession,
  };

  return (
    <Connect authOptions={authOptions}>
      {children}
    </Connect>
  )
}

export default ContextProvider
