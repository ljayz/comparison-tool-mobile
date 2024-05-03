import React from 'react';
import {Dimensions, View, ImageBackground, Image} from 'react-native';
import {
  Button,
  Card,
  List,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
  Spinner,
  Layout,
  useTheme,
  Input,
} from '@ui-kitten/components';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {
  homeProductsAtom,
  homeProductsResetPageAtom,
  homeProductsSearchAtom,
  homeProductsSearchToggleAtom,
  loadHomeProductsAtom,
  myComparisonAtom,
  myComparisonStorageReaderAtomLoadable,
  myComparisonStorageWriterAtom,
} from '../jotai';

const BookmarkIcon = props => <Icon {...props} name="bookmark" />;
const SearchIcon = props => <Icon {...props} name="search" />;

const lazadaLogoURL = 'https://iili.io/JS6Ucg4.png';
const shopeeLogoURL = 'https://iili.io/JSPfQs9.png';

export const Products = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [products, setProducts] = useAtom(homeProductsAtom);
  const [
    {
      data,
      fetchNextPage,
      isError,
      isFetching,
      isRefetching,
      isPending,
      isFetchingNextPage,
      hasNextPage,
      refetch,
    },
  ] = useAtom(loadHomeProductsAtom);
  const [search, setSearch] = useAtom(homeProductsSearchAtom);
  const homeProductsSearchToggle = useAtomValue(homeProductsSearchToggleAtom);
  const setHomeProductsResetPage = useSetAtom(homeProductsResetPageAtom);

  React.useEffect(() => {
    if (data?.pages) {
      setProducts(data.pages);
    }
  }, [data?.pages, setProducts]);

  const myComparison = useAtomValue(myComparisonAtom);
  const myComparisonStorage = useAtomValue(
    myComparisonStorageReaderAtomLoadable,
  );
  const setMyComparisonStorage = useSetAtom(myComparisonStorageWriterAtom);

  React.useEffect(() => {
    if (myComparisonStorage.state === 'hasData') {
      setMyComparisonStorage('load');
    }
  }, [myComparisonStorage, setMyComparisonStorage]);

  const onItemPress = index => {
    // do nothing
  };

  const onItemBookmarkPress = product => {
    if (myComparisonStorage.state !== 'hasData') {
      return;
    }

    const productId = String(product.item.id);
    // console.log(productId, myComparisonStorage.data);

    if (!productId || myComparison.includes(productId)) {
      return;
    }

    const newData = [...myComparison];
    newData.push(productId);
    setMyComparisonStorage('update', newData);
  };
  // console.log('myComparison', myComparison);

  const renderItemFooter = product => (
    <View style={styles.itemFooter}>
      <Text category="s1">₱ {product.item.price}</Text>
      <Button
        style={[styles.iconButton]}
        size="small"
        onPress={() => onItemBookmarkPress(product)}
        accessoryLeft={BookmarkIcon}
        disabled={myComparison.includes(product.item.id)}
      />
    </View>
  );

  const renderItemHeader = product => (
    <>
      <View style={styles.itemHeaderSite}>
        <Image
          style={styles.siteLogo}
          source={{
            uri: product.item.site === 'shopee' ? shopeeLogoURL : lazadaLogoURL,
          }}
        />
        <Text category="s1">
          {product.item.site === 'shopee' ? 'Shopee' : 'Lazada'}
        </Text>
      </View>
      <ImageBackground
        resizeMethod="center"
        style={styles.itemHeader}
        source={{uri: product.item.image}}
      />
    </>
  );

  const renderProductItem = product => (
    <Card
      appearance="outline"
      style={[
        styles.productItem,
        {
          backgroundColor:
            product.item.site === 'lazada'
              ? theme['color-info-800']
              : theme['color-orange-800'],
        },
      ]}
      header={() => renderItemHeader(product)}
      footer={() => renderItemFooter(product)}
      onPress={() => onItemPress(product)}>
      <View>
        <Text category="c2" numberOfLines={3}>
          {product.item.name}
        </Text>
      </View>
    </Card>
  );

  const renderListFooter = () => (
    <Layout level="2" style={styles.listFooter}>
      {isFetchingNextPage && <Spinner />}
      {hasNextPage === false && (
        <Text appearance="hint">Reached end of page</Text>
      )}
    </Layout>
  );

  // if (isFetching) {
  //   return <Text>Fetching</Text>;
  // }

  // if (isError) {
  //   return <Text>Error</Text>;
  // }

  if (isRefetching) {
    setHomeProductsResetPage(false);
  }

  return (
    <>
      {homeProductsSearchToggle && (
        <Layout style={styles.listHeader} level="2">
          <Input
            placeholder="Search"
            value={search}
            accessoryRight={SearchIcon}
            onChangeText={nextValue => setSearch(nextValue)}
            onSubmitEditing={() => {
              setHomeProductsResetPage(true);
              refetch();
            }}
          />
        </Layout>
      )}
      <List
        contentContainerStyle={styles.productList}
        data={products}
        numColumns={2}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        renderItem={renderProductItem}
        ListFooterComponent={renderListFooter}
      />
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
  },
  itemHeader: {
    height: 140,
  },
  itemHeaderSite: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  siteLogo: {
    height: 16,
    width: 16,
    marginRight: 5,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 8,
    paddingHorizontal: 14,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  listHeader: {
    padding: 16,
    backgroundColor: 'background-basic-color-1',
  },
  listFooter: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});
