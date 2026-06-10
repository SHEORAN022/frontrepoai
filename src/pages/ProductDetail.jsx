import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/ai/product/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      toast.error('Failed to fetch product details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Product not found</p>
        <Link to="/products" className="btn-primary inline-block mt-4">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/products" className="text-indigo-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Product Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p><strong>Gender:</strong> {product.gender}</p>
            <p><strong>Background:</strong> {product.backgroundType}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                product.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {product.status}
              </span>
            </p>
            <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleString()}</p>
            <p><strong>Seed:</strong> {product.aiModelSeed}</p>
          </div>
        </div>

        {product.originalImages && product.originalImages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Original Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.originalImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Original ${idx + 1}`} className="rounded-lg shadow-md" />
              ))}
            </div>
          </div>
        )}

        {product.generatedPoses && product.generatedPoses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Generated Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.generatedPoses.map((pose, idx) => (
                <div key={idx} className="text-center">
                  <img src={pose.image} alt={pose.pose} className="rounded-lg shadow-lg mb-2 w-full" />
                  <p className="font-medium">{pose.pose}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;