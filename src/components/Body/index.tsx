import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, Platform, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactNativeModal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';

import { IBody, IListItem, RootParamList } from '../../utils/types';
import { SCREEN_HEIGHT, acceptLaunch, colors, types } from '../../utils/constants';
import { useBill } from '../../hooks/useBills';

import styles from './styles';
import { orderByCode } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Body: React.FC<IBody> = ({ searchable }: IBody) => {
    const [launchPicker, setLaunchPicker] = React.useState<boolean>(false);
    const [launch, setLaunch] = React.useState<boolean>(true);
    const [parent, setParent] = React.useState<any>(0);
    const [parentPicker, setParentPicker] = React.useState<boolean>(false);
    const [typePicker, setTypePicker] = React.useState<boolean>(false);
    const [type, setType] = React.useState<any>();
    const [parentsList, setParentsList] = React.useState<any[]>([]);
    const [selectedToDelete, setSelectedToDelete] = React.useState<IListItem | null>(null);

    const {
        bills,
        loading,
        deleteBill,
        modalVisibility,
        setModalVisibility,
        setNewBill,
        newBill,
        filtedList,
        setFiltedList,
        setError,
        error
    } = useBill();

    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    const handleDelete = useCallback((item: IListItem) => {
        setModalVisibility(true);
        setSelectedToDelete(item);
    }, [])

    const handleConfirmDelete = () => {
        deleteBill(selectedToDelete);
    }

    const handleGoToDetails = (item: IListItem) => {
        navigation.navigate('Details', { item });
    }

    const formatParentName = (item: IListItem) => {
        return String(item.code + ' - ' + item.title);
    }

    const handleSetCode = (value: any) => {
        if (value === 0) return
        const code = bills.filter((item) => {
            if (item.code === value) {
                return item.code
            }
        })
        const parentFirstElement = code[0].code.toString().split('.')[0]

        const codes = bills.map((item) => {
            const firstElement = item.code.toString().split('.')[0]
            if (firstElement === parentFirstElement) {
                return item.code
            }
        })

        const filteredCodes: string[] = codes.filter((item) => item !== undefined) as string[]

        const ordenedCodes = filteredCodes.sort((a: string, b: string): number => {
            let ret: number | undefined = 0;
            let aSplit = a && a.split('.');
            let bSplit = b && b.split('.');

            if (aSplit && bSplit) {

                for (let i = 0; i < aSplit.length; i++) {
                    if (aSplit[i] !== bSplit[i]) {
                        ret = parseInt(aSplit[i]) - parseInt(bSplit[i]);
                        break;
                    }
                }

                return ret;
            }
            else {
                return 0
            }
        }) as string[]

        const lastCode = ordenedCodes.pop()

        if (!lastCode) return

        const newCode = lastCode.split('.')[0] + '.' + (parseInt(lastCode.split('.')[1]) + 1)

        setNewBill({
            ...newBill,
            code: newCode,
        })
    }

    const handleChangeCode = (value: any) => {
        value.split('.').map((item: string) => {
            if (Number(item) > 999) {
                setError('Código inválido')
            }
        })

        bills.map((item) => {
            if (item.code === value) {
                if (error !== '') {
                    setError('Código já existente')
                }
            }
        })

        setNewBill({
            ...newBill,
            code: value,
        })
    }

    const handleChangeName = (value: any) => {
        setNewBill({
            ...newBill,
            title: value,
        })
    }

    const handleChangeType = (value: any) => {
        setNewBill({
            ...newBill,
            type: value,
        })
    }

    const handleChangeLaunchs = (value: any) => {
        setNewBill({
            ...newBill,
            acceptLaunch: value,
        })
    }

    useEffect(() => {
        const parents = bills.map((item) => {
            if (!item.acceptLaunch) {
                return {
                    label: formatParentName(item),
                    value: item.code,
                }
            }
            else {
                return
            }
        })
        setFiltedList(bills.sort(orderByCode))
        setParentsList([{ label: 'Nenhum', value: 0 }, ...parents.filter((item) => item !== undefined)]);
    }, [bills, selectedToDelete])

    const renderListElement = (item: IListItem) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => handleGoToDetails(item)}
            >
                <View style={styles.listElement}>
                    <View style={styles.listElementHeader}>
                        <Text style={[styles.listElementTitle, {
                            color: item.type === 'Receita' ? colors.recipe : colors.expenses
                        }]}>{item.code}</Text>
                        <Text style={[styles.listElementTitle, {
                            color: item.type === 'Receita' ? colors.recipe : colors.expenses
                        }]}>-</Text>
                        <Text style={[styles.listElementTitle, {
                            color: item.type === 'Receita' ? colors.recipe : colors.expenses
                        }]}>{item.title}</Text>
                    </View>
                    <Pressable onPress={() => handleDelete(item)}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            size={20}
                            color={colors.icon}
                        />
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (loading) {
        return (
            <View style={[styles.container,
            {
                marginTop: searchable ? SCREEN_HEIGHT * 0.04 : SCREEN_HEIGHT * 0.12,
                alignItems: 'center',
                justifyContent: 'center',
            }
            ]}>
                <ActivityIndicator
                    size='large'
                    color={colors.primary}
                />
            </View>
        )
    }

    return (
        <View style={[
            styles.container,
            {
                marginTop: searchable ? SCREEN_HEIGHT * 0.04 : SCREEN_HEIGHT * 0.12,
            }]}>
            {
                searchable ? (
                    <View style={{
                        flex: 1,
                    }}>
                        <View
                            style={styles.listHeader}
                        >
                            <Text style={styles.listHeaderTitle}>
                                Listagem
                            </Text>
                            <Text style={styles.listHeaderRegisters}>{bills.length} registros</Text>
                        </View>

                        <FlatList
                            style={{
                                flex: 1,
                                zIndex: 1,
                            }}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 30,
                            }}
                            data={filtedList}
                            renderItem={({ item }) => renderListElement(item)}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        <ReactNativeModal
                            style={styles.modal}
                            isVisible={modalVisibility}
                        >
                            <View style={{
                                flex: 1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View
                                    style={styles.modalHeader}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size={40}
                                        color={colors.negativeButton}
                                    />
                                </View>
                                <View style={styles.modalText}>
                                    <Text style={styles.modalTitle}>Deseja excluir a conta</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 8,
                                    }}>
                                        <Text style={[
                                            styles.modalTitle,
                                            {
                                                fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
                                                fontStyle: 'normal',
                                                alignSelf: 'center',
                                            }
                                        ]}>{selectedToDelete?.code + ' - ' + selectedToDelete?.title}</Text>
                                        <Text style={styles.modalTitle}> ?</Text>
                                    </View>
                                </View>
                                <View
                                    style={styles.modalButtons}
                                >
                                    <Pressable
                                        style={styles.cancelButtonContainer}
                                        onPress={() => setModalVisibility(false)}>
                                        <Text style={styles.cancelButton}>Nao!</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => handleConfirmDelete()}
                                        style={styles.confirmButtonContainer}
                                    >
                                        <Text style={styles.confirmButton}>Com certeza!</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ReactNativeModal>
                    </View>
                ) : (
                    <View
                        style={styles.listHeaderAdded}
                    >
                        <Text
                            style={styles.label}
                        >Conta pai</Text>
                        <DropDownPicker
                            open={parentPicker}
                            setOpen={setParentPicker}
                            style={styles.dropDownPicker}
                            placeholder="Selecione"
                            value={parent}
                            setValue={setParent}
                            onChangeValue={(value) => handleSetCode(value)}
                            items={parentsList}
                            placeholderStyle={{
                                color: colors.placeholder,
                            }}
                            listItemLabelStyle={{
                                color: colors.placeholder,
                            }}
                            labelStyle={{
                                color: colors.placeholder,
                            }}
                            dropDownContainerStyle={{
                                borderColor: colors.border,
                            }}
                        />
                        <Text
                            style={styles.label}
                        >
                            Código
                        </Text>
                        <TextInput
                            placeholder='Código da conta'
                            placeholderTextColor={colors.placeholder}
                            style={styles.input}
                            value={newBill.code ? String(newBill.code) : ''}
                            onChangeText={(value) => handleChangeCode(value)}
                        />
                        <Text
                            style={styles.label}
                        >
                            Nome
                        </Text>
                        <TextInput
                            placeholder='Nome da conta'
                            placeholderTextColor={colors.placeholder}
                            style={styles.input}
                            value={newBill.title}
                            onChangeText={(value) => handleChangeName(value)}
                        />
                        <Text
                            style={styles.label}
                        >
                            Tipo
                        </Text>
                        <DropDownPicker
                            dropDownDirection='TOP'
                            open={typePicker}
                            setOpen={setTypePicker}
                            style={styles.dropDownPicker}
                            placeholder="Selecione"
                            value={type}
                            setValue={setType}
                            onChangeValue={(value) => handleChangeType(value)}
                            items={types}
                            placeholderStyle={{
                                color: colors.placeholder,
                            }}
                            listItemLabelStyle={{
                                color: colors.placeholder,
                            }}
                            labelStyle={{
                                color: colors.placeholder,
                            }}
                            bottomOffset={100}
                            dropDownContainerStyle={{
                                borderColor: colors.border,
                            }}
                        />
                        <Text
                            style={styles.label}
                        >Aceita lançamentos</Text>
                        <DropDownPicker
                            open={launchPicker}
                            setOpen={setLaunchPicker}
                            style={styles.dropDownPicker}
                            placeholder="Selecione"
                            value={launch}
                            setValue={setLaunch}
                            onChangeValue={(value) => handleChangeLaunchs(value)}
                            items={acceptLaunch}
                            placeholderStyle={{
                                color: colors.placeholder,
                            }}
                            listItemLabelStyle={{
                                color: colors.placeholder,
                            }}
                            labelStyle={{
                                color: colors.placeholder,
                            }}
                            dropDownContainerStyle={{
                                borderColor: colors.border,
                            }}
                        />
                    </View>
                )
            }
        </View>
    )
}

export default Body;