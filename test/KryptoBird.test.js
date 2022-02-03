const {assert} = require('chai')


const KryptoBird = artifacts.require('./KryptoBird')

// check for chai

require('chai')
.use(require('chai-as-promised'))
.should()

contract ('KryptoBird', (accounts) => {
    let contract

    // testing container - describe
    describe('deployment', async () => {
        //test samples with writing it
        it('deploys succesfully', async()=>{
            contract  = await KryptoBird.deployed()
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
        it('name contract matches', async()=>{
            const name = await contract.name()
            assert.equal(name, 'KryptoBird')
        })
        it('name symbol matches', async()=>{
            const symbol = await contract.symbol()
            assert.equal(symbol, 'KBIRDZ')
        })

    })

    //test that the name matches on our contract using assert.equal function
    //test that the symbol matches with the assert.equal
    //
})