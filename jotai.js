import {atom} from 'jotai';
import {
  atomWithRefresh,
  atomWithStorage,
  createJSONStorage,
  loadable,
  unwrap,
} from 'jotai/utils';
import {
  atomWithInfiniteQuery,
  atomWithQuery,
  queryClientAtom,
} from 'jotai-tanstack-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import {atomEffect} from 'jotai-effect';

console.log('API_URL', API_URL);

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

const loadHomeProductsAtom = atomWithInfiniteQuery(get => ({
  queryKey: ['products'],
  queryFn: async ({pageParam}) => {
    try {
      const page = pageParam;
      const search = get(homeProductsSearchAtom);
      const res = await fetch(
        `${API_URL}/products?page=${page}&search=${search}`,
      );
      return res.json();
    } catch (err) {
      console.log('Error fetching products data', err);
    }
  },
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    return lastPage?.data.length ? lastPageParam + 1 : null;
  },
  initialPageParam: 1,
}));
const homeProductsDefaultAtom = atom([]);
const homeProductsAtom = atom(
  get => get(homeProductsDefaultAtom),
  (_get, set, pages) => {
    const productsArr = [];
    for (const page of pages) {
      if (page?.data) {
        for (const product of page.data) {
          productsArr.push(product);
        }
      }
    }
    set(homeProductsDefaultAtom, productsArr);
  },
);
const homeProductsSearchAtom = atom('');
const homeProductsSearchToggleAtom = atom(false);
const homeProductsEffectAtom = atomEffect((get, set) => {
  const effectData = get(loadHomeProductsAtom);
  if (!effectData.isPending && !effectData.isFetching) {
    const pages = effectData.data.pages;
    set(homeProductsAtom, pages);
  }
});

const storage = createJSONStorage(() => AsyncStorage);
const myComparisonAtom = atomWithStorage('myComparison', '', storage);
const viewIndexComparisonAtom = atom(0);
const viewPagerIndexComparisonAtom = atom(0);
const loadMyComparisonProductsAtom = atomWithQuery(get => ({
  queryKey: ['myComparison'],
  queryFn: async () => {
    const ids = get(myComparisonAtom)?.status
      ? get(myComparisonAtom)?.value || ''
      : get(myComparisonAtom);
    // console.log('ids', ids, get(myComparisonAtom));
    const res = await fetch(`${API_URL}/productIds/${ids}`);
    return res.json();
  },
}));
const myComparisonProductAtom = atom(null);
const myComparisonTriggerDeleteAtom = atom(false);
const myComparisonEffectAtom = atomEffect((get, set) => {
  const effectData = get(loadMyComparisonProductsAtom);
  if (!effectData.isPending && !effectData.isFetching) {
    // console.log('effectData', JSON.stringify(effectData.data));
    const data = effectData.data;
    const index = get(viewIndexComparisonAtom);
    if (data?.data) {
      set(myComparisonProductAtom, data.data[index]);
      set(viewPagerIndexComparisonAtom, 0);
    }
  }
});

const aboutAtom = atomWithQuery(get => ({
  queryKey: ['about'],
  queryFn: async () => {
    try {
      const res = await fetch(`${API_URL}/about`);
      return res.text();
    } catch (err) {
      console.log('Error connecting to server', err);
      return 'Error connecting to server';
    }
  },
}));

export {
  aboutAtom,
  homeProductsAtom,
  homeProductsDefaultAtom,
  homeProductsSearchAtom,
  homeProductsSearchToggleAtom,
  loadHomeProductsAtom,
  homeProductsEffectAtom,
  myComparisonAtom,
  myComparisonTriggerDeleteAtom,
  myComparisonProductAtom,
  loadMyComparisonProductsAtom,
  myComparisonEffectAtom,
  screenAtom,
  screenIndexAtom,
  viewIndexComparisonAtom,
  viewPagerIndexComparisonAtom,
  queryClientAtom,
};
