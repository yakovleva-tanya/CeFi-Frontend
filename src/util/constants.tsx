export const serverURL = process.env.SERVER_URL || '';

const networkId = process.env.NODE_ENV === "development" ? 3 : 1;
export const BlockNativeOptions = {
  dappId: process.env.BLOCKNATIVE_API_KEY,
  networkId,
};

export const globalDecimals = 1000000000000000000;

export const plaidSettings = {
  env: process.env.PLAID_ENV,
  key: process.env.PLAID_KEY,
};


export const allContractAddresses = {
  ropsten: {
    LendingPool: '0x36645d9B62BC74ee21e8cCc164e0b01b13ca82A4',
    Lenders: '0x9ECFD823c4a70c200AB4e827ddB95e47Ac4bA699',
    TokenCollateralLoans: '0xA32009B1f1318E152Cb5FFA3870A724528C6FE14',
    EtherCollateralLoans: '0x574A37403Db51188793748f9253DD89AC1EA6339',
    LoanTermsConsensus: '0x3282B6468ABc25033e2ecF38C1E7c8eA2C8B4Fae',
    InterestConsensus: '0x3fCF22fe405D6d38d780Fb7527F5CBc08eEa1b17',
    Escrow: '0x32F7E00fef68283D8A9b78ea075Ed7539A263337',
    ChainlinkPairAggregator: '0x4c75fB9312D15e9420C12423c8bDF47Ff14AbF87',
    ATMGovernance: '0x1fdaa1B06d21A460Bc2fDF95223B7116BE517824',
    TLRToken: '0x05747e9CD72b95DF06D1D7cb466F2A9e43c9724f',
    EscrowFactory: '0x6be50eE25919169CbDc5c8ec5d1Bb16f0De2D8f0',
    ChainlinkPairAggregatorRegistry: '0xb785de72d3aE526A520d27b776062373F2f29f97',
    MarketsState: '0xB4077e7410e4dA1f85259d2902d0e12F0dF90B03',
    ATMSettings: '0x4905ba578671E9e4960E28a246A9CE235467Ce69',
    ATMFactory: '0x644Fe723F902756Fb6E3fbE218f4a3793Da17f88',
    MarketFactory: '0xE4c4C7291132861E4dab03D8972592A53847001C',
    Settings: '0x7Aa959677974f2974ad245369808dB4f461fC4b2',
    Settings_Proxy: '0x6f710D38d2f043A09bE9De7FBfbDd904E29577B8',
    EscrowFactory_Proxy: '0x1a648d2140a4703F27Af77E0346Fbdc22c9FdddF',
    ChainlinkPairAggregatorRegistry_Proxy: '0x5Dc721Bb3334A6e9CABeA1bd8A26BC82caFD7FC7',
    MarketsState_Proxy: '0x5D2eDb7dA2947e76de91243C12C77C1109Ca4330',
    ATMSettings_Proxy: '0xB594F1EC541118bD715d36787b3685a36E387975',
    ATMFactory_Proxy: '0x6f436f23D94b51E7F831AAB7feb2AaFdf96Ed934',
    MarketFactory_Proxy: '0xA4D04eA291489b840f85202000581c7eb0644348',
    LogicVersionsRegistry: '0x9F899CBD62b36c4A8627A696Be8C511C86051B68',
    LogicVersionsRegistry_Proxy: '0x81b4c8213C912f706c6855Afb6Ff40cdE404F701',
    TDAI: '0x54E8D8aAbbDD092dd0Af1c82829e567683f537b6',
    TUSDC: '0x843b009800f5fF4570D1820b9Dce88C15c5CFD35',
    ETH_Loans_tDAI_Proxy: '0x1eAd994d09788111eCee879a6d122352Eefd11b5',
    ETH_Lenders_tDAI_Proxy: '0xd5553A32DEB25210C1ED92eA8C4879960E8ED596',
    ETH_LendingPool_tDAI_Proxy: '0x79C5c4c097Ada551EFd872907bB5fA6b218AB18C',
    ETH_LoanTermsConsensus_tDAI_Proxy: '0x8e6520bb28765AAA1c766063e820e8Dc80A416DD',
    ETH_InterestConsensus_tDAI_Proxy: '0x8202cD77afBcE3F141Bf8124a82423b903C2F0AC',
    ETH_ChainlinkPairAggregator_tDAI_Proxy: '0xF4AD8d986B8A8c486CDdfFb998F840e0f9399337',
    LINK_Loans_tDAI_Proxy: '0x9B28849e609360137c19a07DF3d065901639d025',
    LINK_Lenders_tDAI_Proxy: '0x959923A51D47013e332B89aEd87b45157122485f',
    LINK_LendingPool_tDAI_Proxy: '0x0442c10CcFCe0a44e50A6D17BD8D79fcC41E729a',
    LINK_LoanTermsConsensus_tDAI_Proxy: '0x347B4Ce4548c22AFFc23a58D32890BAd7558DE01',
    LINK_InterestConsensus_tDAI_Proxy: '0x9059a2b66d103ce25b402e52E9F0aE1282a3e287',
    LINK_ChainlinkPairAggregator_tDAI_Proxy: '0xE2F4B648A12b4d136AE027b5749b17D029d260bF',
    ETH_Loans_tUSDC_Proxy: '0xDC50ef9cDb3D6266853B6209647777642D077152',
    ETH_Lenders_tUSDC_Proxy: '0x45E077357ef5ba1dE31c8d2Cb9fF7A28A9Ba2ce4',
    ETH_LendingPool_tUSDC_Proxy: '0xEC2d4365dbd4d45d51ea82e318de7F91fc7B0c4d',
    ETH_LoanTermsConsensus_tUSDC_Proxy: '0x6Be679843709993177C6F9D70081D6A5737B0E23',
    ETH_InterestConsensus_tUSDC_Proxy: '0xD4257D0493F76dC9FB28CF16b5Cf3ffaf9e28729',
    ETH_ChainlinkPairAggregator_tUSDC_Proxy: '0xab5b4Ee3c7fD49A7e32b8D0dC83cFcBf55CD32ca',
    LINK_Loans_tUSDC_Proxy: '0xAeB34CF85FD5Bf04756CE889e48a3f7b61F92915',
    LINK_Lenders_tUSDC_Proxy: '0x7d44bB9c7872332CD6bb0bf58e0BE2f4Ef053cE4',
    LINK_LendingPool_tUSDC_Proxy: '0xF5386627C7daa3d504d098E9131B8459bE03394b',
    LINK_LoanTermsConsensus_tUSDC_Proxy: '0x2dCe63FE0D642cC177bc82821977DeF8ab9a2426',
    LINK_InterestConsensus_tUSDC_Proxy: '0x69464b7D638e8088de6ef2D7B10210d0FF2D8B1F',
    LINK_ChainlinkPairAggregator_tUSDC_Proxy: '0xA18ECB1F4434D6dBA9cd09313112269a7222a54A',
    tokens: {
    // DAI used by Compound.finance
      DAI: '0xc2118d4d90b274016cB7a54c03EF52E6c537D957',
      // USDC used by Compound.finance
      USDC: '0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C',
      // LINK Faucet: https://ropsten.chain.link/
      LINK: '0x20fE562d797A42Dcb3399062AE9546cd06f63280',
    }
  },
  mainnet: {
    TDAI: '0xa53b393258F91a1f2a53F8838fB773f3638eDC50',
    TUSDC: '0x4f5e66230f5Bf1e977a0Bc70CFdDDA15A7a0436E',
    MarketsState: '0x2dbb3CE79D2B30A95e8c4f4c2DD24dC6c45C388c',
    Settings: '0x64970e2DfE88140C6D0037879795BEBccc6137c2',
    Settings_Proxy: '0x1D8F58d89C46562D9e6050c8ad0EEc93Dc8A2Db3',
    ATMSettings: '0xDaDa1F4c355204e92265F0029Aa00A37E07698ea',
    ATMFactory: '0xCa0BD777b4E96635B7b2C77c7E8BF1432AeB2a26',
    ATMFactory_Proxy: '0xd115921442914665D0cD245E4548cf2568791fD9',
    ATMGovernance: '0x3528e573402049A2c3514d31b7469457FA6Edd6a',
    ATMToken: '0xA3EB5D0EFbC6903B5407a5D2dA21F88056052632',
    ChainlinkPairAggregator_DAI_ETH: '0x9F8dAE794bB19161c5e8a466F766306E38189873',
    ChainlinkPairAggregator_USDC_ETH: '0x68408585FE2C879E2C290620eBBbd3d76ee13568',
    ChainlinkPairAggregator_USD_LINK: '0x0dA781292Daa1D8001d479f2E82BafA3A85BadFe',
    ETH_LendingPool_tDAI: '0x91AE009fd1275072D877145ab428D7f94b803f5C',
    ETH_LendingPool_tDAI_Proxy: '0xf44210580573a80F52a39faDFA8983b6593c1a20',
    ETH_InterestConsensus_tDAI: '0xE27db45A736e5B220844382e8779219475Bb4FC9',
    ETH_InterestConsensus_tDAI_Proxy: '0x8877C3D1e8C3Bb047A34aFD29326801F5EAD091F',
    ETH_Lenders_tDAI: '0x1a47f33B10c6312c4b90D2F9c30599A6f65bC777',
    ETH_Lenders_tDAI_Proxy: '0x61441c68c73B7Adc5af076b4d56050da7a767Ae8',
    ETH_LoanTermsConsensus_tDAI: '0x3a0eCfeDE617218C4b09a3fF8b2719D9Bf9cCC7d',
    ETH_LoanTermsConsensus_tDAI_Proxy: '0xE246BE938Ab50A6670F2ADce97A2A303a9aD182c',
    ETH_Loans_tDAI: '0x37502992cAceCAd4953CE712f3952b0Fb53a93dA',
    ETH_Loans_tDAI_Proxy: '0xB4Ac9F231D2469769A0a56eee5559Fd4613ed3fB',
    ETH_LendingPool_tUSDC: '',
    ETH_LendingPool_tUSDC_Proxy: '',
    ETH_InterestConsensus_tUSDC: '',
    ETH_InterestConsensus_tUSDC_Proxy: '',
    ETH_Lenders_tUSDC: '',
    ETH_Lenders_tUSDC_Proxy: '',
    ETH_LoanTermsConsensus_tUSDC: '',
    ETH_LoanTermsConsensus_tUSDC_Proxy: '',
    ETH_Loans_tUSDC: '',
    ETH_Loans_tUSDC_Proxy: '',
    LINK_LendingPool_tDAI: '',
    LINK_LendingPool_tDAI_Proxy: '',
    LINK_InterestConsensus_tDAI: '',
    LINK_InterestConsensus_tDAI_Proxy: '',
    LINK_Lenders_tDAI: '',
    LINK_Lenders_tDAI_Proxy: '',
    LINK_LoanTermsConsensus_tDAI: '',
    LINK_LoanTermsConsensus_tDAI_Proxy: '',
    LINK_Loans_tDAI: '',
    LINK_Loans_tDAI_Proxy: '',
    LINK_LendingPool_tUSDC: '0xAB51D53E504459B798F7B68f6E85947D928b6dFA',
    LINK_LendingPool_tUSDC_Proxy: '0xC2BCE420cdD58a73e76733F0f7D31C5CA156e62D',
    LINK_InterestConsensus_tUSDC: '0x90bf2D78cf97c446FDCFC15f24790Cff40603622',
    LINK_InterestConsensus_tUSDC_Proxy: '0x22F1d1C7894Db669F71c692e3356712697C5F622',
    LINK_Lenders_tUSDC: '0x7DE442f0d9Ba7C1C61E76E676369771bB18865f8',
    LINK_Lenders_tUSDC_Proxy: '0x5720E10298463D0D7F7037AFf0204321636dABAD',
    LINK_LoanTermsConsensus_tUSDC: '0xB258A8f04FeA3721b5739af48020c6051CD4Aa49',
    LINK_LoanTermsConsensus_tUSDC_Proxy: '0xEA786499f00AF3Fa7fDEB974Df8815B068B03e9C',
    LINK_Loans_tUSDC: '0xd49165870FdE7A359B3816ECd223E4A16De7ED31',
    LINK_Loans_tUSDC_Proxy: '0xd4ebaA493564f6F1acAA754D2898B6879dB624B7',
    tokens: {
      // See https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f
      DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
      // See https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
      USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      // See https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca
      LINK: '0x514910771af9ca656af840dff83e8264ecf986ca',
    }
  }
};

export const dataProvidersURLs = {
  bankInfo: process.env.DATA_PROVIDERS_URL || '',
};

export const craURLs = {
  arrowhead: process.env.CRA_URLS_ARROWHEAD || '',
};

export default {
  craURLs,
  serverURL,
  BlockNativeOptions,
  globalDecimals,
  allContractAddresses,
  plaidSettings,
  dataProvidersURLs,
};
