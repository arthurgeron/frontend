import React, { createContext, ReactNode, useContext } from "react";
import { IUserResponse } from "api/user/user.type";
import userService from "api/user/user.service";
import { cancelAllOrdersBySide, setContracts } from "../../thunder-sdk/src/contracts/thunder_exchange";
import { contracts, exchangeContractId, provider, strategyFixedPriceContractId } from "../../global-constants";
import collectionsService from "api/collections/collections.service";
import { useAppSelector } from "store";
import { FuelProvider } from "api";
import config from "../../config";

export const enum FollowType {
  Followers = 0,
  Follows = 1,
}

interface IProfileContext {
  userInfo: any;
  socialActiveTab: any;
  onSetSocialActiveTab: any;
  onFollow: ({ isFollow, followUser }: { isFollow: boolean; followUser: IUserResponse }) => void;
  options?: any;
}

export const ProfileContext = createContext<IProfileContext>({} as any);

const ProfileProvider = ({ userId, options, children }: { userId: any; options: any; children: ReactNode }) => {
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [], likedTokens: [] } as any);
  const [socialActiveTab, setSocialActiveTab] = React.useState<any>(null);

  const fetchUserProfile = async () => {
    setUserInfo({ tokens: [], likedTokens: [] } as any);
    try {
      const response = await userService.getUser({
        id: userId,
        includes: config.getConfig("userProfileIncludes"),
      });

      setUserInfo(response.data as any);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
    window.addEventListener("CompleteCheckout", fetchUserProfile);

    return () => {
      window.addEventListener("CompleteCheckout", fetchUserProfile);
    };
  }, [userId]);

  const onSetSocialActiveTab = (value: any) => {
    setSocialActiveTab(value);
  };

  const onFollow = async ({ isFollow, followUser }: { isFollow: boolean; followUser: IUserResponse }) => {
    try {
      const { data: isValid } = await userService.followUser({
        userId: followUser.id,
        followerId: userInfo.id,
        follow: !isFollow,
      });
      if (isValid) {
        await fetchUserProfile();
      }
    } catch (e) {
      console.log(e);
    }
  };

  options.onCancelAllListings = () => {
    setContracts(contracts, FuelProvider);

    cancelAllOrdersBySide(exchangeContractId, provider, wallet, strategyFixedPriceContractId, false).then((res) => {
      if (res.transactionResult.status.type === "success") {
        collectionsService.cancelAllListings({ userId: user.id });
      }
    });
  };

  const value = {
    userInfo,
    socialActiveTab,
    onSetSocialActiveTab,
    onFollow,
    options,
  };

  return !!userInfo && <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
