import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductsItem from '../productsItem/productItem';
import { useCart } from '@/app/hooks/useCart';
import { getSlideCount } from '@/app/utils/functions';
import { IconBtnNavigate } from '@/app/utils/commonStyles';
import { Container, Text, IconNext, IconPrev } from './relatedProducts.styled';
import 'swiper/css';

export default function RelatedProducts({ relatedProducts, windowWidth }) {
  const [prevBtn, setPervBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(true);
  const { data, isLoading } = relatedProducts;
  const { cart } = useCart();
  const sliderRef = useRef();
  const slidesPerView = getSlideCount(windowWidth);

  const handlePrevCard = () => {
    if (sliderRef.current?.activeIndex - 1 === 0) {
      setPervBtn(false);
    }
    if (sliderRef.current?.activeIndex === data.length - slidesPerView) {
      setNextBtn(true);
    }
    sliderRef.current?.slidePrev();
  };

  const handleNextCard = () => {
    if (sliderRef.current?.activeIndex + 1 > 0) {
      setPervBtn(true);
    }
    if (sliderRef.current?.activeIndex + 1 === data.length - slidesPerView) {
      setNextBtn(false);
    }
    sliderRef.current?.slideNext();
  };

  const handleSlideChange = swiperCore => {
    const { activeIndex } = swiperCore;
    const length = data.length - slidesPerView;
    if (activeIndex === 0) {
      setPervBtn(false);
    }
    if (activeIndex > 0) {
      setPervBtn(true);
    }
    if (activeIndex === length) {
      setNextBtn(false);
    }
    if (activeIndex < length) {
      setNextBtn(true);
    }
  };

  return (
    <Container>
      <Text component="h5">You may also be interested</Text>
      {!isLoading && (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={16}
          wrapperTag="ul"
          onSwiper={it => (sliderRef.current = it)}
          style={{
            height: '100%',
            padding: '16px',
          }}
          onSlideChange={handleSlideChange}
        >
          {prevBtn && (
            <IconBtnNavigate prev={0} onClick={handlePrevCard}>
              <IconPrev />
            </IconBtnNavigate>
          )}

          {data &&
            data.map(product => {
              const { id } = product;
              return (
                <SwiperSlide key={id} tag="li" style={{ width: 'auto' }}>
                  <ProductsItem product={product} cart={cart} />
                </SwiperSlide>
              );
            })}

          {nextBtn && (
            <IconBtnNavigate next={0} onClick={handleNextCard}>
              <IconNext />
            </IconBtnNavigate>
          )}
        </Swiper>
      )}
    </Container>
  );
}
