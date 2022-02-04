const {assert} = require('chai')


const KryptoBird = artifacts.require('./KryptoBird')

// check for chai

require('chai')
.use(require('chai-as-promised'))
.should()

contract ('KryptoBird', (accounts) => {
    let contract
    //before tells us to run this before anything else
    before( async () => {
            contract = await KryptoBird.deployed()
    }
    )

    // testing container - describe
    describe('deployment', async () => {
        //test samples with writing it
        it('deploys succesfully', async()=>{
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
        //test that the name matches on our contract using assert.equal function
        //test that the symbol matches with the assert.equal
        it('name contract matches', async()=>{
            const name = await contract.name()
            assert.equal(name, 'KryptoBird')
        })
        it('name symbol matches', async()=>{
            const symbol = await contract.symbol()
            assert.equal(symbol, 'KBIRDZ')
        })

    })

    describe ('minting', async () => {
        it ('creates a new token', async () =>{
            const result = await contract.mint('https...1')
            const totalSupply = await contract.totalSupply()

            //success
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from is the contract')
            assert.equal(event._to,accounts[0],'to is msg.sender')

            //failure
            await contract.mint('https...1').should.be.rejected
        })
    })

    describe('indexing', async () => {
            it('lists the KryptoBirdz', async() => {
                await contract.mint('https...2')
                await contract.mint('https...3')
                await contract.mint('https...4')
                const totalSupply = await contract.totalSupply()

                let result = []
                let KryptoBird
                for(i = 0; i < result.length; i++){
                 KryptoBird = await contract.kryptoBirdz[i]
                 result.push(KryptoBird)
                }
            })
    })




   
})