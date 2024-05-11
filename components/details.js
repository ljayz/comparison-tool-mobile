import React from 'react';
import {Image, Linking, ScrollView, View} from 'react-native';
import {
  Avatar,
  Button,
  Layout,
  StyleService,
  Text,
  ViewPager,
  useStyleSheet,
} from '@ui-kitten/components';
import {Divider} from './divider';
import {useAtom, useAtomValue} from 'jotai';

import {
  loadMyComparisonProductsAtom,
  myComparisonEffectAtom,
  myComparisonProductAtom,
  viewPagerIndexComparisonAtom,
} from '../jotai';
import {Loading} from './loading';

export const Details = () => {
  useAtom(myComparisonEffectAtom);
  const styles = useStyleSheet(themedStyles);

  const product = useAtomValue(myComparisonProductAtom);
  const [{data, isPending, isError}] = useAtom(loadMyComparisonProductsAtom);
  const [selectedIndex, setSelectedIndex] = useAtom(
    viewPagerIndexComparisonAtom,
  );

  const onViewButtonPress = link => {
    if (link) {
      console.log('openURL', link);
      // Linking.openURL(link);
    }
  };

  if (isPending) {
    return <Loading />;
  }

  // console.log('data', data);
  if (!data || !data?.data?.length || !product) {
    return (
      <Layout style={styles.containerNoData}>
        <Text appearance="hint">No data to view</Text>
      </Layout>
    );
  }

  // if (isError) {
  //   return <Text>Error</Text>;
  // }

  return (
    <ViewPager
      style={styles.container}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Layout
        style={[
          styles.container,
          product.site === 'shopee'
            ? styles.shopeeBackground
            : styles.lazadaBackground,
        ]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.itemHeaderSite}>
            <Image
              style={styles.siteLogo}
              source={
                product.site === 'shopee'
                  ? require('../img/shopeeLogo.png')
                  : require('../img/lazadaLogo.png')
              }
            />
            <Text category="s1">
              {product.site === 'shopee' ? 'Shopee' : 'Lazada'}
            </Text>
          </View>
          <Layout
            style={[
              styles.description,
              styles.section,
              {padding: 0, marginTop: 0},
            ]}>
            <Avatar style={styles.photo} source={{uri: product.image}} />
          </Layout>
          <Layout style={[styles.description, styles.section]}>
            <Text style={{textAlign: 'center'}}>{product.name}</Text>
          </Layout>

          <Layout
            level="1"
            style={[
              styles.layoutContainer,
              styles.setting,
              styles.section,
              styles.borderTopRadius,
            ]}>
            <Text appearance="hint" category="s1">
              Price
            </Text>
            <Text category="s1">₱ {product.price}</Text>
          </Layout>
          <Divider styles={styles.divider} />
          <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
            <Text appearance="hint" category="s1">
              Rating
            </Text>
            <Text category="s1">{Number(product?.rating || 0).toFixed(1)}</Text>
          </Layout>
          <Divider styles={styles.divider} />
          <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
            <Text appearance="hint" category="s1">
              Sold
            </Text>
            <Text category="s1">{product.sold}</Text>
          </Layout>
          <Divider styles={styles.divider} />
          <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
            <Text appearance="hint" category="s1">
              Review
            </Text>
            <Text category="s1">{product.review}</Text>
          </Layout>
          <Divider styles={styles.divider} />
          <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
            <Text appearance="hint" category="s1">
              Stock
            </Text>
            <Text category="s1">
              {product.stock ? 'In stock' : 'Out of stock'}
            </Text>
          </Layout>
          <Divider styles={styles.divider} />
          <Layout
            level="1"
            style={[
              styles.layoutContainer,
              styles.setting,
              styles.borderBottomRadius,
            ]}>
            <Text appearance="hint" category="s1">
              Brand
            </Text>
            <Text category="s1">
              {product.brand ? product.brand : 'No Brand'}
            </Text>
          </Layout>
          <View style={styles.actionContainer}>
            <Button
              appearance="ghost"
              style={styles.actionButton}
              status="control"
              onPress={() => onViewButtonPress(product.url)}>
              View Product
            </Button>
          </View>
        </ScrollView>
      </Layout>

      {product.c_id ? (
        <Layout
          style={[
            styles.container,
            product.c_site === 'shopee'
              ? styles.shopeeBackground
              : styles.lazadaBackground,
          ]}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.itemHeaderSite}>
              <Image
                style={styles.siteLogo}
                source={
                  product.c_site === 'shopee'
                    ? require('../img/shopeeLogo.png')
                    : require('../img/lazadaLogo.png')
                }
              />
              <Text category="s1">
                {product.c_site === 'shopee' ? 'Shopee' : 'Lazada'}
              </Text>
            </View>
            <Layout
              style={[
                styles.description,
                styles.section,
                {padding: 0, marginTop: 0},
              ]}>
              <Avatar style={styles.photo} source={{uri: product.c_image}} />
            </Layout>
            <Layout style={[styles.description, styles.section]}>
              <Text style={{textAlign: 'center'}}>{product.c_name}</Text>
            </Layout>

            <Layout
              level="1"
              style={[
                styles.layoutContainer,
                styles.setting,
                styles.section,
                styles.borderTopRadius,
              ]}>
              <Text appearance="hint" category="s1">
                Price
              </Text>
              <Text category="s1">₱ {product.c_price}</Text>
            </Layout>
            <Divider styles={styles.divider} />
            <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
              <Text appearance="hint" category="s1">
                Rating
              </Text>
              <Text category="s1">
                {Number(product?.rating || 0).toFixed(1)}
              </Text>
            </Layout>
            <Divider styles={styles.divider} />
            <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
              <Text appearance="hint" category="s1">
                Sold
              </Text>
              <Text category="s1">{product.c_sold}</Text>
            </Layout>
            <Divider styles={styles.divider} />
            <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
              <Text appearance="hint" category="s1">
                Review
              </Text>
              <Text category="s1">{product.c_review}</Text>
            </Layout>
            <Divider styles={styles.divider} />
            <Layout level="1" style={[styles.layoutContainer, styles.setting]}>
              <Text appearance="hint" category="s1">
                Stock
              </Text>
              <Text category="s1">
                {product.c_stock ? 'In stock' : 'Out of stock'}
              </Text>
            </Layout>
            <Divider styles={styles.divider} />
            <Layout
              level="1"
              style={[
                styles.layoutContainer,
                styles.setting,
                styles.borderBottomRadius,
              ]}>
              <Text appearance="hint" category="s1">
                Brand
              </Text>
              <Text category="s1">
                {product.c_brand ? product.c_brand : 'No Brand'}
              </Text>
            </Layout>

            <View style={styles.actionContainer}>
              <Button
                appearance="ghost"
                style={styles.actionButton}
                status="control"
                onPress={() => onViewButtonPress(product.c_url)}>
                View Product
              </Button>
            </View>
          </ScrollView>
        </Layout>
      ) : (
        <Layout
          style={[
            styles.contentContainer,
            {flex: 1},
            product.site !== 'shopee'
              ? styles.shopeeBackground
              : styles.lazadaBackground,
          ]}>
          <View style={[styles.itemHeaderSite, {flex: 1}]}>
            <Image
              style={styles.siteLogo}
              source={
                product.site !== 'shopee'
                  ? require('../img/shopeeLogo.png')
                  : require('../img/lazadaLogo.png')
              }
            />
            <Text category="s1">
              {product.site !== 'shopee' ? 'Shopee' : 'Lazada'}
            </Text>
          </View>
          <Layout
            style={[
              styles.layoutContainer,
              styles.containerNoProductsToCompare,
            ]}>
            <Text style={styles.noProductsToCompareText}>
              No product to compare
            </Text>
          </Layout>
        </Layout>
      )}
    </ViewPager>
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
  containerNoProductsToCompare: {
    flex: 25,
    alignContent: 'center',
    borderRadius: 10,
  },
  borderRadius: {
    borderRadius: 10,
  },
  borderBottomRadius: {
    borderBottomLeftRadius: 10,
    borderBottomRadius: 10,
  },
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  layoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
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
  avatar: {
    alignSelf: 'center',
  },
  photo: {
    width: '100%',
    height: 320,
    borderRadius: 10,
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
    borderRadius: 10,
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
    color: 'color-basic-100',
    backgroundColor: 'background-basic-color-2',
    borderRadius: 10,
  },
  divider: {
    backgroundColor: 'color-basic-100',
  },
  lazadaBackground: {
    backgroundColor: 'color-info-600',
  },
  shopeeBackground: {
    backgroundColor: 'color-orange-600',
  },
  noProductsToCompareText: {
    flex: 1,
    textAlign: 'center',
  },
});
