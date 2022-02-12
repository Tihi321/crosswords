export interface IIsSlotPresent {
  datasetName: string;
  slotName: string;
  elements?: Element[]
}

export type TDropdownItem = {
  id: string;
  value: string;
};

export type TDropdownItems = TDropdownItem[];