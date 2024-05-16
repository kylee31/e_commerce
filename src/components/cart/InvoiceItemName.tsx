import { DocumentData } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";

const InvoiceItemName = React.memo(function InvoiceItemName({
  isImage,
  info,
}: {
  isImage: boolean | undefined;
  info: DocumentData;
}) {
  return (
    <>
      {isImage ? (
        <div className="w-full flex justify-start items-center">
          <img
            src={info.productImages[0]}
            alt=""
            width={80}
            height={80}
            className="mr-8"
          />
          <Link
            to={`/category/${info.productCategory}/${info.id}`}
            className="border-b border-black"
          >
            {info.productName}
          </Link>
        </div>
      ) : (
        <div>{info.productName}</div>
      )}
    </>
  );
});

export default InvoiceItemName;
