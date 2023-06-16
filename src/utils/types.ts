import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type RootParamList = {
    Home: undefined;
    NewRevenue: undefined;
};

export interface IHeader {
    title: string;
    rightIcon: IconProp;
    leftIcon?: IconProp;
    pressableFunction: () => void;
    
}

export interface IBody {
    searchable?: boolean;
}

export interface IListItem  {
    id: number;
    code: number;
    title: string;
    type: string;
    acceptLaunch: boolean;
}

export interface IBillsParams {
    bills: IListItem[]
    getBills: () => Promise<void>
    saveBill: (bill: IListItem) => Promise<void>
    addBill: (bill: IListItem) => Promise<void>
    deleteBill: (id: string) => Promise<void>
}

export interface Props {
    children: React.ReactNode
}