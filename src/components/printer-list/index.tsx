import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import { usePrinterStore } from '@/stores/printer';
import { Printer, Status } from '@/types/printer';

import Pagination from '../pagination/pagination';

const PrinterList = () => {
  const { printerList } = usePrinterStore();
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg">
        <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
          <div className="flex flex-row items-center justify-center">#</div>
          <div className="col-span-4 flex flex-row items-center justify-start">
            Printer Name
          </div>
          <div className="col-span-2 flex flex-row items-center justify-start">
            Location
          </div>
          <div className="flex flex-row items-center justify-center">Paper</div>
          <div className="col-span-4 flex flex-row items-center justify-center">
            Status
          </div>
        </div>
        {printerList
          .slice((page - 1) * 10, page * 10)
          .map((printer: Printer, index) => (
            <Link
              className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
              key={printer.id}
              to={`/admin/printer/${printer.id}`}
            >
              <div className="flex flex-row items-center justify-center">
                {index + (page - 1) * 10 + 1}
              </div>
              <div className="col-span-4 flex flex-row items-center justify-start">
                {printer.name}
              </div>
              <div className="col-span-2 flex flex-row items-center justify-start">
                {printer.location}
              </div>
              <div className="flex flex-row items-center justify-center">
                {printer.paperAvailable}
              </div>
              <div className="col-span-4 flex flex-row items-center justify-center">
                {printer.status === Status.STOPPED ? (
                  <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-red font-bold text-white">
                    Not Working
                  </div>
                ) : (
                  <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-green font-bold text-white">
                    Working
                  </div>
                )}
              </div>
            </Link>
          ))}
      </div>
      <div className="mt-10 flex w-full flex-row justify-end">
        <Pagination
          currentPage={page}
          totalPages={Math.floor((printerList.length + 10) / 10)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default PrinterList;
