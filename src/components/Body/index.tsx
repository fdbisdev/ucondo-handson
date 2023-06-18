import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, Platform, Pressable, Text, TextInput, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactNativeModal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';

import { IBody, IListItem } from '../../utils/types';
import { SCREEN_HEIGHT, acceptLaunch, colors, types } from '../../utils/constants';
import { useBill } from '../../hooks/useBills';

import styles from './styles';
import { orderByCode } from '../../utils/functions';

const Body: React.FC<IBody> = ({ searchable }: IBody) => {
    const [launchPicker, setLaunchPicker] = React.useState<boolean>(false);
    const [launch, setLaunch] = React.useState<boolean>(true);
    const [parent, setParent] = React.useState<any>(0);
    const [parentPicker, setParentPicker] = React.useState<boolean>(false);
    const [codeInput, setCodeInput] = React.useState<number | undefined>(0);
    const [typePicker, setTypePicker] = React.useState<boolean>(false);
    const [type, setType] = React.useState<any>();
    const [parentsList, setParentsList] = React.useState<any[]>([]);
    const [filteredList, setFilteredList] = React.useState<IListItem[]>([]);
    const [selectedToDelete, setSelectedToDelete] = React.useState<IListItem | null>(null);

    const { bills, loading, deleteBill, modalVisibility, setModalVisibility } = useBill();

    const handleDelete = useCallback((item: IListItem) => {
        setModalVisibility(true);
        setSelectedToDelete(item);
    }, [])

    const handleConfirmDelete = () => {
        console.log(selectedToDelete)
        deleteBill(selectedToDelete);
    }

    const formatParentName = (item: IListItem) => {
        return String(item.code + ' - ' + item.title);
    }

    const handleSetCode = useCallback((value: any) => {
        const code = bills.find((item) => item.code === value);
        if (code?.code) {
            setCodeInput((Number(code?.code) + Number(Number(code?.code) / 10)) ?? undefined);
        }
    }, [])

    useEffect(() => {
        console.log('selected', selectedToDelete)
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
        setFilteredList(bills.sort(orderByCode))
        setParentsList(parents.filter((item) => item !== undefined));
    }, [bills, selectedToDelete])

    const renderListElement = (item: IListItem) => {
        return (
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
                    <>
                        <View
                            style={styles.listHeader}
                        >
                            <Text style={styles.listHeaderTitle}>
                                Listagem
                            </Text>
                            <Text style={styles.listHeaderRegisters}>{bills.length} registros</Text>
                        </View>

                        <FlatList
                            data={filteredList}
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
                    </>
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
                            value={codeInput ? String(codeInput) : ''}
                            onChangeText={(value) => setCodeInput(Number(value))}
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
                            items={types}
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
                            items={acceptLaunch}
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