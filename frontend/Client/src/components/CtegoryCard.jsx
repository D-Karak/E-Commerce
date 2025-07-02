import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '400px',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    '& .category-image': {
      transform: 'scale(1.1)',
    },
    '& .overlay': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '& .content-wrapper': {
      transform: 'translateY(-20px)',
    },
    '& .description': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '& .arrow-icon': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
}));

const ImageOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  transition: 'background-color 0.3s ease',
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  height: '100%',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: 'white',
  zIndex: 1,
  transition: 'transform 0.3s ease',
});

function CategoryCard({ name, img, description, itemCount }) {
  return (
    <StyledCard>
      <Link 
        to={`/products?category=${name}`} 
        style={{ 
          display: 'block', 
          height: '100%', 
          textDecoration: 'none' 
        }}
      >
        {/* Background Image */}
        <Box
          className="category-image"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        
        {/* Dark Overlay for hover */}
        <ImageOverlay className="overlay" />
        
        {/* Content */}
        <ContentWrapper className="content-wrapper">
          {/* Top Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label="CATEGORY"
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                }}
              />
              {itemCount && (
                <Chip
                  label={`${itemCount} items`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.7rem',
                  }}
                />
              )}
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                mb: 1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {name}
            </Typography>
          </Box>
          
          {/* Bottom Section */}
          <Box>
            {/* Description */}
            <Typography
              className="description"
              variant="body2"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.3s ease',
                mb: 3,
                lineHeight: 1.6,
                maxWidth: '90%',
              }}
            >
              {description}
            </Typography>
            
            {/* Call to Action */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="button"
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                EXPLORE COLLECTION
              </Typography>
              
              <IconButton
                className="arrow-icon"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  transform: 'translateX(-10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        </ContentWrapper>
      </Link>
    </StyledCard>
  );
}

// Alternative Modern Design
function CategoryCardModern({ name, img, description, itemCount }) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '300px', sm: '400px' },
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          '& .image-section': {
            height: '60%',
          },
          '& .content-section': {
            height: '40%',
          },
          '& .explore-text': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Link 
        to={`/products?category=${name}`} 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%', 
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {/* Image Section */}
        <Box
          className="image-section"
          sx={{
            position: 'relative',
            height: '70%',
            overflow: 'hidden',
            transition: 'height 0.3s ease',
          }}
        >
          <Box
            component="img"
            src={img}
            alt={name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {itemCount && (
            <Chip
              label={`${itemCount} items`}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'white',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        
        {/* Content Section */}
        <Box
          className="content-section"
          sx={{
            height: '30%',
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            transition: 'height 0.3s ease',
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              Category
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                color: 'text.primary',
                mb: 1,
              }}
            >
              {name}
            </Typography>
          </Box>
          
          <Typography
            className="explore-text"
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontFamily: 'Montserrat, sans-serif',
              opacity: 0,
              transform: 'translateY(10px)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Explore Collection
            <ArrowForwardIcon fontSize="small" />
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

export default CategoryCard;
// export { CategoryCardModern }; // Export the alternative design if needed