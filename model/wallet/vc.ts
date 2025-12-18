export const userVC = {
  "vc": {
      "id": "urn:uuid:4f725269-ba8f-11f0-9df6-22d02235c281",
      "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schema.iden3.io/core/jsonld/iden3proofs.jsonld",
          "ipfs://QmbaL4bG16tTYqAzn35qztT6cqTRZT1FMRfkcp5SLTDW2T"
      ],
      "type": [
          "VerifiableCredential",
          "PersonCredential"
      ],
      "expirationDate": "2026-11-05T19:25:09Z",
      "issuanceDate": "2025-11-05T21:35:12.450492477Z",
      "credentialSubject": {
          "birthDate": 929059200,
          "fullName": "JUAN CARLOS AREVALO FERRUFINO",
          "id": "did:polygonid:polygon:amoy:2qQ68JkRcf3yXSWq8282Ugp6gNS7bdNMop8xDLczGy",
          "nationalIdNumber": "8673548",
          "type": "PersonCredential"
      },
      "credentialStatus": {
          "id": "http://18.234.62.97:3001/v2/agent",
          "revocationNonce": 784553286,
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
              "coreClaim": "47906c7919c557db0d4872306d2057d12a0000000000000000000000000000000213000000000000009045fb64018805db5dcae354a0a12dd142d415fa740a00c431d242e3fdcfc275deb05595da615370e35cc889d6d87e2262123cbcff7d0f00000000000000000000000000000000000000000000000000000000000000004655c32e0000000015d8ec6a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "signature": "9068c0ed1027590a6bf13fc7da2ae6a56744fadd47ff2361ecc8f3b278124324495625441e52620e78f4582da989a761a42700929cf248844a4fc890038d3d03"
          }
      ]
  },
  "dni": "8673548",
  "salt": "3401572713503361154712247494516672524547902657860427654838720186138341290381",
  "privKey": "0x91c1e85e1982575ba5f9b2c14098bc71de40e880af302c97caa25c1ac98ab924",
  "account": "0x9045fb64018805Db5DcAe354a0a12dD142d415Fa",
  "guardian": "0x307830",
  "did": "did:polygonid:polygon:amoy:2qQ68JkRcf3yXSWq8282Ugp6gNS7bdNMop8xDLczGy",
  "bioEnabled": false
}