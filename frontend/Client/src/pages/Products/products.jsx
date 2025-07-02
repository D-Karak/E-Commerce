import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../../API/Product/ProductApi';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
} from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';
import WeekendIcon from '@mui/icons-material/Weekend';
import TableBarIcon from '@mui/icons-material/TableBar';
import CategoryIcon from '@mui/icons-material/Category';
import ProductCard from '../../components/ProductCard';
import { AuthContext } from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';

const categories = [
  { name: 'All', icon: <CategoryIcon />, key: 'all' },
  { name: 'Sofas', icon: <WeekendIcon />, key: 'Sofa' },
  { name: 'Chairs', icon: <ChairIcon />, key: 'Chair' },
  { name: 'Tables', icon: <TableBarIcon />, key: 'Table' },
];

export default function ProductsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8); // items per page

  const token = useContext(AuthContext).token;

  const [successToast, setSuccessToast] = useState(null);
  const [warningToast, setWarningToast] = useState(null);
  const [errorToast, setErrorToast] = useState(null);
  const fetchProducts = async () => {
    try {
      const categoryFilter = selectedCategory !== 'all' ? selectedCategory : '';
      const response = await getProducts(token, page, limit, categoryFilter);

      setProducts(Array.isArray(response.products) ? response.products : []);
      setPage(response.currentPage)
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setErrorToast("Unable to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory, page]);

  useEffect(() => {
    if (successToast) {
      toast.success(successToast);
      setSuccessToast(null);
    }
    if (warningToast) {
      toast.warn(warningToast);
      setWarningToast(null);
    }
    if (errorToast) {
      toast.error(errorToast);
      setErrorToast(null);
    }
  }, [successToast, warningToast, errorToast]);

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
    setPage(1); // Reset page on category change
  };

  return (
    <Box className="montserrat-font" sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <ToastContainer />

      {/* Sidebar */}
      <Box
        sx={{
          width: 80,
          bgcolor: 'white',
          borderRight: '1px solid gray',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          gap: 2,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        {categories.map((cat) => (
          <Tooltip key={cat.key} title={cat.name} placement="right">
            <IconButton
              onClick={() => handleCategoryChange(cat.key)}
              color={selectedCategory === cat.key ? 'primary' : 'default'}
              size="large"
            >
              {cat.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Products Grid */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {selectedCategory === 'all'
            ? 'All Products'
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              product={product}
              Toast={{ setErrorToast, setSuccessToast, setWarningToast }}
              key={product._id}
            />
          ))}
        </div>

        {/* Pagination */}
        
          {products &&
          <Stack className="text-center w-full justify-center items-center mt-[40px]">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              siblingCount={0}
            />
          </Stack>}
        
      </Box>
    </Box>
  );
}
