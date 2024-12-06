// import { usePrinterStore } from '@/stores/printer';
import { useState } from 'react';

import { usePrinterStore } from '@/stores/printer';
import { Printer, Status, Location, PrinterType } from '@/types/printer';

import { Button } from '../button';
import Select from '../select';

const statusOptions = Object.values(Status).map((status) => ({
  label: status,
  value: status,
}));

const locationOptions = Object.values(Location).map((location) => ({
  label: location,
  value: location,
}));

const typeOptions = Object.values(PrinterType).map((type) => ({
  label: type,
  value: type,
}));

type PrinterDetailProp = {
  printer: Printer;
};

const PrinterDetail = ({ printer }: PrinterDetailProp) => {
  const { setPrinterList, printerList } = usePrinterStore();

  const [name, setName] = useState(printer.name);
  const [location, setLocation] = useState(printer.location);
  const [status, setStatus] = useState(printer.status);
  const [type, setType] = useState(printer.type);

  const handleConfirm = () => {
    printerList[printer.id - 1] = {
      id: printer.id,
      name: name,
      status: status,
      type: type,
      location: location,
      paperAvailable: printer.paperAvailable,
    };
    setPrinterList(printerList);
    alert('Printer updated');
  };

  return (
    <div className="mt-4 flex w-full flex-col space-y-8 pr-10">
      <div className="w-1/2">
        <div className="w-full text-lg font-medium text-neutral">
          Printer Name
        </div>
        <input
          id="name"
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="mt-3 w-full rounded border p-3 text-base focus:border-primary"
        />
      </div>

      <div className="w-1/2">
        <div className="w-full text-lg font-medium text-neutral">Location</div>
        <Select
          options={locationOptions.filter(
            (x) => !printer.location.includes(x.value),
          )}
          value={locationOptions.find((option) => option.value === location)}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setLocation(selectedOption.value as Location);
            }
          }}
          placeholder={'Choose Location'}
          className="mt-3 w-full"
        />
      </div>

      <div className="w-1/2">
        <div className="w-full text-lg font-medium text-neutral">Type</div>
        <Select
          options={typeOptions.filter((x) => !printer.type.includes(x.value))}
          value={typeOptions.find((option) => option.value === type)}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setType(selectedOption.value as PrinterType);
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
          id="status"
          name="status"
          type="text"
          disabled
          placeholder={String(printer.paperAvailable)}
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
              setStatus(selectedOption.value as Status);
            }
          }}
          placeholder={'Choose Status'}
          className="mt-3 w-full"
        />
      </div>
      <div className="w-1/6 pt-10">
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

export default PrinterDetail;
