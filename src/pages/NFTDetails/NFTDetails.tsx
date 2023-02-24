import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import ImageBar from "./components/ImageBar";
import LeftMenu from "./components/LeftMenu";
import ListNFT from "./rightMenus/ListNFT";
import PlaceBid from "./rightMenus/PlaceBid";
import MakeOffer from "./rightMenus/MakeOffer";
import UpdateOffer from "./rightMenus/UpdateOffer";
import Activity from "./rightMenus/Activity";
import Bids from "./rightMenus/Bids";
import Offers from "./rightMenus/Offers";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setIsLiked, setPresetPrice, setRightMenu, setSelectedNFT } from "store/NFTDetailsSlice";
import collectionsService from "api/collections/collections.service";
import { CollectionItemResponse } from "api/collections/collections.type";
import Img from "components/Img";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";
import "./nftdetails.css";

const None = React.memo(() => {
  return <div />;
});
None.displayName = "None";
const NFTDetails = () => {
  const { nftId } = useParams();

  const dispatch = useAppDispatch();
  const { rightMenuType } = useAppSelector((state) => state.nftdetails);
  const { isConnected } = useAppSelector((state) => state.wallet);

  const [isActive, setIsActive] = useState(false);
  const [nft, setNft] = useState<CollectionItemResponse>({} as any);

  const fetchCollection = async () => {
    const response = await collectionsService.getCollection({ id: nftId });
    setNft(response.data);
    dispatch(setSelectedNFT(response.data));
    dispatch(setIsLiked(response.data.user?.likedTokens?.includes(response.data.id) ?? false));
  };

  useEffect(() => {
    setIsActive(rightMenuType !== RightMenuType.None);
  }, [rightMenuType]);

  useEffect(() => {
    fetchCollection();
    if (!isConnected) resetMenuState();
  }, [nftId, isConnected]);

  useEffect(() => {
    if (!isActive) fetchCollection();
  }, [isActive]);

  useEffect(() => {
    resetMenuState();
  }, []);

  const resetMenuState = () => {
    setIsActive(false);
    dispatch(setRightMenu(RightMenuType.None));
    dispatch(setPresetPrice(""));
  };

  const Component = React.useMemo(() => {
    switch (rightMenuType) {
      case RightMenuType.Activities:
        return Activity;
      case RightMenuType.Bids:
        return Bids;
      case RightMenuType.ListNFT:
        return ListNFT;
      case RightMenuType.MakeOffer:
        return MakeOffer;
      case RightMenuType.Offers:
        return Offers;
      case RightMenuType.PlaceBid:
        return PlaceBid;
      case RightMenuType.UpdateOffer:
        return UpdateOffer;
      case RightMenuType.UpdateListing:
        return ListNFT;
      default:
        return None;
    }
  }, [rightMenuType]);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return !useIsMobile() ? (
    <div className="relative flex justify-between container-nftdetails">
      <div className="w-[42%]">
        <LeftMenu nft={nft} />
      </div>
      <div className={clsx("absolute right-0 top-0 h-full z-20 bg-bg-light w-[58%] duration-300 transform", isActive && "-translate-x-[72.4%]")}>
        <div className="sticky z-20" style={{ top: "var(--headerHeight)" }}>
          <div className="flex justify-center image-height py-10">
            <div className="relative w-full image-width bg-gray rounded-md">
              <Img src={nft.image} className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-h-full max-w-full" />
            </div>
            <ImageBar />
          </div>
        </div>
      </div>
      <div className="w-[42%]">
        <Component onBack={() => resetMenuState()} />
      </div>
    </div>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default NFTDetails;
