'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { Edit, Delete, Visibility, Search, FilterList, Add } from '@mui/icons-material';
import { accountServices } from '../../../../services/accountServices';
import { Account, AccountSearchParams } from '../../../../types/account';

// ==============================|| ACCOUNT LIST PAGE ||============================== //

const AccountListPage = () => {
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [displayedAccounts, setDisplayedAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const params: AccountSearchParams = {
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        accountType: typeFilter || undefined
      };
      
      const response = await accountServices.getAccounts(params);
      setAllAccounts(response.accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply pagination to displayed accounts
  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedAccounts = allAccounts.slice(startIndex, endIndex);
    setDisplayedAccounts(paginatedAccounts);
  }, [allAccounts, page, rowsPerPage]);

  useEffect(() => {
    fetchAccounts();
  }, []); // Call once when component mounts

  useEffect(() => {
    fetchAccounts();
  }, [searchTerm, statusFilter, typeFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page when searching
    fetchAccounts();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
    setPage(0); // Reset to first page when clearing filters
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account Management
      </Typography>
      
      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Search & Filters" />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Search Accounts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, client, or email..."
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearch}>
                      <Search />
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Account Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Account Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="corporate">Corporate</MenuItem>
                  <MenuItem value="startup">Startup</MenuItem>
                  <MenuItem value="trust">Trust</MenuItem>
                  <MenuItem value="partnership">Partnership</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={handleClearFilters}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                href="/admin/account/create"
              >
                Add New Account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Account #</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Assigned Attorney</TableCell>
                <TableCell>Last Activity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography>Loading accounts...</Typography>
                  </TableCell>
                </TableRow>
              ) : displayedAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography>No accounts found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                displayedAccounts.map((account) => (
                  <TableRow key={account.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {account.accountNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {account.accountName}
                      </Typography>
                    </TableCell>
                    <TableCell>{account.clientName}</TableCell>
                    <TableCell>
                      <Chip
                        label={account.status}
                        color={getStatusColor(account.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={account.accountType}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {formatCurrency(account.balance, account.currency)}
                      </Typography>
                    </TableCell>
                    <TableCell>{account.assignedAttorney}</TableCell>
                    <TableCell>{formatDate(account.lastActivity)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Account">
                          <IconButton size="small" color="secondary">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Account">
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={allAccounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AccountListPage;
