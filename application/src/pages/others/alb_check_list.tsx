import { ChangeEventHandler, useRef, useState } from "react";
import { PaginationBar } from "../../components/elements/Pagination/Pagination";
import { TableBody } from "../../components/elements/Table/TableBody";
import { TableHead } from "../../components/elements/Table/TableHead";
import { PageHeader } from "../../components/layout/Header/PageHeader";
import { ALBTable } from "../../components/templates/apply_customer/detail/ALBTable";
import { dummyForALBDetail, tableHeadForALBDetail } from "../../constants/constants";

const AlbCheckItemTable = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    console.log(fileObj);
  };

  return (
    <div>
      <PageHeader
        title={'ALB反社チェック'}
        addClick={() => {
          const inputFile = inputRef.current;
          if (!inputFile) return;
          inputFile.click();
        }}
      />
      <input className="hidden" type="file" accept={'.csv'} ref={inputRef} onChange={handleFileChange} />
      <ALBTable />
      {/* <PaginationBar count={10} /> */}
    </div>
  );
};

export default AlbCheckItemTable;
