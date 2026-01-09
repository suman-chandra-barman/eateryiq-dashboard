export interface MarketingManager {
  id: number;
  sl: number;
  invoice_id: string | null;
  user_name: string;
  email: string;
  plan: string;
}

export interface MarketingManagerDetails {
  id: number;
  invoice_id: string | null;
  user_name: string;
  email: string;
  user_role: string;
  plan: string;
  joining_date: string;
}

export interface MarketingManagersResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: MarketingManager[];
  requestId: string;
}

export interface MarketingManagerDetailsResponse {
  success: boolean;
  message: string;
  meta: Record<string, never>;
  data: MarketingManagerDetails;
  requestId: string;
}
