export const userVC = {
  "vc": {
    "id": "urn:uuid:7bb29ccc-dcec-11f0-9df6-22d02235c281",
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.iden3.io/core/jsonld/iden3proofs.jsonld",
      "ipfs://QmbaL4bG16tTYqAzn35qztT6cqTRZT1FMRfkcp5SLTDW2T"
    ],
    "type": [
      "VerifiableCredential",
      "PersonCredential"
    ],
    "expirationDate": "2030-04-25T14:29:26Z",
    "issuanceDate": "2025-12-19T15:07:49.418523702Z",
    "credentialSubject": {
      "birthDate": 929059200,
      "fullName": "JUAN CARLOS AREVALO FERRUFINO",
      "id": "did:polygonid:polygon:amoy:2qXUNdPxaXhc9CBaAJXZkfB3CZ27KGCURY2ASuv6Zq",
      "nationalIdNumber": "8673548",
      "type": "PersonCredential"
    },
    "credentialStatus": {
      "id": "http://18.234.62.97:3001/v2/agent",
      "revocationNonce": 3924204455,
      "type": "Iden3commRevocationStatusV1.0"
    },
    "issuer": "did:polygonid:polygon:amoy:2qS37QXJcioDmNGuafKEQS8JtnGErdDTwJiDG3XoJB",
    "credentialSchema": {
      "id": "https://ipfs.io/ipfs/QmeQhwtwP6XNG155M49yV6TFmm6s8er13WfeU7tcuM8eat",
      "type": "JsonSchema2023"
    },
    "proof": [
      {
        "type": "BJJSignature2021",
        "issuerData": {
          "id": "did:polygonid:polygon:amoy:2qS37QXJcioDmNGuafKEQS8JtnGErdDTwJiDG3XoJB",
          "state": {
            "claimsTreeRoot": "094a72ebd7e0d3a661949481c971b0c656eb7a1d87abce6e937be116e56eda20",
            "value": "ae141e12072ae916083c932f17ce04ed37d2d1ecbcc148617fb221e400e69824"
          },
          "authCoreClaim": "cca3371a6cb1b715004407e325bd993c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009097b75935188bb0ea26c234dbb4d463e26bd9da333daffb05b0533035966e109c8d3b864525c54816244eaea4a97deea76bdb207f204e3b857c51436b8df5020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "mtp": {
            "existence": true,
            "siblings": []
          },
          "credentialStatus": {
            "id": "http://18.234.62.97:3001/v2/agent",
            "revocationNonce": 0,
            "type": "Iden3commRevocationStatusV1.0"
          }
        },
        "coreClaim": "47906c7919c557db0d4872306d2057d12a0000000000000000000000000000000213a2a4f406a9e8c1b913925cf73b1b788c1f4b0a040bff5bf4f111189d0c00e68fddaf324cca7dfa1f242aa2b552bff1871abd8f4c7b186bfe8b8dbfa5c22c0000000000000000000000000000000000000000000000000000000000000000a79be6e90000000046ef72710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signature": "cbf93cd0d32efcfbea1755e32d72411054674ea166f8fa64c3ed1fce15487b8c16a863dd4569d32eeb5b19623fb45bf8cad1b6f136e63574fd8358f1d0b28903"
      }
    ]
  },
  "dni": "8673548",
  "salt": "3401572713503361154712247494516672524547902657860427654838720186138341290381",
  "privKey": "0x91c1e85e1982575ba5f9b2c14098bc71de40e880af302c97caa25c1ac98ab924",
  "account": "0x9045fb64018805Db5DcAe354a0a12dD142d415Fa",
  "guardian": "0x307830",
  "did": "did:polygonid:polygon:amoy:2qXUNdPxaXhc9CBaAJXZkfB3CZ27KGCURY2ASuv6Zq",
  "bioEnabled": false
}