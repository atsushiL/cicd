export type tableTypes = {
  id: string;
  info:
    | applyCustomerValue
    | ProspectiveCustomerValue
    | negotiationHistory
    | ReviewCompaniesValue
    | propertyPurchaseValue
    | InterviewItem
    | propertyUserManageValue
    | PromotionMethodItem
    | PromotionDetail
    | familyValue
    | propertyListValue
    | propertyGainValue
    | evaluationValue
    | EvaluationStandardValue
    | ALBValue
    | MortgageInfoAValue
    | MortgageInfoBValue;
}[];

export type editTableTypes = {
  id: string;
  info: editTypes;
}[];

export type editTypes =
  | InterviewItem
  | ProspectiveCustomerValue
  | PromotionMethodItem
  | PromotionDetail
  | propertyPurchaseValue
  | ReviewCompaniesValue
  | ReferralCompaniesValue
  | propertyListValue
  | dummySaleListValue
  | InterviewValue
  | familyValue
  | propertyGainValue
  | MortgageInfoAValue
  | MortgageInfoBValue
  | propertyUserManageValue
  | EvaluationStandardValue
  | ALBValue;

export type applyCustomerValue = {
  applyDate: string;
  name: string;
  result: string;
  replyResult: string;
  antisocialCheck: string;
  antisocialResult: string;
  staff: string;
  negotiationDate: string;
};

export type ProspectiveCustomerValue = {
  name: string;
  kana_name: string;
  prefecture: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type ReviewCompaniesValue = {
  created_at: string;
  name: string;
  memo: string;
  person_in_charge: string;
  phone_no: string;
};

export type ReferralCompaniesValue = {
  created_at: string;
  name: string;
  phone_no: string;
  person_in_charge:string;
  introduction_count:number;
};

export type DummyDetail = {
  title: string;
  value?: string;
}[];

export type SelectListValue = {
  title: string;
  value: string;
}[]

export type FormRegisterValue = {
  title: string;
  type: string;
  name: string;
}[]

export type FormDetailValue = {
  title: string;
  value: string;
  type: string;
  name: string;
}[];

export type negotiationHistory = {
  date: string;
  promotionMethod: string;
  reply: string;
  content: string;
  staff: string;
};

export type propertyPurchaseValue = {
  criteriaName: string;
  criteria: string;
  registeredPerson: string;
  registeredDate: string;
  note: string;
};

export type PromotionMethodItem = {
  method: string;
  created_by: string;
  created_at: string;
};

export type PromotionDetail = {
  result: string;
  created_by: string;
  created_at: string;
};

export type propertyListValue = {
  date: string;
  name: string;
  progress: string;
  result: string;
};

export type InterviewItem = {
  created_by: string;
  item: string;
  memo: string;
  created_at: string;
};

export type propertyUserManageValue = {
  role: string;
  username: number;
  name: string;
  email: string;
  status: string;
  active: boolean;
};

export type propertyGainValue = {
  registerDate: string;
  registeredPerson: string;
};

export type dummySaleListValue = {
  researchName: string;
  saleStandard: string;
  searchResult: string;
  judge: string;
  cause: string;
};

export type familyValue = {
  name: string;
  relationship: string;
  age: string;
  jobType: string;
  household: string;
  agree: string;
};

export type propertyInformationValue = {
  title: string;
  name: string;
  value: string;
};

export type InterviewValue = {
  interviewItem: string;
  reply: string;
};

export type MortgageInfoAValue = {
  date: string;
  debtorName: string;
  reason: string;
  purpose: string;
};

export type MortgageInfoBValue = {
  date: string;
  debtorName: string;
  debtNum: string;
  creditorName: string;
  purpose: string;
};

export type evaluationValue = {
  title: string;
  status: string;
  result: string;
  note: string;
};

export type EvaluationStandardValue = {
  standard: string;
  standard_content: string;
  created_at: string;
  created_by: string;
  memo: string;
};
export type paginationValue = {
  count: number;
  next: string;
  previous: string;
};
export type ALBValue = {
  name: string;
  account: string;
  contract: string;
  result: string;
  reason: string;
  response: string;
  date: string;
};
