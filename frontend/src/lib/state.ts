import { atom } from 'jotai'
import { mockProducts, Product, SearchContext, VoiceResponse } from './models'

export const productsAtom = atom<Product[]>([]);

export const currentProductAtom = atom<Product | null>(null);

export const bottomBarAtom = atom<VoiceResponse>({
    text: 'What do you want to do?',
    examples: []
});

export const speechStateAtom = atom<'none' | 'speaking' | 'loading'>('none');

export const searchAtom = atom<SearchContext>({
    query: 'Winter jackets',
    filters: []
});

export const wishlistAtom = atom<Product[]>([]);