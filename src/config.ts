
import { bitcoin, bitcoinTestnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { AppConfig, UserSession } from '@stacks/connect';

// Get projectId from environment variables
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  console.warn('Project ID is not defined')
}

// Metadata is optional
export const metadata = {
  name: 'Hall of Fame',
  description: 'Eternalize your achievements on the Stacks blockchain',
  url: 'https://halloffame.stacks', // This should be updated in production
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks = [bitcoin, bitcoinTestnet] as [AppKitNetwork, ...AppKitNetwork[]]

// Set up Bitcoin Adapter
export const bitcoinAdapter = new BitcoinAdapter({
  projectId: projectId || 'placeholder'
})

// Stacks Configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);

// Only instantiate UserSession on the client
export const userSession = typeof window !== 'undefined' 
  ? new UserSession({ appConfig }) 
  : undefined as unknown as UserSession;
