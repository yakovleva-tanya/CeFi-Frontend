export const serverURL = process.env.SERVER_URL || "";

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const networkId = process.env.NODE_ENV === "development" ? 4 : 1;
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
    LendingPool: "0xBf984040ad76cda8f5514BC29F451458EC7bcb80",
    Lenders: "0x16dEa6C4CbD07732Da0B0174A9df97B6aDF80d2D",
    TokenCollateralLoans: "0xdDCA72AF6Ab0c281499cfdf508ad95C3F3A14CA4",
    EtherCollateralLoans: "0xBff73C7aED1C5C1267863f41196449e99F4Eb50a",
    LoanTermsConsensus: "0x2B0AaCcdF372458de62b9F7726AB2E49A13134d2",
    InterestConsensus: "0x0A04f75262D3E065f35617f1AF957800dA10d925",
    Escrow: "0xE8Ce266eB095CaF1E42c4390b99e45458E08eF0c",
    ChainlinkPairAggregator: "0x7456Df6bd3C520e135f09c2d01F310975d6E1B81",
    ATMGovernance: "0x40741Ed603A53A063471b1436D3742adb5F680e7",
    TLRToken: "0xB419dF00BAb2767Ae41d24c2A1a7740d43F847E3",
    Uniswap: "0xAb52a75D9921c375aa55AD4d8CEFf0a3D46E2b85",
    Compound: "0xE167A7C25D9Ec73A8D6CcC74C5e125A1cf546DF8",
    EscrowFactory: "0xf2D8cAA3987d8d8A9Ff40CAE78A9212DE5Fd90ED",
    ChainlinkPairAggregatorRegistry: "0xBa41ED6fDff508F9816061C83cEd4416Eae3DD16",
    MarketsState: "0x6ae28f68Fc45f3A0aE2d1Ce960574af7a64c4167",
    ATMSettings: "0x6dB186a550e2873389Bc2036fe0AaA6aa9e0C30f",
    ATMFactory: "0x8a7D9419EdfCfE017D0CCd8db94821E04b65B99a",
    MarketFactory: "0xb438437a7547da334Af96A1cf552C3b9854E2A31",
    TTokenRegistry: "0x218101ddA7731A1765878b9aCb2a9f408e48A8A6",
    Settings: "0x43C0C7DE99278574aB6CCf6d8A744e291Cae3a0D",
    Settings_Proxy: "0x9DaBEDd013686870D097bfEc7a79032423ba2Cd5",
    EscrowFactory_Proxy: "0xB9ED38f01E6025ac2d337Df7746fDDb936d19733",
    ChainlinkPairAggregatorRegistry_Proxy: "0x514e36540dA457736d75f22d38A8345375Dd9cBB",
    MarketsState_Proxy: "0xE70874Ef191e031879931a4641BD7494e79e0b45",
    ATMSettings_Proxy: "0x4EDf8fc0eF937a0Df126e1F66a01f99299d23695",
    ATMFactory_Proxy: "0x3c2Aa53805879F42aC5fdcF908C31c9d82B6Fd59",
    MarketFactory_Proxy: "0xE560dBf3Ee2215927bcCd594445EBd25bF31EB75",
    TTokenRegistry_Proxy: "0x7cB6A52FDeC9F93e5cA6eB85aAd57C68844a968F",
    LogicVersionsRegistry: "0x4cF4820Bb0995B7E90976C2D6a438650B5637b9A",
    LogicVersionsRegistry_Proxy: "0xa9cE32238f8FbF4791434894ad1596b226aE19e6",
    Uniswap_Proxy: "0x8a9cB9D3e779dbBB53Ba1F1d45C82eFD85a446f9",
    Compound_Proxy: "0x75f0aAc4ede78b24B463B1583Be6ea6d93cE49E8",
    TDAI: "0xA1CF9E7bAb20728C6Cad26bc49d47436e00ABC5C",
    TUSDC: "0x0fA4d25B0b1A3A898941dAbea54F7AB61a073830",
    ETH_Loans_tDAI_Proxy: "0x8d1dA48949DBEa380088e1afa5c29922C25e2B89",
    ETH_Lenders_tDAI_Proxy: "0x6745Cfb750C9473D6b4c0A1bE834a47836cb0d51",
    ETH_LendingPool_tDAI_Proxy: "0x29a3Dbc9e5406210d4585aF1a4Fb30FA2c6ee79f",
    ETH_LoanTermsConsensus_tDAI_Proxy: "0xc7bE6644AB950c3fB4BB6A8E51f63c282cBc8d41",
    ETH_InterestConsensus_tDAI_Proxy: "0xE6f355FC07DE0a6F74Ae4C0145F7a1EA7Adb3055",
    ETH_ChainlinkPairAggregator_tDAI_Proxy: "0x0D740beaA912d4ed01e17c7054B1F9B4a4105aF2",
    LINK_Loans_tDAI_Proxy: "0x28059596170059737008B733750D9d3Ca570494C",
    LINK_Lenders_tDAI_Proxy: "0xF7fF431F4d4e6017adad88d8d39A8991883c6c07",
    LINK_LendingPool_tDAI_Proxy: "0xBB17a57B29a982ed80c5f1618BFD388083196803",
    LINK_LoanTermsConsensus_tDAI_Proxy: "0x596805E674D02DF034cDA266C5a34965E7DDa92C",
    LINK_InterestConsensus_tDAI_Proxy: "0x0946fFCF4dA21C243B09C0E7A50977fD3F0cd691",
    LINK_ChainlinkPairAggregator_tDAI_Proxy: "0xE554adD5e0b4777681F06777F58592303D03dced",
    ETH_Loans_tUSDC_Proxy: "0x137B32F8Cd223eB748e9954605A5023FA4363066",
    ETH_Lenders_tUSDC_Proxy: "0xa1eDD9c28381176038e1FD0F2845E17505C75d05",
    ETH_LendingPool_tUSDC_Proxy: "0x4fAB12ac0bf955Bd432a5Fd8072c931Bd18477e3",
    ETH_LoanTermsConsensus_tUSDC_Proxy: "0x59B74ac1e232100b6593f6A543fb00Ab765C40ab",
    ETH_InterestConsensus_tUSDC_Proxy: "0xD2a5776f8ac637Cb81d28F80429AA49073F0F25b",
    ETH_ChainlinkPairAggregator_tUSDC_Proxy: "0x529587ECA7747b976F7672eC665663CA867a8b6b",
    LINK_Loans_tUSDC_Proxy: "0x9341c050AFE9614c28B8A2e13776d09ebE64A5F8",
    LINK_Lenders_tUSDC_Proxy: "0xdA1A9DacfE6cCEDFc41B68b717b60104f6ea1770",
    LINK_LendingPool_tUSDC_Proxy: "0xcdC34B465FE5FeEEdf09481F1D0E8e5C5BacD706",
    LINK_LoanTermsConsensus_tUSDC_Proxy: "0x32A58F91286a7F9c260a98754dbC6a6d879292B3",
    LINK_InterestConsensus_tUSDC_Proxy: "0x7bC7D6EDD2e26F4d3DEc2e56065A61400fcFb43D",
    LINK_ChainlinkPairAggregator_tUSDC_Proxy: "0x0168CF9b4992b5F38F659C5a3313342AF9EcFbb9",
    tokens: {
      // DAI used by Compound.finance
      DAI: "0xc2118d4d90b274016cB7a54c03EF52E6c537D957",
      // USDC used by Compound.finance
      USDC: "0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C",
      // LINK Faucet: https://ropsten.chain.link/
      LINK: "0x20fE562d797A42Dcb3399062AE9546cd06f63280",
      // TODO confirm token addresses
      SNX: "0x65bAd0f094f2Cce90a2BD757372932CdaF079213",
      MKR: "0x626e11f94bf498d79b3afcd06cdaf8577f19d794",
      YFI: "0xbeade56abd45cab4f84b239af784149a29311741",
      LEND: "0x73317bccdd6186b705c07f8306d5121011f84698",
      wBTC: "0x06E728D7907C164649427D2ACFD4c81669D453Bf",
      USDT: "0x7c619efddb1b941ec124508421d0034436ed00c1",
    },
  },
  rinkeby: {
    LendingPool: "0x82B0636041Bb429F3E442Eaca66D018e9fA244cD",
    Lenders: "0x02d8349de495f52F1CA53552677f407F8Eccf7a8",
    TokenCollateralLoans: "0x145A1EC76fF83F500D59a013BbD6443cC6251ced",
    EtherCollateralLoans: "0x36cc07e49CBa1ebC575C228c5F61D627B4b8B61f",
    LoanTermsConsensus: "0x8125a2260276298DE10d13d987D966ee95491CC2",
    InterestConsensus: "0xaA51EC6d745cc8cA352C8d16960f4240316bfF45",
    Escrow: "0x82AC149a496bF79d95A5bA5709afd97ed9aD3aAC",
    ChainlinkPairAggregator: "0x3E8Be78D9F5D22aF1157621C2bf34CBb29eE930e",
    ATMGovernance: "0xbDA597C3A1CEF28E175f2A5e28Aebe1370393C98",
    TLRToken: "0x53762Da54Aa79929928AC1E5a5201A90c3714C20",
    Uniswap: "0xe92C8447c98E514092c0e95A69DD8238542a0D8C",
    Compound: "0x701720465316Dd62d44dB8CEEE16c94A64AAb792",
    EscrowFactory: "0x6313e22897EE4Cf5Fc11d20F3373958f6ac25e3B",
    ChainlinkPairAggregatorRegistry: "0x1f6418F9A285E008d3D3D69E0dBCb19B693d1439",
    MarketsState: "0x95E7f0217812315251B5a9dC49329c19c8f4CEC8",
    ATMSettings: "0xC828954eDF97c02222a41efC0C56F7E294f38735",
    ATMFactory: "0xe52385A2194A94DFFcffC684B4E65130106F7221",
    MarketFactory: "0xAE7D2d40ECD61A3CB57B94bBD2f2A0A2Ae63d288",
    TTokenRegistry: "0x6d4eD6Cf9311e64616Da12A4029554dfc7481F08",
    Settings: "0x2842a45C1eba833dB83DaB13D57F642eB3BbD901",
    Settings_Proxy: "0x5045508E4B6532001219c2a75A2d31878BB86341",
    EscrowFactory_Proxy: "0x0e41ABdD5B1aB54F4B3c299540aD9780f5f9889E",
    ChainlinkPairAggregatorRegistry_Proxy: "0x3bad91314051C213a2670E30fc23058A75BD50B3",
    MarketsState_Proxy: "0xC937693B57f27fe688D8b9F94A2F818176cF70A1",
    ATMSettings_Proxy: "0xFe8AdB7693189Addce2d482Be496417FB7af7c0d",
    ATMFactory_Proxy: "0x67Ab9e1287D02ceC15C2f233C66a8D3b25083320",
    MarketFactory_Proxy: "0x3eB40638Fa4b6da5F759804981034B22fbc69FDf",
    TTokenRegistry_Proxy: "0x112EF80D872016A9DC9bfCa5a5b59983ACb05b59",
    LogicVersionsRegistry: "0xfd88eAbE929fC91e1de083456FF7E2541363b26a",
    LogicVersionsRegistry_Proxy: "0x4377A77e8C91a26611DCEE52821D4FA070d6f523",
    Uniswap_Proxy: "0xD3C5a0A61390E10A0dB29852cA5F6F32aafde5ee",
    Compound_Proxy: "0x22374D40CF925B62AE9725a1B72C32Fa4d4A8aF4",
    TDAI: "0x7186cd81C54bC8F0698e6bB36d0738D02E4FFdAb",
    TUSDC: "0xf6448Ed9F6f2D578baF80D14B658Df8cED352164",
    ETH_Loans_tDAI_Proxy: "0x8A7B29C41eBf45753F4db351A54C53a081E01383",
    ETH_Lenders_tDAI_Proxy: "0xf8f603BCEb9EAda302C7C7c22a48E4C31f4BCbeb",
    ETH_LendingPool_tDAI_Proxy: "0x29b7a38DcB0e9C36650ac9A9EE9b1528CAbc44CA",
    ETH_LoanTermsConsensus_tDAI_Proxy: "0xc909a3E2f6b8829F093EF4d37d98170C529d263d",
    ETH_InterestConsensus_tDAI_Proxy: "0xe6cc2D43FC5cB1Cf981fA6Dde91136E45de9C9f3",
    ETH_ChainlinkPairAggregator_tDAI_Proxy: "0xb27f740008eD0AB90ac48ac76d26C8F5517AF53E",
    LINK_Loans_tDAI_Proxy: "0xcF776d087612643341f3a88fB1c17A8170bc4731",
    LINK_Lenders_tDAI_Proxy: "0xAAF70288c932772ac4fF48F1a092ba86a6e651E1",
    LINK_LendingPool_tDAI_Proxy: "0x9b389A9643601810895f6349754A77E0f0E6b75c",
    LINK_LoanTermsConsensus_tDAI_Proxy: "0x495AA74df33b00C7c35C9ebf2606411C2d9091a4",
    LINK_InterestConsensus_tDAI_Proxy: "0x88d2CEcff89D5005Ce351dc2391014215030B1f7",
    LINK_ChainlinkPairAggregator_tDAI_Proxy: "0x5Fc2E30eCd8a5E87AB4c1058a73786aacF759C55",
    ETH_Loans_tUSDC_Proxy: "0xAFe381E7344D6E4c1521a5fF7f0d27209077c7c1",
    ETH_Lenders_tUSDC_Proxy: "0xd23CB93b6f7BedD82eC2Cd9033e5dc7ebABEB71D",
    ETH_LendingPool_tUSDC_Proxy: "0x0EbA6d2545Baa95cE6A34B6f8fa8b73Ed2B7EC5e",
    ETH_LoanTermsConsensus_tUSDC_Proxy: "0x46AadADb4462EF14aba3aEe4BbBBA6b6b4a8c37D",
    ETH_InterestConsensus_tUSDC_Proxy: "0xb59335814A50a5cff91121e4D1eC6C24A55a29e5",
    ETH_ChainlinkPairAggregator_tUSDC_Proxy: "0x9Cd4AD6393D18f307994993510b3bC96f9ab9c6a",
    LINK_Loans_tUSDC_Proxy: "0x15250696d6bc8b1A714cbFfC209Eb4Cde5407FE9",
    LINK_Lenders_tUSDC_Proxy: "0x191551689908f0EafBb8B62da9b07406B90A6270",
    LINK_LendingPool_tUSDC_Proxy: "0xA86BE33014e54C446911Ce4B6293367d5e0e5694",
    LINK_LoanTermsConsensus_tUSDC_Proxy: "0xbe32641ea13030B635009EeAae7E7c756fB606a9",
    LINK_InterestConsensus_tUSDC_Proxy: "0x367083D6cACac45a6D23736f8Baae71664F8e5b0",
    LINK_ChainlinkPairAggregator_tUSDC_Proxy: "0x6B9ccd3b97796863A0C6Ab3c73fcAd2Df62EA473",
    tokens: {
      ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      DAI: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
      USDC: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
      LINK: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
      // TODO confirm token addresses
      SNX: "0x3cA27cEEDA9A200f50C3Cf3802C6c60d43867977",
      MKR: "0x65e09e4260d81bc58c585eba67b7a8d71020d4ec",
      YFI: "0x62289c64a943416205142bdccf1d752792a687e3",
      LEND: "0x5373cdced6dd1b1cbf3ca2c85b8eab57052df7a4",
      wBTC: "0x0014f450b8ae7708593f4a46f8fa6e5d50620f96",
      USDT: "0x1a37dd375096820a5fde14342720102c07100f26",
    },
  },
  mainnet: {
    TDAI: "0xa53b393258F91a1f2a53F8838fB773f3638eDC50",
    TUSDC: "0x4f5e66230f5Bf1e977a0Bc70CFdDDA15A7a0436E",
    MarketsState: "0x2dbb3CE79D2B30A95e8c4f4c2DD24dC6c45C388c",
    Settings: "0x64970e2DfE88140C6D0037879795BEBccc6137c2",
    Settings_Proxy: "0x1D8F58d89C46562D9e6050c8ad0EEc93Dc8A2Db3",
    ATMSettings: "0xDaDa1F4c355204e92265F0029Aa00A37E07698ea",
    ATMFactory: "0xCa0BD777b4E96635B7b2C77c7E8BF1432AeB2a26",
    ATMFactory_Proxy: "0xd115921442914665D0cD245E4548cf2568791fD9",
    ATMGovernance: "0x3528e573402049A2c3514d31b7469457FA6Edd6a",
    ATMToken: "0xA3EB5D0EFbC6903B5407a5D2dA21F88056052632",
    ChainlinkPairAggregator_DAI_ETH:
      "0x9F8dAE794bB19161c5e8a466F766306E38189873",
    ChainlinkPairAggregator_USDC_ETH:
      "0x68408585FE2C879E2C290620eBBbd3d76ee13568",
    ChainlinkPairAggregator_USD_LINK:
      "0x0dA781292Daa1D8001d479f2E82BafA3A85BadFe",
    ETH_LendingPool_tDAI: "0x91AE009fd1275072D877145ab428D7f94b803f5C",
    ETH_LendingPool_tDAI_Proxy: "0xf44210580573a80F52a39faDFA8983b6593c1a20",
    ETH_InterestConsensus_tDAI: "0xE27db45A736e5B220844382e8779219475Bb4FC9",
    ETH_InterestConsensus_tDAI_Proxy:
      "0x8877C3D1e8C3Bb047A34aFD29326801F5EAD091F",
    ETH_Lenders_tDAI: "0x1a47f33B10c6312c4b90D2F9c30599A6f65bC777",
    ETH_Lenders_tDAI_Proxy: "0x61441c68c73B7Adc5af076b4d56050da7a767Ae8",
    ETH_LoanTermsConsensus_tDAI: "0x3a0eCfeDE617218C4b09a3fF8b2719D9Bf9cCC7d",
    ETH_LoanTermsConsensus_tDAI_Proxy:
      "0xE246BE938Ab50A6670F2ADce97A2A303a9aD182c",
    ETH_Loans_tDAI: "0x37502992cAceCAd4953CE712f3952b0Fb53a93dA",
    ETH_Loans_tDAI_Proxy: "0xB4Ac9F231D2469769A0a56eee5559Fd4613ed3fB",
    ETH_LendingPool_tUSDC: "",
    ETH_LendingPool_tUSDC_Proxy: "",
    ETH_InterestConsensus_tUSDC: "",
    ETH_InterestConsensus_tUSDC_Proxy: "",
    ETH_Lenders_tUSDC: "",
    ETH_Lenders_tUSDC_Proxy: "",
    ETH_LoanTermsConsensus_tUSDC: "",
    ETH_LoanTermsConsensus_tUSDC_Proxy: "",
    ETH_Loans_tUSDC: "",
    ETH_Loans_tUSDC_Proxy: "",
    LINK_LendingPool_tDAI: "",
    LINK_LendingPool_tDAI_Proxy: "",
    LINK_InterestConsensus_tDAI: "",
    LINK_InterestConsensus_tDAI_Proxy: "",
    LINK_Lenders_tDAI: "",
    LINK_Lenders_tDAI_Proxy: "",
    LINK_LoanTermsConsensus_tDAI: "",
    LINK_LoanTermsConsensus_tDAI_Proxy: "",
    LINK_Loans_tDAI: "",
    LINK_Loans_tDAI_Proxy: "",
    LINK_LendingPool_tUSDC: "0xAB51D53E504459B798F7B68f6E85947D928b6dFA",
    LINK_LendingPool_tUSDC_Proxy: "0xC2BCE420cdD58a73e76733F0f7D31C5CA156e62D",
    LINK_InterestConsensus_tUSDC: "0x90bf2D78cf97c446FDCFC15f24790Cff40603622",
    LINK_InterestConsensus_tUSDC_Proxy:
      "0x22F1d1C7894Db669F71c692e3356712697C5F622",
    LINK_Lenders_tUSDC: "0x7DE442f0d9Ba7C1C61E76E676369771bB18865f8",
    LINK_Lenders_tUSDC_Proxy: "0x5720E10298463D0D7F7037AFf0204321636dABAD",
    LINK_LoanTermsConsensus_tUSDC: "0xB258A8f04FeA3721b5739af48020c6051CD4Aa49",
    LINK_LoanTermsConsensus_tUSDC_Proxy:
      "0xEA786499f00AF3Fa7fDEB974Df8815B068B03e9C",
    LINK_Loans_tUSDC: "0xd49165870FdE7A359B3816ECd223E4A16De7ED31",
    LINK_Loans_tUSDC_Proxy: "0xd4ebaA493564f6F1acAA754D2898B6879dB624B7",
    Escrow: "",
    Uniswap: "",
    tokens: {
      // See https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f
      DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
      // See https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
      USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      // See https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca
      LINK: "0x514910771af9ca656af840dff83e8264ecf986ca",
      SNX: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
      MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      YFI: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
      LEND: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
      wBTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
  },
};

export const dataProvidersURLs = {
  bankInfo: process.env.DATA_PROVIDERS_URL_BANK_INFO || '',
};

export const craURLs = {
  arrowhead: process.env.CRA_URLS_ARROWHEAD || "",
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
