import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/ai/products');
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    return 'Just now';
  };

  const filteredProducts = products.filter(product => {
    if (filter !== 'all' && product.gender?.toLowerCase() !== filter) return false;
    if (searchTerm && !product.gender?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: products.length,
    completed: products.filter(p => p.status === 'Completed').length,
    processing: products.filter(p => p.status === 'Processing').length,
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>
      <div style={styles.bgCircle3}></div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeIcon}>🛍️</span>
            <span style={styles.heroBadgeText}>Your Collection</span>
          </div>
          <h1 style={styles.heroTitle}>
            Your <span style={styles.heroHighlight}>Fashion Products</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Browse and manage all your AI-generated fashion creations
          </p>
        </div>
        <Link to="/generate" style={styles.newBtn}>
          <span>✨</span> New Generation
        </Link>
      </div>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📦</span>
          <div>
            <div style={styles.statValue}>{stats.total}</div>
            <div style={styles.statLabel}>Total Products</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>✅</span>
          <div>
            <div style={styles.statValue}>{stats.completed}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>⏳</span>
          <div>
            <div style={styles.statValue}>{stats.processing}</div>
            <div style={styles.statLabel}>Processing</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filtersContainer}>
        <div style={styles.filterButtons}>
          <button
            onClick={() => setFilter('all')}
            style={{
              ...styles.filterBtn,
              ...(filter === 'all' ? styles.filterBtnActive : styles.filterBtnInactive)
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('female')}
            style={{
              ...styles.filterBtn,
              ...(filter === 'female' ? styles.filterBtnActive : styles.filterBtnInactive)
            }}
          >
            👩 Female
          </button>
          <button
            onClick={() => setFilter('male')}
            style={{
              ...styles.filterBtn,
              ...(filter === 'male' ? styles.filterBtnActive : styles.filterBtnInactive)
            }}
          >
            👨 Male
          </button>
          <button
            onClick={() => setFilter('kids')}
            style={{
              ...styles.filterBtn,
              ...(filter === 'kids' ? styles.filterBtnActive : styles.filterBtnInactive)
            }}
          >
            🧒 Kids
          </button>
        </div>
        
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>🎨</div>
          <h3 style={styles.emptyTitle}>No products found</h3>
          <p style={styles.emptyText}>
            {searchTerm || filter !== 'all' 
              ? "Try changing your filters" 
              : "Start by generating your first AI fashion model"}
          </p>
          {!searchTerm && filter === 'all' && (
            <Link to="/generate" style={styles.emptyButton}>
              Generate Now →
            </Link>
          )}
        </div>
      ) : (
        <>
          <div style={styles.productsGrid}>
            {filteredProducts.map((product, index) => (
              <div key={product._id} style={styles.productCard}>
                <div style={styles.productImageWrapper}>
                  {product.generatedPoses?.[0]?.image ? (
                    <img 
                      src={product.generatedPoses[0].image} 
                      alt={product.gender}
                      style={styles.productImage}
                    />
                  ) : (
                    <div style={styles.productImagePlaceholder}>
                      <span>🖼️</span>
                    </div>
                  )}
                  <div style={styles.productStatus}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(product.status === 'Completed' ? styles.statusCompleted : styles.statusProcessing)
                    }}>
                      {product.status === 'Completed' ? '✓ Completed' : '⏳ Processing'}
                    </span>
                  </div>
                </div>
                
                <div style={styles.productInfo}>
                  <div style={styles.productHeader}>
                    <h3 style={styles.productTitle}>
                      {product.gender} Collection
                    </h3>
                    <span style={styles.productDate}>{getTimeAgo(product.createdAt)}</span>
                  </div>
                  
                  <div style={styles.productDetails}>
                    <div style={styles.productDetail}>
                      <span>🎨</span>
                      <span>{product.backgroundType}</span>
                    </div>
                    <div style={styles.productDetail}>
                      <span>📸</span>
                      <span>{product.generatedPoses?.length || 0} images</span>
                    </div>
                    <div style={styles.productDetail}>
                      <span>🔢</span>
                      <span>Seed: {product.aiModelSeed}</span>
                    </div>
                  </div>
                  
                  <Link to={`/product/${product._id}`} style={styles.viewBtn}>
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {filteredProducts.length > 9 && (
            <div style={styles.pagination}>
              <button style={styles.pageBtn}>←</button>
              <button style={{...styles.pageBtn, ...styles.pageActive}}>1</button>
              <button style={styles.pageBtn}>2</button>
              <button style={styles.pageBtn}>3</button>
              <button style={styles.pageBtn}>→</button>
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(20px); }
          50% { transform: translateY(0px) translateX(40px); }
          75% { transform: translateY(20px) translateX(20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(-20px); }
          66% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    position: 'relative',
    overflowX: 'hidden',
    padding: '20px',
  },
  
  bgCircle1: {
    position: 'fixed',
    width: '400px',
    height: '400px',
    background: 'linear-gradient(135deg, #667eea20, #764ba220)',
    borderRadius: '50%',
    top: '-100px',
    right: '-100px',
    opacity: 0.5,
    filter: 'blur(80px)',
    animation: 'float 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  
  bgCircle2: {
    position: 'fixed',
    width: '500px',
    height: '500px',
    background: 'linear-gradient(135deg, #f093fb20, #f5576c20)',
    borderRadius: '50%',
    bottom: '-150px',
    left: '-100px',
    opacity: 0.5,
    filter: 'blur(100px)',
    animation: 'floatSlow 12s ease-in-out infinite',
    pointerEvents: 'none',
  },
  
  bgCircle3: {
    position: 'fixed',
    width: '300px',
    height: '300px',
    background: 'linear-gradient(135deg, #4facfe20, #00f2fe20)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.3,
    filter: 'blur(60px)',
    animation: 'pulse 4s ease-in-out infinite',
    pointerEvents: 'none',
  },
  
  heroSection: {
    maxWidth: '1200px',
    margin: '0 auto 40px auto',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '24px',
    padding: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    boxShadow: '0 20px 40px -10px rgba(102, 126, 234, 0.3)',
  },
  
  heroContent: { flex: 1 },
  
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 16px',
    borderRadius: '50px',
    marginBottom: '16px',
  },
  
  heroBadgeIcon: { fontSize: '16px' },
  heroBadgeText: { color: 'white', fontSize: '14px', fontWeight: '500' },
  
  heroTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '12px',
  },
  
  heroHighlight: {
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  
  heroSubtitle: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.9)',
  },
  
  newBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'white',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  
  statCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
  
  statIcon: { fontSize: '32px' },
  statValue: { fontSize: '28px', fontWeight: 'bold', color: '#1f2937' },
  statLabel: { fontSize: '12px', color: '#6b7280' },
  
  filtersContainer: {
    maxWidth: '1200px',
    margin: '0 auto 30px auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  
  filterButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  
  filterBtn: {
    padding: '10px 20px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
  },
  
  filterBtnActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
  },
  
  filterBtnInactive: {
    background: 'white',
    color: '#4b5563',
  },
  
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  
  searchIcon: {
    position: 'absolute',
    left: '12px',
    fontSize: '16px',
  },
  
  searchInput: {
    padding: '10px 16px 10px 36px',
    border: '1px solid #e5e7eb',
    borderRadius: '50px',
    fontSize: '14px',
    width: '250px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  
  loadingContainer: {
    textAlign: 'center',
    padding: '80px',
  },
  
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e5e7eb',
    borderTopColor: '#667eea',
    borderRadius: '50%',
    margin: '0 auto 16px',
    animation: 'spin 1s linear infinite',
  },
  
  loadingText: { color: '#6b7280' },
  
  emptyContainer: {
    textAlign: 'center',
    padding: '80px',
    background: 'white',
    borderRadius: '24px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  
  emptyIcon: { fontSize: '64px', marginBottom: '16px' },
  emptyTitle: { fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' },
  emptyText: { color: '#6b7280', marginBottom: '24px' },
  
  emptyButton: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
  },
  
  productsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
  },
  
  productCard: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
  
  productImageWrapper: {
    position: 'relative',
    height: '240px',
    overflow: 'hidden',
  },
  
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #667eea20, #764ba220)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  },
  
  productStatus: {
    position: 'absolute',
    top: '12px',
    right: '12px',
  },
  
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: '500',
  },
  
  statusCompleted: {
    background: '#d1fae5',
    color: '#065f46',
  },
  
  statusProcessing: {
    background: '#fed7aa',
    color: '#92400e',
  },
  
  productInfo: {
    padding: '20px',
  },
  
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  
  productTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  
  productDate: {
    fontSize: '12px',
    color: '#6b7280',
  },
  
  productDetails: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  
  productDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#6b7280',
  },
  
  viewBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '40px',
  },
  
  pageBtn: {
    padding: '8px 16px',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  pageActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
  },
};

// Add hover styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .new-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
  .filter-btn:hover { transform: translateY(-2px); }
  .search-input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.1); }
  .product-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
  .product-card:hover .product-image { transform: scale(1.05); }
  .view-btn:hover { transform: translateX(5px); }
  .page-btn:hover { background: #f3f4f6; }
  .empty-button:hover { transform: translateY(-2px); }
  @media (max-width: 768px) {
    .hero-title { font-size: 28px; }
    .products-grid { grid-template-columns: 1fr; }
    .filters-container { flex-direction: column; align-items: stretch; }
    .search-input { width: 100%; }
  }
`;
document.head.appendChild(styleSheet);

export default Products;