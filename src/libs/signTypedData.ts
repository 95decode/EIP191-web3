const types = {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
    ],
    MainType: [
        { name: "SubTypeAKey", type: "SubTypeA" },
        { name: "SubTypeBKey", type: "SubTypeB[]" },
    ],
    SubTypeA: [
        { name: "stringKey", type: "string" },
        { name: "addressKey", type: "address" },
    ],
    SubTypeB: [
        { name: "uint256Key", type: "uint256" },
        { name: "addressKey", type: "address" },
    ],
};

export default types;