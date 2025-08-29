// third party
import { merge } from 'lodash-es';

// project imports
import Chip from './Chip';
import { Theme } from '@mui/material/styles';

// ===============================||  OVERRIDES - MAIN  ||=============================== //

export default function ComponentsOverrides(theme: Theme) {
  return merge(Chip(theme));
}
