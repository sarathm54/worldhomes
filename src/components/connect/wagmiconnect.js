import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { fetchToken } from '@wagmi/core'
import React, { useEffect } from 'react'
 
export default function WagmiConnect({connectedAddress}) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
  const [tokens, setTokens] = React.useState();

  useEffect(() => {
    if (isConnected) {
      console.log('inside connected useeffect !');
      connectedAddress(address);
    }
  }, [isConnected]);

  if (isConnected)
    return (
      <div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}
