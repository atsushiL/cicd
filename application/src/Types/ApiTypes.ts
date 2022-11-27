export type ApiType = {
  count: number,
  next: string,
  previous: string,
  results: ReviewCompanyApiType[]
  | InterviewItemApiType[]
  | PromotionMethodApiType[]
  | PromotionDetailApiType[]
  | ProspectiveCustomerApiType[]
  | ApplyCustomerFamilyValue[]
  | ApplyCustomerListValue[]
  | ReferralCompanyApiType[]
  | ApplyCustomerNegotiationValue[]
  | UserListValue[]
  | ApplyCustomerInterviewValue[]
  | PropertyListApiType[]
  | EvaluationStandardApiType[]
}

export type filterDataType = ReviewCompanyApiType
  | InterviewItemApiType
  | PromotionMethodApiType
  | PromotionDetailApiType
  | ProspectiveCustomerApiType
  | ApplyCustomerFamilyValue
  | ApplyCustomerListValue
  | ApplyCustomerNegotiationValue
  | ReferralCompanyApiType
  | UserListValue
  | ApplyCustomerInterviewValue
  | PropertyListApiType
  | EvaluationStandardApiType


export type UserListValue = {
  id: string,
  role: string;
  username: string;
  name: string;
  email: string;
  verified: boolean;
  is_active: boolean;
};

export type InterviewItemApiType = {
  id: string;
  item: string;
  memo: string;
  created_at: string;
  created_by: string;
};

export type ReviewCompanyApiType = {
  id: string;
  name: string;
  phone_no: string;
  memo: string;
  person_in_charge: string;
  created_at: string;
};

export type ReferralCompanyApiType = {
  id: string;
  created_at: string;
  name: string;
  phone_no: string;
  person_in_charge: string;
  introduction_count: number;
};

export type PropertyListApiType = {
  id: string;
  application_date: string;
  provisional_customers_name: string;
  status: string;
  evaluation_result: string;
  // postal_code: string;
  // address: string;
};

export type PromotionMethodApiType = {
  id: string;
  method: string;
  created_at: string;
  created_by: string;
};

export type PromotionDetailApiType = {
  id: string;
  result: string;
  created_at: string;
  created_by: string;
};

export type EvaluationStandardApiType = {
  id: string;
  standard: string;
  standard_content: string;
  created_at: string;
  created_by: string;
  memo: string;
};

export type ProspectiveCustomerApiType = {
  id: string;
  customer_name: string;
  customer_kana: string;
  prefecture: string;
  created_at: string;
  created_by: string;
  updated_at: string;
};

export type ProspectiveCustomerDetailApiType = {
  id: string;
  cellphone_no: string;
  customer_birthday: string;
  customer_kana: string;
  customer_name: string;
  email: string;
  memo: string;
  prefecture: string;
};
export type SystemUserValue = {
  id: string;
  username: number;
  name: string;
  email: string;
  role: number;
  is_active: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
};

export type ApplyCustomerDetailValue = {
  customer_data: {
    id: string;
    kana: string;
    name: string;
    age: number;
    birthday: string;
    sex: number;
    email: string;
    memo: string;
    cellphone_no: string;
    phone_no: string;
    created_at: string;
    customer: string;
  };
  address: {
    id: number,
    prefecture: string,
    municipalities: string,
    house_no: string,
    post_no: string,
    other: string,
  },
  provisional_customer_data: {
    id: string,
    application_date: string,
    status: string,
    property: string,
    approval: boolean | string,
    reason_for_refusal: string,
  }
}

export type ApplyCustomerJobDetailValue = {
  id: string;
  kana: string;
  name: string;
  phone_no: string;
  industry: string;
  occupation: string;
  annual_income: number;
};

export type ApplyCustomerBankDetailValue = {
  id: string;
  number: string;
  holder: string;
  account_type: string;
  bank: string;
  branch: string;
};

export type ApplyCustomerFamilyValue = {
  id: string;
  relationship: string;
  name: string;
  age: number;
  job: string;
  household_management: string | boolean;
  consensus: string | boolean;
};

export type ApplyCustomerLoanValue = {
  id: string;
  remaining_housing_loan_debt: number;
  monthly_repayment: number;
  bonus_month_repayment: number;
  arrear: number;
};

export type ApplyCustomerListValue = {
  id: string,
  created_at?: string,
  application_date: string,
  provision_status: string,
  approval: boolean | string,
  name: string,
  kana: string,
  created_by: string,
  anti_social_check: string,
  anti_social_result: boolean | string,
  last_conversation_date: string,
  customer: string
}

export type ApplyCustomerApplyValue = {
  id: string,
  preferred_rent_fee: number,
  preferred_purchase_fee: number,
  how_to_know: string,
  introduction_company: string,
  assumed_years_of_residence: number,
}

export type ApplyCustomerNegotiationValue = {
  id: string,
  created_at: string,
  promotion_method: string,
  result: string,
  conversation: string,
  created_by: string
}

export type ApplyCustomerInterviewValue = {
  id: string,
  interview_item: string,
  interview_item_name: string,
  interview_content: string
}
