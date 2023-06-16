import React from 'react';
import { FlatList, Platform, Pressable, Text, TextInput, View } from 'react-native';
import styles from './styles';
import { IBody, IListItem } from '../../utils/types';
import { SCREEN_HEIGHT } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactNativeModal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';

const mockData = [
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
    }
]

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

const parents = mockData.map((item) => {
    return {
        label: formatParentName(item),
        value: item.code,
    }
})

const types = mockData.map((item) => {
    return {
        label: item.type,
        value: item.type,
    }
})

const Body: React.FC<IBody> = ({ searchable }: IBody) => {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [selectedToDelete, setSelectedToDelete] = React.useState<IListItem | null>(null);
    const [launchPicker, setLaunchPicker] = React.useState<boolean>(false);
    const [launch, setLaunch] = React.useState<boolean>(true);
    const [parent, setParent] = React.useState<any>(mockData[0].code);
    const [parentPicker, setParentPicker] = React.useState<boolean>(false);
    const [typePicker, setTypePicker] = React.useState<boolean>(false);
    const [type, setType] = React.useState<any>(mockData[0].type);

    const handleDelete = (item: IListItem) => {
        setShowModal(true);
        setSelectedToDelete(item);
    }

    const renderListElement = (item: IListItem) => {
        return (
            <View style={styles.listElement}>
                <View style={styles.listElementHeader}>
                    <Text style={[styles.listElementTitle, {
                        color: item.type === 'Receita' ? '#4CD62B' : '#E28856'
                    }]}>{item.code}</Text>
                    <Text style={[styles.listElementTitle, {
                        color: item.type === 'Receita' ? '#4CD62B' : '#E28856'
                    }]}>-</Text>
                    <Text style={[styles.listElementTitle, {
                        color: item.type === 'Receita' ? '#4CD62B' : '#E28856'
                    }]}>{item.title}</Text>
                </View>
                <Pressable onPress={() => handleDelete(item)}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        size={20}
                        color='#C4C4D1'
                    />
                </Pressable>
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
                            <Text style={styles.listHeaderRegisters}>{mockData.length} registros</Text>
                        </View>

                        <FlatList
                            data={mockData}
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
                                        color='#FF6680'
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
                                color: '#777777',
                            }}
                            labelStyle={{
                                color: '#777777',
                            }}
                            dropDownContainerStyle={{
                                borderColor: '#E6E6F0',
                            }}
                        />
                        <Text
                            style={styles.label}
                        >
                            Código
                        </Text>
                        <TextInput
                            placeholder='Código da conta'
                            placeholderTextColor={'#777777'}
                            style={styles.input}
                        />
                        <Text
                            style={styles.label}
                        >
                            Nome
                        </Text>
                        <TextInput
                            placeholder='Nome da conta'
                            placeholderTextColor={'#777777'}
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
                                color: '#777777',
                            }}
                            labelStyle={{
                                color: '#777777',
                            }}
                            bottomOffset={100}
                            dropDownContainerStyle={{
                                borderColor: '#E6E6F0',
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
                                color: '#777777',
                            }}
                            labelStyle={{
                                color: '#777777',
                            }}
                            dropDownContainerStyle={{
                                borderColor: '#E6E6F0',
                            }}
                        />
                    </View>
                )
            }
        </View>
    )
}

export default Body;