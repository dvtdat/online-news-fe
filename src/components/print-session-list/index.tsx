import { useState } from 'react';

import { usePrintSessionStore } from '@/stores/print-session';
import { PrintSession, PrintStatus } from '@/types/print-session';

import Pagination from '../pagination/pagination';

const PrintSessionList = () => {
  const { printSessionList } = usePrintSessionStore();
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg">
        <div className="grid h-16 w-full grid-cols-12 gap-4 bg-primary text-xl font-bold text-white">
          <div className="flex flex-row items-center justify-center">#</div>
          <div className="col-span-2 flex flex-row items-center justify-start">
            Printer Name
          </div>
          <div className="col-span-2 flex flex-row items-center justify-center">
            Created At
          </div>
          <div className="col-span-2 flex flex-row items-center justify-center">
            Paper Size
          </div>
          <div className="col-span-2 flex flex-row items-center justify-center">
            Quantity
          </div>
          <div className="col-span-3 flex flex-row items-center justify-center">
            Status
          </div>
        </div>
        {printSessionList
          .slice((page - 1) * 10, page * 10)
          .map((session: PrintSession, index) => (
            <div
              className="grid h-16 w-full grid-cols-12 gap-4 border-b bg-white transition-all duration-100 hover:bg-slate-100"
              key={session.id}
            >
              <div className="flex flex-row items-center justify-center">
                {index + (page - 1) * 10 + 1}
              </div>
              <div className="col-span-2 flex flex-row items-center justify-start">
                {session.printer.name}
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                {new Date(session.createdAt).toLocaleTimeString()},{' '}
                {new Date(session.createdAt).toLocaleDateString()}
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                {session.paperSize}
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                {session.quantity}
              </div>
                <div className="col-span-3 flex flex-row items-center justify-center">
                {session.printStatus === PrintStatus.PRINTING ? (
                  <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-hcmut-light font-bold text-white">
                  Printing
                  </div>
                ) : session.printStatus === PrintStatus.COMPLETED ? (
                  <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-green font-bold text-white">
                  Completed
                  </div>
                ) : (
                  <div className="flex h-3/5 w-2/5 flex-row items-center justify-center rounded-lg bg-red font-bold text-white">
                  Cancelled
                  </div>
                )}
                </div>
            </div>
          ))}
      </div>
      <div className="mt-10 flex w-full flex-row justify-end">
        <Pagination
          currentPage={page}
          totalPages={Math.floor((printSessionList.length + 10) / 10)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default PrintSessionList;
