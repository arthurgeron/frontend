import React, { useState } from "react";
import Balances from "components/Balances";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";
import Modal from "components/Modal";
import Tab from "components/Tab";
import InfoBox from "pages/NFTDetails/components/InfoBox";
import { useAppDispatch, useAppSelector } from "store";
import { toggleManageFundsModal } from "store/walletSlice";
import { ZERO_B256, assetManagerContractId, poolContractId, provider } from "global-constants";
import { toGwei } from "utils";
import { deposit, withdraw } from "thunder-sdk/src/contracts/pool";
import userService from "api/user/user.service";

const ManageFunds = () => {
  const dispatch = useAppDispatch();

  const { wallet, user } = useAppSelector((state) => state.wallet);
  const { manageFundsShow } = useAppSelector((state) => state.wallet);
  const [isAddToPool, setisAddToPool] = useState(true);
  const [amount, setAmount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSwap() {
    setIsDisabled(true);
    if (isAddToPool)
      deposit(poolContractId, provider, wallet, toGwei(amount), ZERO_B256, assetManagerContractId).then((res) => {
        console.log(res);
        userService.updateBidBalance(user.id, amount);
        setIsDisabled(false);
      });
    else
      withdraw(poolContractId, provider, wallet, toGwei(amount), ZERO_B256, assetManagerContractId).then((res) => {
        console.log(res);
        userService.updateBidBalance(user.id, -amount);
        setIsDisabled(false);
      });
  }

  const footer = (
    <div className="flex flex-col items-center p-5 gap-y-5">
      <Button className="w-full" disabled={isDisabled} onClick={handleSwap}>
        SWAP
      </Button>
      <Button className="btn-secondary w-full" onClick={() => dispatch(toggleManageFundsModal())}>
        CLOSE
      </Button>
    </div>
  );

  return (
    <Modal className="checkout" title="Manage Funds" footer={footer} onClose={() => dispatch(toggleManageFundsModal())} show={manageFundsShow}>
      <div className="flex flex-col p-5 gap-y-2.5">
        <InfoBox title={""} description={"You can always add to your bid balance or withdraw from your bid balance without limitation."} />
        <Balances refresh={isDisabled} />
        <div className="flex flex-col gap-y-[25px]">
          <Tab className="bg-gray" initTab={0} onChange={(value) => setisAddToPool(!value)}>
            <Tab.Item id={0}>
              <div className="flex justify-center items-center -my-1">+ ADD TO POOL</div>
            </Tab.Item>
            <Tab.Item id={1}>
              <div className="flex justify-center items-center -my-1">- WITHDRAW FROM POOL</div>
            </Tab.Item>
          </Tab>
          <div className="flex flex-col gap-y-2">
            <h6 className="text-head6 font-spaceGrotesk text-white"> {isAddToPool ? "Add To Bid Balance" : "Withdraw From Bid Balance"}</h6>
            <InputEthereum onChange={(value: any) => setAmount(value)} value={amount} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ManageFunds;
