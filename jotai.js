import {atom} from 'jotai';
import {atomWithRefresh, loadable, unwrap} from 'jotai/utils';
import {atomWithInfiniteQuery, atomWithQuery} from 'jotai-tanstack-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const screens = ['home', 'comparison', 'about'];
const screenAtom = atom('home');
const screenIndexAtom = atom(
  get => {
    const screen = get(screenAtom);
    return screens.indexOf(screen);
  },
  (_get, set, index) => {
    set(screenAtom, screens[index]);
  },
);
const loadHomeProductsAtom = atomWithInfiniteQuery(() => ({
  queryKey: ['products'],
  queryFn: async ({pageParam}) => {
    try {
      const res = await fetch(`${API_URL}/products?page=${pageParam}`);
      return res.json();
    } catch (err) {
      console.log('Error fetching data', err);
    }
  },
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    return lastPage.data.length ? lastPageParam + 1 : null;
  },
  initialPageParam: 1,
}));
const homeProductsDefaultAtom = atom([]);
const homeProductsAtom = atom(
  get => get(homeProductsDefaultAtom),
  (get, set, pages) => {
    const productsArr = [];
    for (const page of pages) {
      if (page.data) {
        for (const product of page.data) {
          productsArr.push(product);
        }
      }
    }
    set(homeProductsDefaultAtom, productsArr);
  },
);
const myComparisonAtom = atom([]);
const myComparisonStorageReaderAtom = atom(async () => {
  // await AsyncStorage.removeItem('myComparison');
  const myComparisonStoredData = await AsyncStorage.getItem('myComparison');
  const myComparisonData = myComparisonStoredData
    ? myComparisonStoredData.split(',')
    : [];
  return myComparisonData;
});
const myComparisonStorageWriterAtom = atom(
  null,
  async (get, set, action, data, refetch) => {
    if (action === 'update') {
      const newData = data.join(',');
      await AsyncStorage.setItem('myComparison', newData);
    }

    if (action === 'delete') {
      const newData = data.join(',');
      await AsyncStorage.setItem('myComparison', newData);
      await refetch();
    }

    const myComparisonStorageData = await AsyncStorage.getItem('myComparison');
    const myComparisonData = myComparisonStorageData
      ? myComparisonStorageData.split(',')
      : [];
    set(myComparisonAtom, myComparisonData);
  },
);
const myComparisonStorageReaderAtomLoadable = loadable(
  myComparisonStorageReaderAtom,
);
const myComparisonStorageReaderAtomUnwrap = unwrap(
  myComparisonStorageReaderAtom,
);
const viewIndexComparisonAtom = atom(0);
const comparisonProductsAtom = atomWithQuery(() => ({
  queryKey: ['myComparison'],
  queryFn: async () => {
    const ids = await AsyncStorage.getItem('myComparison');
    const res = await fetch(`${API_URL}/productIds/${ids}`);
    return res.json();
  },
}));
const comparisonProductsAtomWithRefresh = atomWithRefresh(
  comparisonProductsAtom,
);

export {
  comparisonProductsAtom,
  homeProductsAtom,
  homeProductsDefaultAtom,
  loadHomeProductsAtom,
  myComparisonAtom,
  myComparisonStorageReaderAtom,
  myComparisonStorageWriterAtom,
  myComparisonStorageReaderAtomLoadable,
  myComparisonStorageReaderAtomUnwrap,
  screenAtom,
  screenIndexAtom,
  viewIndexComparisonAtom,
};
