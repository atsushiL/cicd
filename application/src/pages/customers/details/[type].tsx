import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../components/elements/Button/MainButtons';
import { Return } from '../../../components/elements/Button/Return';
import { TabFooter } from '../../../components/elements/Tab/TabFooter';
import { TabPanel } from '../../../components/elements/Tab/TabPanel';
import { DetailFormTable } from '../../../components/elements/Table/DetailTable';
import { ALBTable } from '../../../components/templates/apply_customer/detail/ALBTable';
import { FamilyDetail } from '../../../components/templates/apply_customer/detail/Family';
import { InterviewTable } from '../../../components/templates/apply_customer/detail/Interview';
import { Negotiation } from '../../../components/templates/apply_customer/detail/Negotiation';
import { FamilyRegister } from '../../../components/templates/apply_customer/register/Family';
import {
  detailsForBankInfo,
  detailsForCustomerInfo,
  detailsForJobInfo,
  detailsForLoanInfo,
  dummyDetailsForApplyInfo,
  dummyDetailsForOthersInfoA,
  TabHeader,
} from '../../../constants/constants';
import { getDetailFormData } from '../../../constants/functions/getData';
import { registerFormHandler } from '../../../constants/functions/handlers';
import { FormValues } from '../../../Types/FormTypes';
import { FormDetailValue, SelectListValue } from '../../../Types/TableTypes';

const ApplyCustomerDetails = () => {
  const router = useRouter();
  const type = router.query.type;
  const customerId = router.query.customer_id;
  const provisionalId = router.query.provisional_id;
  const { control, handleSubmit, reset, register } = useForm<Partial<FormValues>>();
  const [tabValue, setTabValue] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<FormDetailValue>([]);
  const [urlId, setUrlId] = useState<String>('');
  const [reload, setReload] = useState<boolean>(false);
  const [selectList, setSelectList] = useState<SelectListValue>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const filteredTabHeder = type !== 'detail' ? TabHeader.filter((item) => item !== '交渉履歴') : TabHeader;

  useEffect(() => {
    if (type === 'detail' && router.isReady) {
      getDetailFormData(
        tabValue,
        customerId as string,
        provisionalId as string,
        setCustomerInfo,
        setUrlId,
        setSelectList,
      );
    }
  }, [tabValue, reload, router.isReady]);

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    setTabValue((currVal) => {
      if (filteredTabHeder.length - 1 > currVal) {
        return currVal + 1;
      } else {
        return currVal;
      }
    });
    console.log(data);
    reset();
  };

  const filteredTabHeader = type !== 'detail' ? TabHeader.filter((item) => item !== '交渉履歴') : TabHeader;

  return (
    <div className="h-[90vh] py-5">
      <Return />
      <Tabs value={tabValue} onChange={handleChange} centered>
        {filteredTabHeader.map((label, index) => (
          <Tab key={index} label={label} sx={{ fontSize: '1rem' }} />
        ))}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {type === 'detail' ? (
          <DetailFormTable
            detailData={customerInfo}
            url={`provisional_customer/${customerId}/`}
            setReload={setReload}
            reform
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerFormHandler(detailsForCustomerInfo, control, register)}
            <TabFooter />
          </form>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {type === 'detail' ? (
          <DetailFormTable
            detailData={customerInfo}
            url={`customers/${customerId}/workplace/${provisionalId}/`}
            setReload={setReload}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerFormHandler(detailsForJobInfo, control)}
            <TabFooter />
          </form>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {type === 'detail' ? (
          <DetailFormTable
            detailData={customerInfo}
            url={`customers/${customerId}/bank_account/${provisionalId}/`}
            setReload={setReload}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerFormHandler(detailsForBankInfo, control)}
            <TabFooter />
          </form>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        {type === 'detail' ? (
          <FamilyDetail provisionalId={provisionalId as string} />
        ) : (
          <FamilyRegister setTabValue={setTabValue} />
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        {type === 'detail' ? (
          <DetailFormTable
            detailData={customerInfo}
            url={`customers/${customerId}/provisional_customers/${provisionalId}/loan/${urlId}/`}
            setReload={setReload}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerFormHandler(detailsForLoanInfo, control)}
            <TabFooter />
          </form>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        {type === 'detail' ? (
          <DetailFormTable
            detailData={customerInfo}
            url={`customers/${customerId}/provisional_customers/${provisionalId}/application_info/${urlId}/`}
            setReload={setReload}
            dynamicList={selectList}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerFormHandler(dummyDetailsForApplyInfo, control, register)}
            <TabFooter />
          </form>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        {/* 今は同じtableで共有しますけど、API繋いだら変更するかも */}
        {type === 'detail' ? (
          <InterviewTable />
        ) : (
          <>
            <InterviewTable />
            <Button
              type={'button'}
              text={'次へ'}
              buttonStyles={'Primary'}
              customStyles="block my-4 mx-auto"
              onClick={() => {
                setTabValue((currVal) => currVal + 1);
              }}
            />
          </>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={7} width="w-full">
        {type === 'detail' ? (
          <>
            <DetailFormTable detailData={dummyDetailsForOthersInfoA} title="反社チェック" />
            <ALBTable title="ALB反社チェック" />
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              {registerFormHandler(dummyDetailsForOthersInfoA, control, register, '反社チェック')}
              <TabFooter index={7} />
            </form>
            <ALBTable title="ALB反社チェック" />
          </>
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={type === 'detail' ? 8 : -1}>
        <Negotiation />
      </TabPanel>
    </div>
  );
};
export default ApplyCustomerDetails;
