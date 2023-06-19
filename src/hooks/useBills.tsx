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

export const BillsProvider: React.FC<Props> = ({ children }: Props) => {
    const [bills, setBills] = React.useState<IListItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [modalVisibility, setModalVisibility] = React.useState<boolean>(false);
    const [newBill, setNewBill] = React.useState<IListItem>({} as IListItem);
    const [filtedList, setFiltedList] = React.useState<IListItem[]>([]);

    const handleSearch = useCallback(async (search: string) => {
        setLoading(true);
        if (search === '') {
            setFiltedList(bills);
        }
        else {
            const filtered = bills.filter((bill) => bill.title.toLowerCase().includes(search.toLowerCase()));
            setFiltedList(filtered);
        }
        setLoading(false);
    }, [bills]);

    const getBills = useCallback(async () => {
        setLoading(true);
        try {
            const response = await AsyncStorage.getItem('@bills');
            if (response) {
                setBills(JSON.parse(response));
            }
            else {
                setBills([]);
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
        setLoading(true);

        const billsStoraged = await AsyncStorage.getItem('@bills');

        let maxId = 0;

        if (billsStoraged) {
            const billsParsed: IListItem[] = JSON.parse(billsStoraged);

            if (billsParsed.length === 0) {
                maxId = 1;
            }
            else {
                maxId = billsParsed.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
            }

            const newBillData: IListItem = {
                id: maxId + 1,
                title: bill.title,
                type: bill.type,
                code: bill.code,
                acceptLaunch: bill.acceptLaunch ?? true,
            }

            const newBills = [...billsParsed, newBillData];
            try {
                await AsyncStorage.setItem('@bills', JSON.stringify(newBills));
                await getBills();

                Alert.alert('Conta inserida com sucesso!');
            }
            catch (error) {
                Alert.alert('Ooops! Erro ao inserir conta, por favor tente novamente.');
            }
            finally {
                setLoading(false);
                setNewBill({} as IListItem);
            }
        }
    }, []);

    const deleteBill = useCallback(async (item: IListItem | null) => {
        if (!item) return;
        setLoading(true);
        setModalVisibility(false);
        const newBills = bills.filter((bill) => bill.id !== item.id);
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
        <BillsContext.Provider value={{
            bills,
            getBills,
            saveBill,
            deleteBill,
            loading,
            modalVisibility,
            setModalVisibility,
            newBill,
            setNewBill,
            filtedList,
            setFiltedList,
            handleSearch,
        }}>
            {children}
        </BillsContext.Provider>
    )
}