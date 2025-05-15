// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataType {
    uint public positivenumber = 100;
    int public negativenumber = -50;
    bool public isActive = true;
    address public wallet = 0x0000000000000000000000000000000000000000;
    address payable public recipient;
    bytes32 public fixedData = "0xabcdef123456";
    bytes public dynamicData;
    enum State {
        Created,
        Active,
        Inactive
    }
    State public currentState;

    constructor(address payable _recipient) {
        recipient = _recipient;
        currentState = State.Active;
    }

    // 정수형 값 검사
    function positiveNumber() public view returns (uint) {
        return positivenumber;
    }
    function negativeNumber() public view returns (int) {
        return negativenumber;
    }
    function setPositiveNumber(uint setPositivenumber) public returns (uint) {
        positivenumber = setPositivenumber;
        return positivenumber;
    }
    function setNegativeNumber(int setNegativenumber) public returns (int) {
        negativenumber = setNegativenumber;
        return negativenumber;
    }

    // Boolean 값 검사
    function toggleActive() public returns (bool) {
        isActive = !isActive;

        return isActive;
    }

    // Address 값 검사
    function setWallet(address payable _wallet) public returns (address) {
        wallet = _wallet;
        recipient = _wallet;
        return wallet;
    }

    // Bytes 값 검사
    function setFixedData(bytes32 _fixedData) public returns (bytes32) {
        fixedData = _fixedData;
        return fixedData;
    }
    function getDynamicDataLength() public view returns (uint) {
        return dynamicData.length;
    }
    function setDynamicData(
        bytes memory _dynamicData
    ) public returns (bytes memory) {
        dynamicData = _dynamicData;
        return dynamicData;
    }

    // Enum 값 검사
    function setState(State state) public {
        currentState = state;
    }

    // getDetails() 함수 테스트
    function getDetails()
        public
        view
        returns (
            uint,
            int,
            bool,
            address,
            address,
            bytes32,
            bytes memory,
            State
        )
    {
        return (
            positiveNumber(),
            negativeNumber(),
            isActive,
            wallet,
            recipient,
            fixedData,
            dynamicData,
            currentState
        );
    }
}
