import React, { useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IBillsParams, IListItem, Props } from '../utils/types';
import { Alert } from 'react-native';

const BillsContext = React.createContext<IBillsParams | null>(null);

export const useBill = () => {
    const context = React.useContext(BillsContext);

    if (!context) throw new Error('useBill must be used within a BillsProvider');

    return context;
}

const initialState: IListItem[] = [
    {
        id: 1,
        code: 1,
        title: "Receitas",
        type: "Receita",
        acceptLaunch: false,
    },
    {
        id: 2,
        code: 2,
        title: "Despesas",
        type: "Despesa",
        acceptLaunch: false,
    },
    {
        id: 3,
        code: 1.1,
        title: "Taxa condominial",
        type: "Receita",
        acceptLaunch: true,
    }
]

export const BillsProvider: React.FC<Props> = ({ children }: Props) => {
    const [bills, setBills] = React.useState<IListItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getBills = useCallback(async () => {
        setLoading(true);
        try {
            const response = await AsyncStorage.getItem('@bills');
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

    const deleteBill = useCallback(async (id: string) => {
        console.log('deleteBill');
    }, []);

    useEffect(() => {
        const prepareData = async () => {
            await getBills();
        }
        prepareData()
    }, [])

    return (
        <BillsContext.Provider value={{ bills, getBills, saveBill, addBill, deleteBill, loading }}>
            {children}
        </BillsContext.Provider>
    )
}