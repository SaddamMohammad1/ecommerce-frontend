export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    cta?: string;
}

export interface Category {
    id: number;
    name: string;
    image: string;
    productCount?: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount?: number;
    badge?: string;
}

export interface HomeState {
    loading: boolean;
    banners: Banner[];
    categories: Category[];
    featuredProducts: Product[];
    error: string | null;
}
