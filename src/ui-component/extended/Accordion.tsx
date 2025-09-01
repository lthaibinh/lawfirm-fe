import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';

// assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ==============================|| ACCORDION ||============================== //

interface AccordionItem {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  defaultExpand?: boolean;
  expanded?: boolean;
}

interface AccordionProps {
  data: AccordionItem[];
  defaultExpandedId?: string | number | null;
  expandIcon?: React.ReactNode | false;
  square?: boolean;
  toggle?: boolean;
}

export default function Accordion({ data, defaultExpandedId = null, expandIcon, square, toggle }: AccordionProps) {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => (event, newExpanded) => {
    toggle && setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setExpanded(defaultExpandedId);
  }, [defaultExpandedId]);

  return (
    <Box sx={{ width: '100%' }}>
      {data &&
        data.map((item) => (
          <MuiAccordion
            key={item.id}
            elevation={0}
            defaultExpanded={!item.disabled && item.defaultExpand}
            expanded={(!toggle && !item.disabled && item.expanded) || (toggle && expanded === item.id)}
            disabled={item.disabled}
            square={square}
            onChange={handleChange(item.id)}
          >
            <MuiAccordionSummary
              expandIcon={expandIcon || expandIcon === false ? expandIcon : <ExpandMoreIcon />}
              sx={{ color: 'grey.600', fontWeight: 500 }}
            >
              {item.title}
            </MuiAccordionSummary>
            <MuiAccordionDetails>{item.content}</MuiAccordionDetails>
          </MuiAccordion>
        ))}
    </Box>
  );
}

Accordion.propTypes = {
  data: PropTypes.array,
  defaultExpandedId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.any]),
  expandIcon: PropTypes.node,
  square: PropTypes.bool,
  toggle: PropTypes.bool
};
