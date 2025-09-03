export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Account {
  id: number;
  accountNumber: string;
  accountName: string;
  clientName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  accountType: 'individual' | 'corporate' | 'startup' | 'trust' | 'partnership';
  balance: number;
  currency: string;
  createdAt: string;
  lastActivity: string;
  assignedAttorney: string;
  billingAddress: BillingAddress;
  notes?: string;
}

export interface AccountListResponse {
  accounts: Account[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AccountSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  accountType?: string;
  assignedAttorney?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AccountCreateRequest {
  accountName: string;
  clientName: string;
  email: string;
  phone: string;
  accountType: string;
  assignedAttorney: string;
  billingAddress: BillingAddress;
  notes?: string;
}

export interface AccountUpdateRequest {
  accountName?: string;
  clientName?: string;
  email?: string;
  phone?: string;
  status?: string;
  accountType?: string;
  assignedAttorney?: string;
  billingAddress?: Partial<BillingAddress>;
  notes?: string;
}
