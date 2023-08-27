import React from "react";
import Table, { ITableHeader } from "components/Table";
import Checkbox from "components/CheckBox";
import { add as cartAdd, remove as cartRemove } from "store/cartSlice";
import { useAppDispatch } from "store";
import { addressFormat, timeagoFormat } from "utils";
import { useCollectionListContext } from "../../CollectionListContext";
import Img from "components/Img";
import EthereumPrice from "components/EthereumPrice";
import clsx from "clsx";
import { add as bulkListingAdd, remove as bulkListingRemove } from "store/bulkListingSlice";
import { PATHS } from "router/config/paths";
import UseNavigate from "hooks/useNavigate";
import { IconLink } from "icons";

const Collection = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-5 pl-0 group">
      <div className={clsx("relative min-w-[40px] max-w-[40px] aspect-square rounded-md overflow-hidden flex-center bg-gray", item.isSelected ? "border border-white" : "")}>
        <Img className="h-full" alt={item.image} src={item.image} loading="lazy" />
        <div className="absolute top-0 left-0 bottom-0 right-0 flex-center bg-gray/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <IconLink className="cursor-pointer text-white" />
        </div>
      </div>
      <div className="">
        {item.collectionName && <div className="text-body text-gray-light text-overflow max-w-[130px]">{item.collectionName}</div>}
        <h6 className="text-h6 text-white">{item.name ?? item.tokenOrder}</h6>
      </div>
    </div>
  );
};

const UnSalableLabel = ({ children }: any) => {
  return <span className="text-headline-01 uppercase text-gray-light pr-2">{children}</span>;
};

const CollectionTable = () => {
  const dispatch = useAppDispatch();
  const navigate = UseNavigate();
  const { collectionItems, setSweep, options } = useCollectionListContext();

  const onToggleCart = (collection: any) => {
    if (!collection.isSelected) {
      dispatch(cartAdd(collection));
    } else {
      dispatch(cartRemove(collection.uid));
    }
  };
  const onToggleBulkListing = (collection: any) => {
    if (!collection.isSelected) {
      dispatch(bulkListingAdd(collection));
    } else {
      dispatch(bulkListingRemove(collection.uid));
    }
  };
  const onSelect = (collection: any) => {
    setSweep(0);

    if (options?.isProfile) {
      onToggleBulkListing(collection);
    } else {
      onToggleCart(collection);
    }
  };

  const headers: ITableHeader[] = [
    {
      key: "selection",
      text: "",
      render: (collection) => (
        <div className="p-2">
          {options?.isProfile || (!collection?.isOwnCollectionItem && collection.salable) ? (
            collection.onAuction ? null : (
              <Checkbox checked={collection.isSelected} onClick={() => onSelect(collection)} />
            )
          ) : null}
        </div>
      ),
      width: "42px",
    },
    {
      key: "collection",
      text: "Item",
      render: (item) => <Collection item={item} />,
    },
    {
      key: "price",
      text: "Price",
      width: "15%",
      align: "flex-end",
      render: (item) => (item.price === null ? <UnSalableLabel>No Listing</UnSalableLabel> : <EthereumPrice price={item.price} />),
    },
    {
      key: "lastSale",
      text: "Last Sale",
      width: "15%",
      align: "flex-end",
      render: (item) => (item.lastSalePrice === null ? <UnSalableLabel>No Sale</UnSalableLabel> : <EthereumPrice price={item.lastSalePrice} />),
    },
    {
      key: "owner",
      text: "Owner",
      width: "20%",
      align: "flex-end",
      render: (item) => (
        <div
          className="cell body-medium text-white hover:underline"
          onClick={() => {
            navigate(PATHS.USER, { userId: item?.userId });
          }}
        >
          {item?.userName ?? addressFormat(item?.userWalletAddress ?? "")}
        </div>
      ),
    },
    {
      key: "listedTime",
      text: "Time Listed",
      width: "20%",
      align: "flex-end",
      render: (item) => {
        const listedTime = timeagoFormat(item.listedTime);

        return <div className="cell body-medium">{listedTime}</div>;
      },
    },
  ];

  return (
    <Table
      className="border-t border-t-gray"
      theadClassName={"sticky"}
      theadStyle={{ top: "calc(var(--headerHeight) + 68px)" }}
      rowClassName={"cursor-pointer"}
      headers={headers}
      items={collectionItems}
      onClick={onSelect}
      containerFluidClassName={"!px-5"}
      isSelectedRow={(item) => item.isSelected}
    />
  );
};

export default CollectionTable;
