import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { bulkPlaceOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { contracts, exchangeContractId, provider, strategyFixedPriceContractId, transferManagerContractId, ZERO_B256 } from "global-constants";
import { formatTimeBackend, formatTimeContract, toGwei } from "utils";
import { NativeAssetId, Provider } from "fuels";
import { CheckoutCartItems } from "./Checkout";
import collectionsService from "api/collections/collections.service";

const checkoutProcessTexts = {
  title1: "Confirm your listing",
  description1: "Proceed in your wallet and confirm the listing.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT listed!",
  description3: "Congrats, your NFT succesfully listed.",
};

const Footer = ({ approved, onClose }: { approved: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={() => onClose()}>
          DONE
        </Button>
      </div>
    </div>
  );
};

const BulkListingCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { bulkListItems, bulkUpdateItems } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const bulkItems = bulkListItems.concat(bulkUpdateItems);

  const onComplete = async () => {
    const _bulkListItems = bulkListItems.map((item: any) => {
      return { ...item, expireTime: formatTimeBackend(item.expireTime) };
    });

    const _bulkUpdateItems = bulkUpdateItems.map((item: any) => {
      return { ...item, expireTime: formatTimeBackend(item.expireTime) };
    });

    nftdetailsService.getLastIndex(0, user.id).then((res) => {
      const makerOrders = bulkItems.map((item: any, index: any) => {
        return {
          isBuySide: false,
          maker: user.walletAddress,
          collection: item.collection,
          token_id: item.tokenOrder,
          price: toGwei(item.price).toNumber(),
          amount: 1,
          nonce: res.data + 1 + index,
          strategy: strategyFixedPriceContractId,
          payment_asset: NativeAssetId,
          expiration_range: formatTimeContract(item.expireTime),
          extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 },
        };
      });

      const prov = new Provider("https://beta-3.fuel.network/graphql");
      setContracts(contracts, prov);

      console.log(makerOrders);

      bulkPlaceOrder(exchangeContractId, provider, wallet, transferManagerContractId, makerOrders)
        .then((res) => {
          console.log(res);
          if (res?.transactionResult.status.type === "success") {
            if (bulkUpdateItems.length > 0) collectionsService.updateBulkListing(_bulkUpdateItems);
            if (bulkListItems.length > 0) collectionsService.bulkListing(_bulkListItems);

            setApproved(true);
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.message.includes("Revert")) setIsFailed(true);
          else setStartTransaction(false);
        });
    });
  };

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <>
          <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} approved={approved} failed={isFailed} />
          {isFailed && (
            <div className="flex flex-col w-full border-t border-gray">
              <Button className="btn-secondary m-5" onClick={onClose}>
                CLOSE
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning className="text-red" />
            <span className="text-h5 text-white">You rejected the request in your wallet!</span>
          </div>
          <Button className="btn-secondary m-5" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      backdropDisabled={true}
      className="checkout"
      title="Bulk Listing"
      show={show}
      onClose={() => {
        onClose();
      }}
      footer={<Footer approved={approved} onClose={onClose} />}
    >
      <div className="flex flex-col p-5">
        <CheckoutCartItems items={bulkItems} itemCount={bulkItems.length} totalAmount={""} approved={approved} />
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default BulkListingCheckout;
