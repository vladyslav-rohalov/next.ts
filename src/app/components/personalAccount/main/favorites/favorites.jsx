'use client';
import { useEffect } from 'react';
import PageTitle from '@/app/components/pageTitle/pageTitle';
import ProductsList from '@/app/components/products/productsList/productsList';
import { useGetFavoriteProductsQuery } from '@/app/redux/services/products';
import { useCart } from '@/app/hooks/useCart';
import { useAuth } from '@/app/hooks/useAuth';
import { useFavorite } from '@/app/hooks/useFavorite';
import withAuth from '@/app/components/auth/withAuth';

function AccountFavorites() {
  const { token } = useAuth();
  const { favoriteIds } = useFavorite();
  const { data = [], isLoading, refetch } = useGetFavoriteProductsQuery(token);
  const { cart } = useCart();

  useEffect(() => {
    refetch();
  }, [favoriteIds]);

  return (
    <>
      <PageTitle title="Favorite products" />
      <ProductsList
        products={data}
        isLoading={isLoading}
        cart={cart}
        skeleton={12}
        isFP={true}
      />
    </>
  );
}

AccountFavorites.displayName = 'AccountFavorites';
export const AccountFavoritesWithAuth = withAuth(AccountFavorites);
