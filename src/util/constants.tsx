export const serverURL = process.env.SERVER_URL || "";

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
    TDAI: "0xa66Ae84490e51A9575b9D7Cc229600c98AE9289c",
    TUSDC: "0x19Fdd5306025cde3dED48eD525f68DAa9321E7D0",
    MarketsState: "0xf99339eaECc71eaBb2E07eF826B12c5784963E10",
    Settings: "0xAAdf55de7Dd237409788eecd1BB183542807560b",
    Settings_Proxy: "0x38a5e92Db27aDfc822535Be3Ab9eaE63102e5D2A",
    ATMSettings: "0xae34e82A21D0Fe49BB594631F5622C5B2cDF1ECF",
    ATMFactory: "0x92c27044b27DDb04E1c6D6533E194aaB6F46e2Dd",
    ATMFactory_Proxy: "0x3f3F3E981D1AE8a185852c44F66446348a5cD90B",
    ATMGovernance: "0x8682bD81dCFf55fD9656e5ed177E17729A46a984",
    ATMToken: "0x67361e66EE669A654574B51660CCE9522f2BfD5f",
    ChainlinkPairAggregator_DAI_ETH:
      "0xc16aF0C4c3FCB1c43075C6E9aCfe8e27D3a607aE",
    ChainlinkPairAggregator_USDC_ETH:
      "0xe595d5fFf5931dD952B9CE80981a303E7d52d56e",
    ChainlinkPairAggregator_USD_LINK:
      "0x4125507f428b831F04F24B1eEd41600B5f9A1b7d",
    ETH_LendingPool_tDAI: "0xdd7634dd73fCE753430b295d07bA2b0A2A835f0b",
    ETH_LendingPool_tDAI_Proxy: "0x909eaF0E9dc99a36C011952dFD51748674ef2c74",
    ETH_InterestConsensus_tDAI: "0x79b2c6B4b6983a5Dd63d0fBD823e285dFDEB277C",
    ETH_InterestConsensus_tDAI_Proxy:
      "0xe627D70E51D42e915f354E4e096ee26b8622eB70",
    ETH_Lenders_tDAI: "0xF95Ef4B0cd807Acf090ea8d3116b93b36cBf626F",
    ETH_Lenders_tDAI_Proxy: "0xaf02164FD2ea98F4851600cfc4a6520e410DBdD2",
    ETH_LoanTermsConsensus_tDAI: "0x4e0461e355748B4D16dab512CCb3614C2823C29f",
    ETH_LoanTermsConsensus_tDAI_Proxy:
      "0x42caBaf891C87114d6908F99B57721b4d5196e3C",
    ETH_Loans_tDAI: "0xc3CB3f8780CAFc8dBE95fe326Ad5dF7302D9861F",
    ETH_Loans_tDAI_Proxy: "0x15f7bad13B3563042F2AaC2A60Fd4827014BD472",
    ETH_LendingPool_tUSDC: "0x7e4671c85f475E28B0D15dB39b75982A5bA5003F",
    ETH_LendingPool_tUSDC_Proxy: "0x4F8EB2585D53BFa3Ef078C5a664B9B6ac12AcfFF",
    ETH_InterestConsensus_tUSDC: "0x023BbEfce400543267daa683c0524E4539123D5a",
    ETH_InterestConsensus_tUSDC_Proxy:
      "0x7A1954C0d6ebE70c6a44ee72E47cCA4B55089cA6",
    ETH_Lenders_tUSDC: "0x0dEbeBA1131F11EC22A2A2a7f1CB761170C55843",
    ETH_Lenders_tUSDC_Proxy: "0x4452BbAe2a5E29b5a30f55Cbc941b5edbbc54A2A",
    ETH_LoanTermsConsensus_tUSDC: "0xcA1a73666A5C762582dAcB3c97C1cFa5a11f4500",
    ETH_LoanTermsConsensus_tUSDC_Proxy:
      "0xF7ef1c411b47f450Bf061B7b040c29A7aEdA1856",
    ETH_Loans_tUSDC: "0xe04369224870cD776fdE4b7082a3ae58e414b1da",
    ETH_Loans_tUSDC_Proxy: "0x31918dbB330e23b1724ACB8eC760819dC91b065d",
    LINK_LendingPool_tDAI: "0x19DC4e421b52Ea84Be5306e3eBcb16AD3A321FC9",
    LINK_LendingPool_tDAI_Proxy: "0x312Eb94043A62228417E82749c2Ab973dE7f1f27",
    LINK_InterestConsensus_tDAI: "0x7B03C4deF2722f38Dd52650a228201ce0F54202e",
    LINK_InterestConsensus_tDAI_Proxy:
      "0x9BD9aA2d5CB71c6AC3Ba8DBD7e1a2Fd0a4b4AA55",
    LINK_Lenders_tDAI: "0x87c649f3952d9002743B473c26cD6c81E6c3B59b",
    LINK_Lenders_tDAI_Proxy: "0xD93E856d7b40D2cFD034fA520B57cc8163816C52",
    LINK_LoanTermsConsensus_tDAI: "0x0f7c028f8110DEded057fb67695F982a956b7b40",
    LINK_LoanTermsConsensus_tDAI_Proxy:
      "0x76b42e2B0aBF471988870c0a61B779c2d8295059",
    LINK_Loans_tDAI: "0xa3e9597689ADEE1Be121B4Ea0505EEd261517b51",
    LINK_Loans_tDAI_Proxy: "0x20A55d78E7955D0EE70954a527AAB3d5334991e1",
    LINK_LendingPool_tUSDC: "0x1A9e2038a8AF2d71dDEBD619177860C08172833f",
    LINK_LendingPool_tUSDC_Proxy: "0xA976A9883f69706460561d8df88601E5Cc1EF87B",
    LINK_InterestConsensus_tUSDC: "0x312ff65A534FC54d794EcCCbcD1D0eB0FfECd022",
    LINK_InterestConsensus_tUSDC_Proxy:
      "0xeAAf6adC5677C5607c2D4D47D54D614468712B03",
    LINK_Lenders_tUSDC: "0xb4BB25FB34B2537C47D49e3CD159BaE3BfbCFa2b",
    LINK_Lenders_tUSDC_Proxy: "0xADBd235d8A53002B1dDbea5C2d5099a579b12504",
    LINK_LoanTermsConsensus_tUSDC: "0x435Ea06dF7eD2AD3F2061a6Edc9ca92Fdd7C8098",
    LINK_LoanTermsConsensus_tUSDC_Proxy:
      "0x6E47BA13d4dDfbb0fa97f4B4Bd996c093f574680",
    LINK_Loans_tUSDC: "0x7824E9C34FEad631D696dD7b528ebbDC9e4790D5",
    LINK_Loans_tUSDC_Proxy: "0x0E940E1A9FfB90851D52c8ea6f826483480F307e",
    Escrow: "",
    Uniswap: "",
    tokens: {
      // DAI used by Compound.finance
      DAI: "0xc2118d4d90b274016cB7a54c03EF52E6c537D957",
      // USDC used by Compound.finance
      USDC: "0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C",
      // LINK Faucet: https://ropsten.chain.link/
      LINK: "0x20fE562d797A42Dcb3399062AE9546cd06f63280",
      // See https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f
      SNX: "0x013ae307648f529aa72c5767a334ddd37aab43c3",
      MKR: "0x4a47be893ddef62696800ffcddb8476c92ab4221",
      YFI: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
      LEND: "0x217b896620AfF6518B9862160606695607A63442",
      wBTC: "0x65058d7081fcdc3cd8727dbb7f8f9d52cefdd291",
      USDT: "0x6ee856ae55b6e1a249f04cd3b947141bc146273c",
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
  bankInfo: process.env.DATA_PROVIDERS_URLS_BANK_INFO || "",
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
