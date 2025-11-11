export const mockItems = [
    {
        _id: "item-123", productId: { _id: "prod-123", productName: "game", productDescription: "test product", price: 100, image: ["tests/images/games.png"], vendorId: { _id: "abc", storeName: "test" }, promotion: { active: false } },
        quantity: 3,
        cartId: "cart-abc",
    },
    {
        _id: "item-124", productId: { _id: "prod-124", productName: "joy", productDescription: "test product", price: 100, image: ["tests/images/games.png"], vendorId: { _id: "abc", storeName: "test" }, promotion: { active: false } },
        quantity: 2,
        cartId: "cart-abc",
    },
];