import React, { useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IBillsParams, IListItem, Props } from '../utils/types';
import { Alert } from 'react-native';
import { initialState } from '../utils/constants';

const BillsContext = React.createContext<IBillsParams | null>(null);

export const useBill = () => {
    const context = React.useContext(BillsContext);

    if (!context) throw new Error('useBill must be used within a BillsProvider');

    return context;
}

export const BillsProvider: React.FC<Props> = ({ children }: Props) => {
    const [bills, setBills] = React.useState<IListItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [modalVisibility, setModalVisibility] = React.useState<boolean>(false);

    const getBills = useCallback(async () => {
        setLoading(true);
        console.log('getBills');
        try {
            const response = await AsyncStorage.getItem('@bills');
            console.log('response', response);
            if (response) {
                setBills(JSON.parse(response));
            } else {
                setBills(initialState);
            }
        }
        catch (error) {
            Alert.alert('Ooops! Erro ao buscar contas, por favor tente novamente.');
        }
        finally {
            setLoading(false);
        }

    }, []);

    const saveBill = useCallback(async (bill: IListItem) => {
        console.log('saveBill');
    }, []);

    const addBill = useCallback(async (bill: IListItem) => {
        console.log('addBill');
    }, []);

    const deleteBill = useCallback(async (item: IListItem | null) => {
        if (!item) return;
        setLoading(true);
        setModalVisibility(false);
        const newBills = bills.filter((bill) => bill.id !== item.id);
        console.log('new', newBills);
        try {
            await AsyncStorage.setItem('@bills', JSON.stringify(newBills));
            await getBills();

            Alert.alert('Conta deletada com sucesso!');
        }
        catch (error) {
            Alert.alert('Ooops! Erro ao deletar conta, por favor tente novamente.');
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const prepareData = async () => {
            await getBills();
        }
        prepareData()
    }, [])

    return (
        <BillsContext.Provider value={{ bills, getBills, saveBill, addBill, deleteBill, loading, modalVisibility, setModalVisibility }}>
            {children}
        </BillsContext.Provider>
    )
}