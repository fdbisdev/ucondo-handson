import { Dimensions, NativeModules } from "react-native";
import { IListItem } from "./types";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const { StatusBarManager } = NativeModules;

export const colors = {
    primary: '#622490',
    secondary: '#F0EDF5',
    white: '#FFFFFF',
    negativeButton: '#FF6680',
    title: '#3D3D4C',
    subtitle: '#A0A0B2',
    lightGray: '#6C6C80',
    border: '#E6E6F0',
    label: '#6A6A6A',
    icon: '#C4C4D1',
    recipe: '#4CD62B',
    expenses: '#E28856',
    placeholder: '#777777'
}

export const acceptLaunch = [
    {
        label: 'Sim',
        value: true,
    },
    {
        label: 'Não',
        value: false,
    }
]

export const types = [
    {
        label: 'Receita',
        value: 'Receita',
    },
    {
        label: 'Despesa',
        value: 'Despesa',
    }
]
