import { Dispatch, SetStateAction } from 'react';
import { dateTimeFormatterHyphen, dateTimeFormatter_noTime } from '../../constants/functions/dateTimeFormat';
import { fetch_GET, fetch_PATCH, fetch_POST } from '../../constants/functions/fetch';
import {
  ApiType,
  ApplyCustomerApplyValue,
  ApplyCustomerBankDetailValue,
  ApplyCustomerDetailValue,
  ApplyCustomerJobDetailValue,
  ApplyCustomerLoanValue,
  EvaluationStandardApiType,
  PromotionDetailApiType,
  PromotionMethodApiType,
  ReferralCompanyApiType,
  ReviewCompanyApiType,
} from '../../Types/ApiTypes';
import { FormValues } from '../../Types/FormTypes';
import {
  editTableTypes,
  EvaluationStandardValue,
  FormDetailValue,
  paginationValue,
  PromotionDetail,
  PromotionMethodItem,
  propertyUserManageValue,
  ReviewCompaniesValue,
  SelectListValue,
} from '../../Types/TableTypes';
import { ApiOptionHandler, applyStatus } from './handlers';

export const getEvaluationStandards = (setData: (array: editTableTypes) => void) => {
  fetch_GET({
    url: 'evaluation_standard/',
    resFunction: (result: ApiType) => {
      let array: editTableTypes = [];
      Object.values(result.results).forEach((value: EvaluationStandardApiType) => {
        const map: EvaluationStandardValue = {
          standard: value.standard,
          standard_content: value.standard_content,
          created_by: value.created_by,
          created_at: dateTimeFormatter_noTime(value.created_at),
          memo: value.memo,
        };
        array.push({ id: value['id'], info: map });
      });
      setData(array);
    },
  });
};

export const getUserInfo = (
  setUserData: (array: editTableTypes) => void,
  setPageData: (array: paginationValue) => void,
  offset: number,
) => {
  fetch_GET({
    url: `user/?limit=1&offset=${offset}`,
    resFunction: (data: ApiType) => {
      console.log(data);
    },
  });
};

export const createUserInfo = (
  data: Partial<FormValues>,
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
  reload: boolean,
) => {
  fetch_POST({
    url: 'user/',
    body: JSON.stringify(data),
    resFunction: (response: Response) => {
      if (response.ok) {
        setReload(!reload);
      } else {
        setReload(false);
        response.json().then((data) => {
          alert(Object.values(data).map((item) => item));
        });
      }
    },
  });
};

export const changeUserStatus = (
  editId: string,
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
  reload: boolean,
) => {
  fetch_POST({
    url: `user/${editId}/disable_user/`,
    resFunction: (response: Response) => {
      if (response.ok) {
        setReload(!reload);
      } else {
        setReload(false);
        alert('???????????????????????????????????????????????????');
      }
    },
  });
};

export const editUserInfo = (
  dirtyFields: { [key: string]: boolean },
  data: Partial<FormValues>,
  editId: string,
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
  reload: boolean,
) => {
  // console.log(editId);
  fetch_PATCH({
    dirty: dirtyFields,
    body: JSON.stringify(data),
    url: `user/${editId}/`,
    resFunction: (response: Response) => {
      if (response.ok) {
        setReload(!reload);
      } else {
        alert('???????????????????????????');
        setReload(false);
      }
    },
  });
};

