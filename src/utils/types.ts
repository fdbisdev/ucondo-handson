import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootParamList = {
    Home: undefined;
    NewRevenue: undefined;
    Details: { item: IListItem };
};

export interface IHeader {
    title: string;
    rightIcon?: IconProp;
    leftIcon?: IconProp;
    pressableFunction?: (item?: IListItem) => void;
}

export interface IBody {
    searchable?: boolean;
    details?: IListItem;
}

export interface IListItem  {
    id: number;
    code: string;
    title: string;
    type: string;
    acceptLaunch: boolean;
    parent: string;
}

export interface IBillsParams {
    bills: IListItem[]
    getBills: () => Promise<void>
    saveBill: (bill: IListItem) => Promise<void>
    deleteBill: (item: IListItem | null) => Promise<void>
    loading: boolean
    modalVisibility: boolean
    setModalVisibility: (value: boolean) => void
    newBill: IListItem
    setNewBill: (value: IListItem) => void
    filtedList: IListItem[]
    setFiltedList: (value: IListItem[]) => void
    handleSearch: (value: string) => void
    error: string
    setError: (value: string) => void
}

export interface Props {
    children: React.ReactNode
}

export interface IModal {
    visible: boolean;
    selected: IListItem | null; 
}
