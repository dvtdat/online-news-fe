// import { usePrinterStore } from '@/stores/printer';
import { useState } from 'react';

import { useAllocateSessionStore } from '@/stores/allocate-session';
import { usePrinterStore } from '@/stores/printer';
import { AllocateSession, AllocateStatus } from '@/types/allocate-session';
import { Printer } from '@/types/printer';

import { Button } from '../button';
import Select from '../select';

const statusOptions = Object.values(AllocateStatus).map((status) => ({
  label: status,
  value: status,
}));

const printerOptions = usePrinterStore
  .getState()
  .printerList.map((printer) => ({
    label: printer.name,
    value: printer.id.toString(),
  }));

type AllocateSessionDetailProp = {
  allocateSession: AllocateSession;
};

const AllocateSessionDetail = ({
  allocateSession,
}: AllocateSessionDetailProp) => {
  const { setAllocateSessionList, allocateSessionList } =
    useAllocateSessionStore();

  const { setPrinterList, printerList } = usePrinterStore();

  const [printer, setPrinter] = useState<Printer>(allocateSession.printer);
  const [status, setStatus] = useState<AllocateStatus>(allocateSession.status);
  const [quantity, setQuantity] = useState<number>(allocateSession.quantity);

  const handleConfirm = () => {
    const updatedPrinterList = printerList.map((currentPrinter) => {
      if (currentPrinter.id === allocateSession.printer.id) {
        return {
          ...currentPrinter,
          paperAvailable:
            currentPrinter.paperAvailable - allocateSession.quantity,
        };
      }

      if (currentPrinter.id === printer.id) {
        return {
          ...currentPrinter,
          paperAvailable: currentPrinter.paperAvailable + quantity,
        };
      }

      return currentPrinter;
    });

    setPrinterList(updatedPrinterList);

    setAllocateSessionList(
      allocateSessionList.map((session) =>
        session.id === allocateSession.id
          ? {
              ...session,
              printer,
              status,
              quantity,
            }
          : session,
      ),
    );
    alert('Session updated');
  };

  return (
    <div className="mt-4 flex w-full flex-col space-y-8 pr-10">
      <div className="w-1/2">
        <div className="w-full text-lg font-medium text-neutral">Printer</div>
        <Select
          options={printerOptions.filter(
            (x) => x.value !== printer.id.toString(),
          )}
          value={printerOptions.find(
            (option) => option.value === printer.id.toString(),
          )}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setPrinter(
                usePrinterStore
                  .getState()
                  .printerList.find(
                    (printer) => printer.id === Number(selectedOption.value),
                  ) as Printer,
              );
            }
          }}
          placeholder={'Choose Type'}
          className="mt-3 w-full"
        />
      </div>

      <div className="w-1/2">
        <div className="w-full text-lg font-medium text-neutral">
          Paper Quantity
        </div>
        <input
          id="quantity"
          name="quantity"
          type="number"
          onChange={(e) => {
            const value = Number(e.target.value);
            setQuantity(value < 0 ? 0 : value);
          }}
          value={quantity}
          placeholder="Enter Paper Quantity"
          className="mt-3 w-full rounded-lg border border-solid p-3 focus:border-primary"
        />
      </div>

      <div className="w-1/2">
        <div className="w-full text-lg font-medium text-neutral">Status</div>
        <Select
          options={statusOptions}
          value={statusOptions.find((option) => option.value === status)}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setStatus(selectedOption.value as AllocateStatus);
            }
          }}
          placeholder="Choose Status"
          className="mt-3 w-full"
        />
      </div>
      <div className="flex w-1/6 flex-row pt-10">
        <Button
          onClick={handleConfirm}
          theme="primary"
          variant="contained"
          width="full"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AllocateSessionDetail;