export const getDetailFormData = (
  tabValue: number,
  customerId: string,
  provisionalId: string,
  setCustomerInfo: Dispatch<SetStateAction<FormDetailValue>>,
  setUrlId: Dispatch<SetStateAction<String>>,
  setSelectList: Dispatch<SetStateAction<SelectListValue>>,
) => {
  function isReferralCompanyList(item: ApiType['results']): item is ReferralCompanyApiType[] {
    return (item as ReferralCompanyApiType[]) !== undefined;
  }
  if (tabValue === 0) {
    fetch_GET({
      url: `provisional_customer/${customerId}/`,
      resFunction: (data: ApplyCustomerDetailValue) => {
        const temp: FormDetailValue = [
          {
            title: '?????????',
            value: dateTimeFormatterHyphen(data.customer_data.created_at),
            type: 'date',
            name: 'applyDate',
          },
          {
            title: '?????????????????????',
            value: applyStatus(data.provisional_customer_data.status),
            type: 'button',
            name: 'status',
          },
          {
            title: '???????????????',
            value: data.provisional_customer_data.approval ? '??????' : '??????',
            type: 'radio',
            name: 'applyResult',
          },
          {
            title: '????????????',
            value: data.provisional_customer_data.reason_for_refusal,
            type: 'text',
            name: 'reason_for_refusal',
          },
          { title: '??????', value: data.customer_data.name, type: 'text', name: 'name' },
          { title: '????????????', value: data.customer_data.kana, type: 'text', name: 'name_kana' },
          {
            title: '??????',
            value: data.provisional_customer_data.property === 'INDIVIDUAL' ? '??????' : '??????',
            name: 'applyType',
            type: 'radio',
          },
          { title: '????????????', value: data.customer_data.phone_no, type: 'tel', name: 'homeNumber' },
          { title: '????????????', value: data.customer_data.cellphone_no, type: 'tel', name: 'phoneNumber' },
          { title: '?????????????????????', value: data.customer_data.email, type: 'email', name: 'email' },
          { title: '????????????', value: data.customer_data.birthday, type: 'date', name: 'birthday' },
          { title: '????????????', value: data.address.post_no, type: 'text', name: 'postcode' },
          { title: '????????????', value: data.address.prefecture, type: 'text', name: 'prefectures' },
          { title: '????????????', value: data.address.municipalities, type: 'text', name: 'city' },
          { title: '??????', value: data.address.house_no, type: 'text', name: 'houseNumber' },
          { title: '????????????????????????', value: data.address.other, type: 'text', name: 'buildingName' },
          { title: '????????????', value: data.customer_data.memo, type: 'memo', name: 'memo' },
        ];
        setCustomerInfo(temp);
      },
    });
  } else if (tabValue === 1) {
    fetch_GET({
      url: `customers/${customerId}/workplace/`,
      resFunction: (data: ApplyCustomerJobDetailValue) => {
        const temp: FormDetailValue = [
          { title: '????????????', value: data.name, type: 'text', name: 'name' },
          { title: '????????????', value: data.phone_no, type: 'tel', name: 'phone_no' },
          { title: '??????', value: data.industry, type: 'text', name: 'industry' },
          { title: '??????', value: data.occupation, type: 'text', name: 'occupation' },
          { title: '??????', value: data.annual_income.toString(), type: 'text', name: 'annual_income' },
        ];
        setCustomerInfo(temp);
      },
    });
  } else if (tabValue === 2) {
    fetch_GET({
      url: `customers/${customerId}/bank_account/`,
      resFunction: (data: ApplyCustomerBankDetailValue) => {
        const temp: FormDetailValue = [
          { title: '???????????????', value: data.holder, type: 'text', name: 'holder' },
          { title: '????????????', value: data.number, type: 'tel', name: 'number' },
          {
            title: '????????????',
            value: ApiOptionHandler(data.account_type.toString()),
            type: 'radio',
            name: 'account_type',
          },
          { title: '???????????????', value: data.bank, type: 'text', name: 'bank' },
          { title: '?????????', value: data.branch, type: 'text', name: 'branch' },
        ];
        setCustomerInfo(temp);
      },
    });
  } else if (tabValue === 4) {
    fetch_GET({
      url: `customers/${customerId}/provisional_customers/${provisionalId}/loan/`,
      resFunction: (data: ApplyCustomerLoanValue) => {
        setUrlId(data.id);
        const temp: FormDetailValue = [
          {
            title: '?????????????????????',
            value: data.remaining_housing_loan_debt.toLocaleString('en-US'),
            type: 'text',
            name: 'remaining_housing_loan_debt',
          },
          {
            title: '??????????????????',
            value: data.monthly_repayment.toLocaleString('en-US'),
            type: 'text',
            name: 'monthly_repayment',
          },
          {
            title: '?????????????????????',
            value: data.bonus_month_repayment.toLocaleString('en-US'),
            type: 'text',
            name: 'bonus_month_repayment',
          },
          { title: '?????????', value: data.arrear.toLocaleString('en-US'), type: 'text', name: 'arrear' },
        ];
        setCustomerInfo(temp);
      },
    });
  } else if (tabValue === 5) {
    fetch_GET({
      url: `introduction_company/`,
      resFunction: (data: ApiType) => {
        console.log(data);
        const temp: SelectListValue = [];
        isReferralCompanyList(data.results) &&
          data.results.map((item) => {
            temp.push({
              title: item.name,
              value: item.id,
            });
          });
        setSelectList(temp);
      },
    });
    fetch_GET({
      url: `customers/${customerId}/provisional_customers/${provisionalId}/application_info/`,
      resFunction: (data: ApplyCustomerApplyValue) => {
        setUrlId(data.id);
        const temp: FormDetailValue = [
          {
            title: '????????????',
            value: data.preferred_rent_fee.toLocaleString('en-US'),
            type: 'amount',
            name: 'preferred_rent_fee',
          },
          {
            title: '??????????????????',
            value: data.preferred_purchase_fee.toLocaleString('en-US'),
            type: 'amount',
            name: 'propertyPurchase',
          },
          { title: '????????????????????????', value: data.how_to_know, type: 'text', name: 'how_to_know' },
          { title: '????????????', value: data.introduction_company, type: 'select', name: 'introduction_company' },
          {
            title: '??????????????????',
            value: data.assumed_years_of_residence.toString(),
            type: 'amount',
            name: 'assumed_years_of_residence',
          },
        ];
        setCustomerInfo(temp);
      },
    });
  }
};

export const patchApi = (
  url: string,
  dirtyFields: { [key: string]: boolean },
  data: Partial<FormValues>,
  fetchData: VoidFunction,
) => {
  fetch_PATCH({
    dirty: dirtyFields,
    body: JSON.stringify(data),
    url: url,
    resFunction: (result: Response) => {
      if (result.ok) {
        fetchData();
      } else {
        alert('???????????????????????????');
      }
    },
  });
};

export const postApi = (url: string, data: Partial<FormValues>, fetchData: VoidFunction) => {
  fetch_POST({
    url: url,
    body: JSON.stringify(data),
    resFunction: (result: Response) => {
      if (result.ok) {
        fetchData();
      } else {
        alert('???????????????????????????');
      }
    },
  });
};
