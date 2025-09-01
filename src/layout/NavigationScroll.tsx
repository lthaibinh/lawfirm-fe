import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

interface NavigationScrollProps {
  children: React.ReactNode;
}

export default function NavigationScroll({ children }: NavigationScrollProps) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
}

NavigationScroll.propTypes = { children: PropTypes.oneOfType([PropTypes.any, PropTypes.node]) };
