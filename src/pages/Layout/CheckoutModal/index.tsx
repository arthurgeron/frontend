import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import Checkout from "./Checkout";
import InsufficientFund from "./InsufficientFund";
import { CheckoutType, toggleCheckoutModal } from "store/checkoutSlice";
import BidCheckout from "./BidCheckout";
import MakeOfferCheckout from "./MakeOfferCheckout";
import CancelOfferCheckout from "./CancelOfferCheckout";
import UpdateOfferCheckout from "./UpdateOfferCheckout";
import ConfirmListingCheckout from "./ConfirmListingCheckout";
import AcceptOfferCheckout from "./AcceptOfferCheckout";
import CancelAuctionCheckout from "./CancelAuctionCheckout";
import TransferCheckout from "./TransferCheckout";
import CancelListingCheckout from "./CancelListingCheckout";

const Index = () => {
  const dispatch = useAppDispatch();
  const { show, isInsufficientBalance, checkoutType, onCheckoutComplete } = useAppSelector((state) => state.checkout);
  const onClose = () => {
    dispatch(toggleCheckoutModal());
    if ([CheckoutType.MakeOffer, CheckoutType.PlaceBid, CheckoutType.UpdateOffer, CheckoutType.ConfirmListing, CheckoutType.UpdateListing].includes(checkoutType)) onCheckoutComplete();
  };

  switch (checkoutType) {
    case CheckoutType.MakeOffer:
      return <MakeOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.PlaceBid:
      return <BidCheckout show={show} onClose={onClose} />; //cart item-checkoutanimation-bid balance uyari
    //
    case CheckoutType.CancelOffer:
      return <CancelOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.UpdateOffer:
      return <UpdateOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.AcceptOffer:
      return <AcceptOfferCheckout show={show} onClose={onClose} />;
    case CheckoutType.ConfirmListing:
      return <ConfirmListingCheckout show={show} onClose={onClose} />;
    case CheckoutType.UpdateListing:
      return <ConfirmListingCheckout updateListing={true} show={show} onClose={onClose} />;
    case CheckoutType.Transfer:
      return <TransferCheckout show={show} onClose={onClose} />;
    case CheckoutType.CancelAuction:
      return <CancelAuctionCheckout show={show} onClose={onClose} />; //DESIGNDA YOK!
    case CheckoutType.CancelListing:
      return <CancelListingCheckout show={show} onClose={onClose} />; //DESIGNDA YOK!
    default:
      return isInsufficientBalance ? <InsufficientFund show={show} onClose={onClose} /> : <Checkout show={show} onClose={onClose} />;
  }
};

export default Index;
