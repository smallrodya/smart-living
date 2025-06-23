const fetchProducts = async () => {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    const filteredProducts = data.products.filter((product: Product) => {
      return product.isSummerCollection === true;
    });
    setProducts(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoading(false);
  }
}; 