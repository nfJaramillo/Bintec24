
import Web3 from 'web3';
import contractABI from '../assets/contractABI.json'
import contractABI2 from '../assets/contractABI2.json'
import { sendTransaction, readContract } from '@wagmi/core'
import { sepolia } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'


const contractAddress = '0xc9E315870cc21a2bA086A8Bf3831100c00682851';
const contractAddress2 = '0x9D4cCb21b17658A7E3220933EE3BeC839f80403c';
const web3 = new Web3();
const contract = new web3.eth.Contract(contractABI, contractAddress);
const contract2 = new web3.eth.Contract(contractABI2, contractAddress2);

const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})


export const getAllCars = async () => {
  try {


    const cars = await readContract(wagmiConfig,{
      address: contractAddress,
      abi: contractABI,
      functionName: 'getAllCars',
    })
    const [ids, owners, prices, availabilities, titles, descriptions] = await cars
    


    // Convertir los arrays en un formato JSON organizado
    const carsJson = ids.map((id, index) => ({
      id: id.toString(),
      owner: owners[index],
      price: prices[index].toString(),
      isAvailable: availabilities[index],
      title: titles[index],
      description: descriptions[index]
    }));

    return JSON.stringify(carsJson, null, 2);
  }
  catch (err) {
    console.log(err)
  }
}

export const getRole = async (address) => {
  try {


    const role = await readContract(wagmiConfig,{
      address: contractAddress,
      abi: contractABI,
      functionName: 'getRole',
      args: [address],
    })
    return (role);
  }
  catch (err) {
    console.log(err)
  }
}

export const getFunds= async (address) => {
  try {


    const funds = await readContract(wagmiConfig,{
      address: contractAddress,
      abi: contractABI,
      functionName: 'getBuyerTokens',
      args: [address],
    })
    return (funds.toString());
  }
  catch (err) {
    console.log(err)
  }
}


export const buyCar = async (address, id) => {
  try {
    const txHash = await sendTransaction(wagmiConfig,{
      to: contractAddress,
      from: address,
      data: contract.methods.buyCar(id).encodeABI() //make call  smart contract 

    })
    return {
      success: true,
      severity: "success",
      status: "✅ Consulte su transacción en Etherscan: https://sepolia.etherscan.io/tx/" + txHash.hash
    }
  }
  catch (err) {
    return {
      success: false,
      severity: "error",
      status: "😥 Algo salió mal:" + err.message,
    };
  }
}

export const registerCar = async (address, carDetails) => {
  try {
    const txHash = await sendTransaction(wagmiConfig,{
      to: contractAddress,
      from: address,
      data: contract.methods.registerCar(carDetails.quality, carDetails.price, carDetails.title, carDetails.description).encodeABI() //make call  smart contract 

    })
    return {
      success: true,
      severity: "success",
      status: "✅ Consulte su transacción en Etherscan: https://sepolia.etherscan.io/tx/" + txHash.hash
    }
  }
  catch (err) {
    return {
      success: false,
      severity: "error",
      status: "😥 Algo salió mal:" + err.message,
    };
  }
}

export const getNFT = async (address) => {

  try {
    const txHash = await sendTransaction(wagmiConfig,{
      to: contractAddress2,
      from: address,
      'data': contract2.methods.purchase(16, 1).encodeABI() //make call to NFT smart contract 

    })

    return {
      success: true,
      severity: "success",
      status: "✅ Consulte su transacción en Etherscan: https://sepolia.etherscan.io/tx/" + txHash.hash
    }
  } catch (error) {
    return {
      success: false,
      severity: "error",
      status: "😥 Algo salió mal: " + error.message
    }
  }
}

