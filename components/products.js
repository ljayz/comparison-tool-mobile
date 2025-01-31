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
import {useAtom, useAtomValue} from 'jotai';

import {
  homeProductsAtom,
  homeProductsSearchAtom,
  homeProductsSearchToggleAtom,
  loadHomeProductsAtom,
  myComparisonAtom,
  queryClientAtom,
  homeProductsEffectAtom,
} from '../jotai';
import {Loading} from './loading';

const BookmarkIcon = props => <Icon {...props} name="bookmark" />;
const SearchIcon = props => <Icon {...props} name="search" />;

export const Products = () => {
  useAtom(homeProductsEffectAtom);

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const products = useAtomValue(homeProductsAtom);
  const queryClient = useAtomValue(queryClientAtom);
  const homeProductsSearchToggle = useAtomValue(homeProductsSearchToggleAtom);
  const [
    {
      fetchNextPage,
      isError,
      isFetching,
      isPending,
      isFetchingNextPage,
      hasNextPage,
    },
  ] = useAtom(loadHomeProductsAtom);
  const [search, setSearch] = useAtom(homeProductsSearchAtom);
  const [myComparison, setMyComparison] = useAtom(myComparisonAtom);

  const onItemPress = index => {
    // do nothing
  };

  const onItemBookmarkPress = product => {
    const productId = String(product.item.id);
    // console.log('productId', productId);

    if (
      !productId ||
      (myComparison && myComparison.split(',').includes(productId))
    ) {
      return;
    }

    setMyComparison(async savedData => {
      const awaitSavedData = await savedData;
      if (awaitSavedData) {
        const splittedData = awaitSavedData.split(',');
        splittedData.push(productId);
        return splittedData.join(',');
      }
      return productId;
    });
  };
  // setMyComparison('');
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
          source={
            product.item.site === 'shopee'
              ? require('../img/shopeeLogo.png')
              : require('../img/lazadaLogo.png')
          }
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
          {product.item.name.padEnd(50, '\n')}
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

  // if (isError) {
  //   return <Text>Error</Text>;
  // }
  console.log('isPending', isPending);
  console.log('isFetching', isFetching);

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
              queryClient.resetQueries({
                queryKey: ['products'],
              });
            }}
          />
        </Layout>
      )}
      {isPending && <Loading />}
      {
        <List
          contentContainerStyle={styles.productList}
          data={products}
          numColumns={2}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={1}
          renderItem={renderProductItem}
          ListFooterComponent={renderListFooter}
        />
      }
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
