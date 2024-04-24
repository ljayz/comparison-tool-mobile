import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  Avatar,
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {Divider} from './divider';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {
  comparisonProductsAtom,
  myComparisonAtom,
  myComparisonStorageReaderAtomLoadable,
  myComparisonStorageWriterAtom,
  viewIndexComparisonAtom,
} from '../jotai';

export const Details = () => {
  const styles = useStyleSheet(themedStyles);
  const [{data, isPending, isError, refetch, isRefetching}] = useAtom(
    comparisonProductsAtom,
  );
  const [viewIndexComparison, setViewIndexComparison] = useAtom(
    viewIndexComparisonAtom,
  );
  const [product, setProduct] = React.useState(null);
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

  // React.useEffect(() => {}, [myComparison]);

  React.useEffect(() => {
    if (Array.isArray(data?.data) && data.data.length) {
      setProduct(data.data[viewIndexComparison]);
    }
  }, [data, viewIndexComparison, setProduct]);
  // console.log('data', data);
  // console.log('viewIndexComparison', viewIndexComparison);

  const onViewButtonPress = () => {
    // navigation && navigation.navigate('Payment');
  };

  const onDeleteButtonPress = id => {
    if (myComparisonStorage.state !== 'hasData') {
      return;
    }

    const myComparisonCopy = [...myComparison];
    const indexToRemove = myComparisonCopy.indexOf(id);

    if (indexToRemove > -1) {
      myComparisonCopy.splice(indexToRemove, 1);
      // console.log('myComparisonCopy', myComparisonCopy);
      // console.log('viewIndexComparison', viewIndexComparison);
      if (!myComparisonCopy.length) {
        setViewIndexComparison(0);
        setProduct(null);
      } else if (viewIndexComparison >= myComparisonCopy.length) {
        setViewIndexComparison(viewIndexComparison - 1);
      }
      setMyComparisonStorage('delete', myComparisonCopy, refetch);
    }
  };

  // console.log('myComparisonStorage', myComparisonStorage);
  if (!data || !data.data.length) {
    return (
      <Layout style={styles.containerNoData}>
        <Text appearance="hint">No data to view</Text>
      </Layout>
    );
  }

  if (isPending || isRefetching || !product) {
    return (
      <Layout style={styles.containerNoData}>
        <Text appearance="hint">Loading...</Text>
      </Layout>
    );
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Avatar style={styles.photo} source={{uri: product.image}} />
        </View>
        <Text style={[styles.description, styles.section]} appearance="hint">
          {product.name}
        </Text>
        <Layout
          level="1"
          style={[styles.layoutContainer, styles.setting, styles.section]}>
          <Text appearance="hint" category="s1">
            Site
          </Text>
          <Text category="s1">{product.site}</Text>
        </Layout>
        <Divider />
        <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
          <Text appearance="hint" category="s1">
            Price
          </Text>
          <Text category="s1">{product.price}</Text>
        </Layout>
        <Divider />
        <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
          <Text appearance="hint" category="s1">
            Rating
          </Text>
          <Text category="s1">{Number(product?.rating || 0).toFixed(1)}</Text>
        </Layout>
        <Divider />
        <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
          <Text appearance="hint" category="s1">
            Sold
          </Text>
          <Text category="s1">{product.sold}</Text>
        </Layout>
        <Divider />
        <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
          <Text appearance="hint" category="s1">
            Brand
          </Text>
          <Text category="s1">{product.brand}</Text>
        </Layout>

        <View style={styles.actionContainer}>
          <Button
            style={styles.actionButton}
            size="giant"
            onPress={onViewButtonPress}>
            View
          </Button>
          <Button
            style={styles.actionButton}
            size="giant"
            status="danger"
            onPress={() => onDeleteButtonPress(product.id)}>
            Delete
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
    flex: 1,
  },
  containerNoData: {
    alignItems: 'center',
    backgroundColor: 'background-basic-color-2',
    flex: 1,
    justifyContent: 'center',
  },
  layoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 24,
    backgroundColor: 'background-basic-color-2',
  },
  avatar: {
    alignSelf: 'center',
  },
  photo: {
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 16,
  },
  photoButton: {
    right: 16,
    top: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  description: {
    padding: 24,
    backgroundColor: 'background-basic-color-1',
    textAlign: 'center',
  },
  setting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
