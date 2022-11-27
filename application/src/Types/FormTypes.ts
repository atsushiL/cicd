export type FormValues = {
  //personalInfo
  newPassword: string;
  confirmNewPassword: string;
  item: string;
  name: string;
  name_kana: string;
  age: string;
  email: string;
  homeNumber: string;
  phoneNumber: string;
  phone_no: string;
  birthday: string;
  postcode: string;
  address: string;
  staffId: number;
  role: string | number;
  accountStatus: string;
  area: string;
  prefectures: string;
  city: string;
  houseNumber: string;
  buildingName: string;
  relationship: string;
  applyType: 'personal' | 'company';
  username: number | string;
  password: string;
  new_password: string;
  confirm_password: string;
  staff: string;
  //jobInfo
  company: string | boolean;
  companyName: string;
  industry: string;
  job: string;
  occupation:string;
  annual_income: string;
  //bankInfo
  holder: string;
  number: string;
  account_type: "0" | "1";
  bank: string;
  branch: string;
  remaining_housing_loan_debt: number;
  monthly_repayment: string;
  bonus_month_repayment: string;
  arrear: string;
  // others
  applyDateFrom: string;
  applyDateTo: string;
  negotiationDateFrom: string;
  negotiationDateTo: string;
  note: string;
  conversation: string;
  promotion_method: string;
  created_at:string;
  status: string | number;
  result: string;
  applyResult: 'approve' | 'disapprove';
  reason: string;
  details: string;
  method: string;
  memo: string;
  id: string;
  standard: string;
  standard_content: string;
  propertyPurchaseName: string;
  preferred_purchase_fee: string;
  how_to_know:string;
  introduction_company:string;
  assumed_years_of_residence:string;
  household_management: 'same' | 'different';
  consensus: 'yes' | 'no';
  propertyPurchase: string;
  person_in_charge:string;
  reason_for_refusal:string;
  applyDate:string,
  interview_content:string,
  //propertyInformation
  applyName: string;
  nominee: string;
  nomineeName: string;
  propertyType: string;
  propertyNumber: string;
  municipalities: string;
  buildingIdentify: string;
  buildingYear: string;
  reform: string;
  cancelFee: string;
  managementFee: string;
  direction: string;
  frontRoad: string;
  station: string;
  occupiedArea: string;
  seizuresNumber: string;
  mortgagesNumber: string;
  dateFrom: string;
  dateTo: string;
  interview_item: string;
  reply: string;
  check: string;
  searchApplyDate1: string;
  searchApplyDate2: string;
  preferred_rent_fee:string;

  //evaluation
  amount: string;
  period: string;
  resultType: 'OK' | 'NG';
  purpose: string;
  debtNum: string;
  creditorName: string;
  debtorName: string;
  saleResult: string;
  //fieldInformation
  lotNumber: string;
  landmark: string;
  registeredAreaNumber: string;
  areaNominee: string;
  areaNomineeName: string;
  image: string;
  picture: string;
  //petInformation
  animal: string;
  animalNumber: string;
  environment: string;
  approve:boolean;
};

export type RadioType = {
  title: string;
  value: string;
}[];