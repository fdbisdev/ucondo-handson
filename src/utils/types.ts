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