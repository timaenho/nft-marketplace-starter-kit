import React, {Component}  from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider"
import '@metamask/legacy-web3'
import KryptoBird from '../abis/KryptoBird.json'


class App extends Component {
    // loads in the beginning
    async componentDidMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    // to manage the states
    constructor (props) {
        super(props)
        this.state = {
            account: '',
            contract: null
        }
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

    async loadBlockchainData(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts})

        //create a constant js variable networkId which is set to 
        // to the blockchain network id
        const networkId = await web3.eth.net.getId()
        const networkData = KryptoBird.networks[networkId]
        if(networkData){
            const abi = KryptoBird.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            console.log(contract)

           
        }else{
            console.log('no networkdata detected')
        }
    }

    render () {
        return (
            <div>
                <nav className= 'navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
                    <div className='navbar-brand col-sm-3 col-md-3 mr-3'style={{color:'white'}} >
                        Krypto Birdz NFTs (Non Fungible Tokens)
                    </div> 
                    <ul className='navbar-nav px-3'>
                    <li className='nav-item text-nowrap d-none d-sm-nome d-sm-block'>
                        <small className="text-white">
                            {this.state.account}
                        </small>
                    </li>
                </ul>
                </nav>
            </div>
        )
    }
}

export default App;