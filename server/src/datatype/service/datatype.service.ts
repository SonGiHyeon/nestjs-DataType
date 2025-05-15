import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';

@Injectable()
export class DatatypeService {
  constructor(private readonly ethersService: EthersService) { }

  async positive(value?: number) {
    try {
      // Todo: value 유무에 따라 positiveNumber와 setPositiveNumber의 값을 리턴합니다.
      if (value === undefined) {
        return this.ethersService.positiveNumber();
      }
      return this.ethersService.setPositiveNumber(value);
    } catch (error) {
      console.log(error);
    }
  }

  async negative(value?: number) {
    try {
      // Todo: value 유무에 따라 negativeNumber와 negativeNumber와 값을 리턴합니다.
      if (value === undefined) {
        return this.ethersService.negativeNumber();
      }
      return this.ethersService.setNegativeNumber(value);
    } catch (error) {
      console.log(error);
    }
  }

  async isActive() {
    try {
      // Todo: isActive의 값을 리턴합니다.
      return this.ethersService.isActive();
    } catch (error) {
      console.log(error);
    }
  }

  async toggleActive() {
    try {
      // Todo: toggleActive의 값을 리턴합니다.
      return this.ethersService.toggleActive();
    } catch (error) {
      console.log(error);
    }
  }

  async recipient() {
    try {
      // Todo: recipient의 값을 리턴합니다.
      return this.ethersService.recipient();
    } catch (error) {
      console.log(error);
    }
  }

  async wallet(address?: string) {
    try {
      // Todo: address 유무에 따라 wallet과 setWallet의 값을 리턴합니다.
      if (!address) {
        return this.ethersService.wallet();
      }
      return this.ethersService.setWallet(address);
    } catch (error) {
      console.log(error);
    }
  }

  async fixedData(data?: string) {
    try {
      // Todo: data 유무에 따라 getFixedData와 setFixedData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes32(encodeBytes32String)
      // ⚠️ data의 길이는 32바이트로 패딩해야 합니다.(zeroPadValue32)
      if (!data) {
        return this.ethersService.fixedData();
      }

      const isBytes = await this.ethersService.isBytesLike(data);
      let bytes32Data: string;

      if (isBytes) {
        bytes32Data = await this.ethersService.zeroPadValue32(data);
      } else {
        const encoded = await this.ethersService.encodeBytes32String(data);
        bytes32Data = await this.ethersService.zeroPadValue32(encoded);
      }

      return this.ethersService.setFixedData(bytes32Data);
    } catch (error) {
      console.log(error);
    }
  }

  async dynamicData(data?: string) {
    try {
      // Todo: data 유무에 따라 dynamicData와 setDynamicData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes(toUtf8Bytes)
      if (!data) {
        return this.ethersService.dynamicData();
      }
      const isBytes = await this.ethersService.isBytesLike(data);
      let bytes;

      if (isBytes) {
        bytes = data;
      } else {
        bytes = await this.ethersService.toUtf8Bytes(data);
      }
      return this.ethersService.setDynamicData(bytes);
    }
    catch (error) {
      console.error(error);
    }
  }

  async getDynamicDataLength() {
    try {
      // Todo: getDynamicDataLength의 값을 리턴합니다.
      return this.ethersService.getDynamicDataLength();
    } catch (error) {
      console.error(error);
    }
  }

  async currentState(state?: number) {
    try {
      // Todo: state 유무에 따라 currentState와 setState의 값을 리턴합니다.
      if (!state) {
        return this.ethersService.currentState()
      }
      return this.ethersService.setState(state);
    } catch (error) {
      console.error(error);
    }
  }

  async getDetails() {
    try {
      // Todo: getDetails의 값을 리턴해야 합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요
      const result = await this.ethersService.getDetails();
      const jsonSafe: Record<string, any> = {};

      for (const key in result) {
        const value = result[key];
        if (typeof value === 'bigint') {
          jsonSafe[key] = value.toString();
        } else {
          jsonSafe[key] = value;
        }
      }

      return jsonSafe;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
