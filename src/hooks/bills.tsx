import React, { ChildContextProvider, ReactComponentElement, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IBillsParams, IListItem, Props } from '../utils/types';

const BillsContext = React.createContext<IBillsParams | null>(null);

export const useBill = () => {
    const context = React.useContext(BillsContext);

    if (!context) throw new Error('useBill must be used within a BillsProvider');

    return context;
}

export const BillsProvider: React.FC<Props> = ({ children }: Props) => {
    const [bills, setBills] = React.useState<IListItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getBills = useCallback(async () => {
        console.log('getBills');
    }, []);

    const saveBill = useCallback(async (bill: IListItem) => {
        console.log('saveBill');
    }, []);

    const addBill = useCallback(async (bill: IListItem) => {
        console.log('addBill');
    }, []);

    const deleteBill = useCallback(async (id: string) => {
        console.log('deleteBill');
    }, []);

    return (
        <BillsContext.Provider value={{ bills, getBills, saveBill, addBill, deleteBill }}>
            {children}
        </BillsContext.Provider>
    )
}