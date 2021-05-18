import React, { useEffect } from "react"
import {AuthCluster} from "./AuthCluster"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

function App() {

  useEffect(() => {
    async function runScript() {
      let x = await fcl
      .send([
        fcl.script`
          import Profile from 0xba1132bc08f82fe2
    
          pub fun main(address: Address): Profile.ReadOnly? {
            return Profile.read(address)
          }
        `,
        fcl.args([
          fcl.arg("0xba1132bc08f82fe2", t.Address), // <-- t.Address this time :)
        ]),
      ])
      .then(fcl.decode)
    
      console.log(x)
    }

    runScript();
    
  }, []);
  return (
    <div>
      <AuthCluster />
    </div>
  )
}

export default App;
