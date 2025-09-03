import { Account, AccountListResponse, AccountSearchParams, AccountCreateRequest, AccountUpdateRequest } from '../types/account';
import { axiosInstance } from '../utils/axios';

const ACCOUNT_API_BASE = '/accounts';

export const accountServices = {
  // Get all accounts with search and filtering (no pagination)
  getAccounts: async (params: AccountSearchParams = {}): Promise<AccountListResponse> => {
    // Transform parameters to JSON Server format
    const jsonServerParams: any = {};
    
    // Search: use JSON Server's q parameter for text search
    if (params.search) {
      jsonServerParams.q = params.search;
    }
    
    // Filtering: JSON Server supports direct field filtering
    if (params.status) {
      jsonServerParams.status = params.status;
    }
    
    if (params.accountType) {
      jsonServerParams.accountType = params.accountType;
    }
    
    if (params.assignedAttorney) {
      jsonServerParams.assignedAttorney = params.assignedAttorney;
    }
    
    // Sorting: convert to JSON Server format
    if (params.sortBy) {
      jsonServerParams._sort = params.sortBy;
      jsonServerParams._order = params.sortOrder || 'asc';
    }

    const response = await axiosInstance.get(ACCOUNT_API_BASE, { params: jsonServerParams });
    const accounts = response.data;
    
    // Return all accounts with pagination info (client-side pagination)
    return {
      accounts,
      total: accounts.length,
      page: 1,
      limit: accounts.length,
      totalPages: 1
    };
  },

  // Get account by ID
  getAccountById: async (id: number): Promise<Account> => {
    const response = await axiosInstance.get(`${ACCOUNT_API_BASE}/${id}`);
    return response.data;
  },

  // Create new account
  createAccount: async (accountData: AccountCreateRequest): Promise<Account> => {
    const response = await axiosInstance.post(ACCOUNT_API_BASE, accountData);
    return response.data;
  },

  // Update existing account
  updateAccount: async (id: number, accountData: AccountUpdateRequest): Promise<Account> => {
    const response = await axiosInstance.put(`${ACCOUNT_API_BASE}/${id}`, accountData);
    return response.data;
  },

  // Delete account
  deleteAccount: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ACCOUNT_API_BASE}/${id}`);
  },

  // Search accounts using JSON Server's q parameter (no pagination)
  searchAccounts: async (searchTerm: string, params: Omit<AccountSearchParams, 'search'> = {}): Promise<AccountListResponse> => {
    const jsonServerParams: any = { q: searchTerm };
    
    // Add other parameters
    if (params.status) {
      jsonServerParams.status = params.status;
    }
    
    if (params.accountType) {
      jsonServerParams.accountType = params.accountType;
    }
    
    if (params.assignedAttorney) {
      jsonServerParams.assignedAttorney = params.assignedAttorney;
    }
    
    if (params.sortBy) {
      jsonServerParams._sort = params.sortBy;
      jsonServerParams._order = params.sortOrder || 'asc';
    }

    const response = await axiosInstance.get(ACCOUNT_API_BASE, { params: jsonServerParams });
    const accounts = response.data;
    
    return {
      accounts,
      total: accounts.length,
      page: 1,
      limit: accounts.length,
      totalPages: 1
    };
  },

  // Get accounts by status (no pagination)
  getAccountsByStatus: async (status: string, params: Omit<AccountSearchParams, 'status'> = {}): Promise<AccountListResponse> => {
    const jsonServerParams: any = { status };
    
    if (params.sortBy) {
      jsonServerParams._sort = params.sortBy;
      jsonServerParams._order = params.sortOrder || 'asc';
    }

    const response = await axiosInstance.get(ACCOUNT_API_BASE, { params: jsonServerParams });
    const accounts = response.data;
    
    return {
      accounts,
      total: accounts.length,
      page: 1,
      limit: accounts.length,
      totalPages: 1
    };
  },

  // Get accounts by type (no pagination)
  getAccountsByType: async (accountType: string, params: Omit<AccountSearchParams, 'accountType'> = {}): Promise<AccountListResponse> => {
    const jsonServerParams: any = { accountType };
    
    if (params.sortBy) {
      jsonServerParams._sort = params.sortBy;
      jsonServerParams._order = params.sortOrder || 'asc';
    }

    const response = await axiosInstance.get(ACCOUNT_API_BASE, { params: jsonServerParams });
    const accounts = response.data;
    
    return {
      accounts,
      total: accounts.length,
      page: 1,
      limit: accounts.length,
      totalPages: 1
    };
  },

  // Get accounts by assigned attorney (no pagination)
  getAccountsByAttorney: async (attorney: string, params: Omit<AccountSearchParams, 'assignedAttorney'> = {}): Promise<AccountListResponse> => {
    const jsonServerParams: any = { assignedAttorney: attorney };
    
    if (params.sortBy) {
      jsonServerParams._sort = params.sortBy;
      jsonServerParams._order = params.sortOrder || 'asc';
    }

    const response = await axiosInstance.get(ACCOUNT_API_BASE, { params: jsonServerParams });
    const accounts = response.data;
    
    return {
      accounts,
      total: accounts.length,
      page: 1,
      limit: accounts.length,
      totalPages: 1
    };
  }
};
