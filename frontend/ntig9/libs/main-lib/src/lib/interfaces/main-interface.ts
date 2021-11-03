//orders interfaces
export interface Order {
    _id: string;
    orderItems: OrderItems[];
    shippingAddress1: string;
    shippingCity: string;
    shippingZip: string;
    shippingCountry: string;
    shippingPhone: boolean;
    shipmentStatus: boolean;
    paymentStatus: boolean;
    totalPrice: number;
    user: User;
    dateOfOrder: Date;
}

export interface OrderObject {
    data: Order;
}

export interface OrdersObject {
    data: Order[];
}

export interface OrderItems {
    quantity: number;
    product: Product;
}

export interface cartItem {
    productID: string;
    quantity: number;
}

export interface cartItemObject {
    data: cartItem[];
}

//category interfaces
export interface Category {
    _id: string;
    name: string;
    color: string;
    icon: string;
}

export interface CategoryObject {
    data: Category;
}

export interface CategoriesObject {
    data: Category[];
}

//product interfaces
export interface Product {
    _id: string;
    name: string;
    descriptionLite: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    brand: string;
    seller: ProductSeller;
    countInStock: number;
    isFeatured?: boolean;
    haveDiscount?: boolean;
    discount?: number;
    rating?: number;
    tags?: string[];
    created_at?: Date;
    updated_at?: Date;
}

export interface OrderProduct {
    _id: string;
    name: string;
    descriptionLite: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    brand: string;
    seller: ProductSeller;
    countInStock: number;
    isFeatured?: boolean;
    haveDiscount?: boolean;
    discount?: number;
    rating?: number;
    tags?: string[];
    created_at?: Date;
    updated_at?: Date;
    quantity: number;
}

export interface ProductObject {
    data: Product;
}

export interface ProductsObject {
    data: Product[];
}

export interface ProductSeller {
    firstName: string;
}

export interface OrderProductObject {
    data: OrderProduct;
}

//user interfaces

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    token: string;
    isAdmin: boolean;
    isSeller: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserObject {
    data: User;
}

export interface UsersObject {
    data: User[];
}
