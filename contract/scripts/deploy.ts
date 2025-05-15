import { ethers } from 'hardhat';
import { makeAbi } from './abiGenerator';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Todo: 배포하기 위한 script를 만들어주세요.

  // 배포할 recipient 주소를 첫 번째 계정으로 설정
  const recipient = deployer.address;

  // DataType 컨트랙트 팩토리 가져오기
  const DataType = await ethers.getContractFactory('DataType');

  // 컨트랙트 배포
  const contract = await DataType.deploy(recipient);

  // 배포 완료 대기
  await contract.waitForDeployment();

  console.log(`DataType contract deployed at: ${contract.target}`);

  await makeAbi(`DataType`, contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
