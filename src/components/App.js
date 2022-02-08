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
            contract: null,
            totalSupply: 0,
            kryptoBirdz: []

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
            this.setState({contract: contract})
          

            // call the total supply of our KryptoBirdz
            // grab the total supply on the front end and log the results
            // go to web3 doc and read up on methods and call
            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({totalSupply: totalSupply})

            //load KryptoBirdz for us
            for(let i = 0; i < totalSupply; i++) {
                const KryptoBird = await contract.methods.kryptoBirdz(i).call()
                //how should we handle the state ont the front end?
                this.setState({
                    kryptoBirdz: [...this.state.kryptoBirdz, KryptoBird]
                })   
            }
                    console.log(this.state.kryptoBirdz) 
        // error handling         
        }else{
            window.alert('Smart contract not deployed')
        }
    }

    // with minting we are sending information and we need to specify the account 

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