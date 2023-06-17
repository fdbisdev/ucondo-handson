import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Platform, Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import { IBody, IListItem } from '../../utils/types';
import { SCREEN_HEIGHT, colors } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactNativeModal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { useBill } from '../../hooks/useBills';


const formatParentName = (item: IListItem) => {
    return String(item.code + ' - ' + item.title);
}

const acceptLaunch = [
    {
        label: 'Sim',
        value: true,
    },
    {
        label: 'Não',
        value: false,
    }
]



const Body: React.FC<IBody> = ({ searchable }: IBody) => {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [selectedToDelete, setSelectedToDelete] = React.useState<IListItem | null>(null);
    const [launchPicker, setLaunchPicker] = React.useState<boolean>(false);
    const [launch, setLaunch] = React.useState<boolean>(true);
    const [parent, setParent] = React.useState<any>();
    const [parentPicker, setParentPicker] = React.useState<boolean>(false);
    const [typePicker, setTypePicker] = React.useState<boolean>(false);
    const [type, setType] = React.useState<any>();

    const { bills, loading } = useBill();

    const handleDelete = (item: IListItem) => {
        setShowModal(true);
        setSelectedToDelete(item);
    }

    const parents = bills.map((item) => {
        return {
            label: formatParentName(item),
            value: item.code,
        }
    })

    const types = bills.map((item) => {
        return {
            label: item.type,
            value: item.type,
        }
    })

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
                            data={bills}
                            renderItem={({ item }) => renderListElement(item)}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        <ReactNativeModal
                            style={styles.modal}
                            isVisible={showModal}
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
                                        onPress={() => setShowModal(false)}>
                                        <Text style={styles.cancelButton}>Nao!</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.confirmButtonContainer}
                                    >
                                        <Text style={styles.confirmButton}>Com certeza!</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ReactNativeModal></>
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
                            items={parents}
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