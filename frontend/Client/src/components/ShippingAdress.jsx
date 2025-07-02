import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../context/authContext';
import { addAddress, fetchAddress, deleteAddress } from '../API/Address/AddressApi';

const Address = ({ selectedAddress, setSelectedAddress }) => {
  const { userId, token } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pin: '',
    phone: '',
  });
  
  useEffect(() => {
    fetchAddresses();
  }, [addresses]); // Fixed: prevent infinite loop

  const fetchAddresses = async () => {
    try {
      const response = await fetchAddress(userId, token);
      setAddresses(response.shippingAddresses || []);
    } catch (error) {
      console.log('Error fetching addresses:', error);
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAddress(userId, formData, token);
      alert(response.message)
      setSelectedAddress(response.newAddress);
      await fetchAddresses();
    } catch (error) {
      console.log('Error adding address', error);
    }
    setFormData({ name: '', address: '', city: '', pin: '', phone: '' });
    setOpenModal(false);
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteAddress(userId, addressId, token);
      fetchAddresses();
    } catch (error) {
      console.log('Error deleting address', error);
    }
  };

  return (
    <Box sx={{ p: 3, maxHeight: '38vh', overflow: 'auto' }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          sx={{
            color: 'black',
            borderColor: 'black',
            fontWeight: 'bold',
            '&:hover': { bgcolor: 'black', color: 'white' },
          }}
          onClick={() => setOpenModal(true)}
        >
          + Add Address
        </Button>
      </Box>

      {addresses.length === 0 ? (
        <Typography variant="body2" color="gray">
          No addresses saved yet.
        </Typography>
      ) : (
        <RadioGroup
          name="address-selection"
          value={selectedAddress?._id || ''}
          onChange={(e) => {
            const selected = addresses.find((a) => a._id === e.target.value);
            setSelectedAddress(selected);
          }}
        >
          {[...addresses].reverse().map((address) => (
            <Box
              key={address._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: '#f3f4f6',
              }}
            >
              <FormControlLabel
                value={address._id}
                control={<Radio sx={{ color: 'gray', '&.Mui-checked': { color: '#1976d2' } }} />}
                label={
                  <Box>
                    <Typography fontWeight="bold">{address.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {address.address}, {address.city} - {address.pin}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      📞 {address.phone}
                    </Typography>
                  </Box>
                }
                sx={{ flexGrow: 1, margin: 0 }}
              />
              <IconButton onClick={() => handleDelete(address._id)} aria-label="delete" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </RadioGroup>
      )}

      {/* Modal for adding address */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: '#111827',
            color: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Add New Address
          </Typography>
          <Divider sx={{ bgcolor: '#374151' }} />
          {['name', 'address', 'city', 'pin', 'phone'].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="outlined"
              size="small"
              fullWidth
              required
              value={formData[field]}
              onChange={handleFormChange}
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{
                input: { color: 'white', bgcolor: '#1f2937' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4b5563' },
                  '&:hover fieldset': { borderColor: '#9ca3af' },
                },
              }}
            />
          ))}
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#f3f4f6' },
              mt: 1,
            }}
          >
            Save Address
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Address;
