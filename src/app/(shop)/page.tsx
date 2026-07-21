"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button, Spinner } from "@/components/ui";
import {
  loadHomeRequest,
  selectBanners,
  selectCategories,
  selectFeaturedProducts,
  selectHomeLoading,
} from "@/store/home";
import type { Banner, Product } from "@/store/home/home.types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function HeroBanner() {
  const banners = useAppSelector(selectBanners);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + banners.length) % banners.length,
    );
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
      <div className="relative aspect-[21/9] min-h-[220px] w-full sm:min-h-[320px]">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          priority
          className="object-cover opacity-70"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />

        <div className="absolute inset-0 flex items-center px-6 sm:px-12">
          <div className="max-w-xl text-white">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-300">
              DayDreamer Deals
            </p>
            <h2 className="text-3xl font-bold sm:text-5xl">
              {banner.title}
            </h2>
            <p className="mt-3 text-base text-slate-200 sm:text-lg">
              {banner.subtitle}
            </p>
            <Button className="mt-6" size="lg">
              {banner.cta ?? "Shop Now"}
            </Button>
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 shadow transition hover:bg-white"
              aria-label="Previous banner"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 shadow transition hover:bg-white"
              aria-label="Next banner"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {banners.map((item: Banner, index: number) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/50"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function CategoryGrid() {
  const categories = useAppSelector(selectCategories);

  if (categories.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Shop by Category
          </h2>
          <p className="mt-1 text-slate-600">
            Browse our most popular collections
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 200px"
              />
            </div>
            <div className="p-3">
              <p className="font-semibold text-slate-900">
                {category.name}
              </p>
              {category.productCount != null && (
                <p className="text-sm text-slate-500">
                  {category.productCount} products
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const discount =
    product.originalPrice != null
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100,
        )
      : null;

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 300px"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}

        {discount != null && discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold text-slate-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium text-slate-700">
            {product.rating}
          </span>
          {product.reviewCount != null && (
            <span className="text-sm text-slate-400">
              ({product.reviewCount})
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice != null && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <Button
          fullWidth
          className="mt-4"
          variant="outline"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}

function FeaturedProducts() {
  const products = useAppSelector(selectFeaturedProducts);

  if (products.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Featured Products
          </h2>
          <p className="mt-1 text-slate-600">
            Hand-picked deals just for you
          </p>
        </div>
        <Button variant="outline">View All</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

function PromoStrip() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white sm:px-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Join DayDreamer Rewards
          </h2>
          <p className="mt-1 text-blue-100">
            Earn points on every purchase and unlock exclusive member deals.
          </p>
        </div>
        <Button
          variant="secondary"
          size="lg"
          className="shrink-0 bg-white text-blue-700 hover:bg-blue-50"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectHomeLoading);

  useEffect(() => {
    dispatch(loadHomeRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:py-10">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoStrip />
    </div>
  );
}
