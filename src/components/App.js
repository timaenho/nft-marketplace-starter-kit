import React, {Component}  from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider"


class App extends Component {

    async componentDidMount(){
        await this.loadWeb3()
    }
    // first up is to detect ethereum provider
    async loadWeb3 () {
        const provider = await detectEthereumProvider();// call the methods ()
        // modern browsers
        // if there is a provider then lets log that it's working and access the window from the doc
        // to set Web3 to the provider

        if(provider){
            console.log('ethereum wallet is connected')
            window.web3 = new Web3(provider)
        }else{
            console.log('no ethereum wallet detected')
        }
    }

    render () {
        return (
            <div>
                <h1>NFT Marketplace</h1>
            </div>
        )
    }
}

export default App;