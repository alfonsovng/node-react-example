import React from 'react';
import InputForm from './InputForm';

const ProductEdit = ({ product, updateProduct }) => {

  return (
    <div>
      <h2>Edit Product</h2>
      <InputForm key={product.id} initialData={product} updateProduct={updateProduct} />
    </div>
  );
};

export default ProductEdit;