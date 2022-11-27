import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Return } from '../../components/elements/Button/Return';
import { TabPanel } from '../../components/elements/Tab/TabPanel';
import { DetailFormTable } from '../../components/elements/Table/DetailTable';
import { ALBTable } from '../../components/templates/apply_customer/detail/ALBTable';
import { Negotiation } from '../../components/templates/apply_customer/detail/Negotiation';
import { detailTabList } from '../../constants/constants';
import { fetch_GET } from '../../constants/functions/fetch';
import { ProspectiveCustomerDetailApiType } from '../../Types/ApiTypes';
import { FormDetailValue } from '../../Types/TableTypes';

const ProspectiveCustomerDetail = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState<number>(0);
  const [data, setData] = useState<FormDetailValue>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const id = router.query.prospective_id;
  useEffect(() => {
    if (router.isReady) {
      fetch_GET({
        url: `prospect_customers/${id}/`,
        resFunction: (data: ProspectiveCustomerDetailApiType) => {
          const temp: FormDetailValue = [
            { title: '氏名', value: data.customer_name, type: 'text', name: 'name' },
            { title: 'カナ氏名', value: data.customer_kana, type: 'text', name: 'name_kana' },
            { title: '生年月日', value: data.customer_birthday, type: 'text', name: 'birthday' },
            { title: '携帯番号', value: data.cellphone_no, type: 'text', name: 'phoneNumber' },
            { title: 'メールアドレス', value: data.email, type: 'text', name: 'email' },
            { title: '都道府県', value: data.prefecture, type: 'select', name: 'prefectures' },
            { title: '特記事項', value: data.memo, type: 'memo', name: 'memo' },
          ];
          setData(temp);
        },
      });
    }
  }, [router.isReady]);

  return (
    <div>
      <Return />
      <Tabs value={tabValue} onChange={handleChange} centered>
        {detailTabList.map((label, index) => (
          <Tab key={index} label={label} sx={{ fontSize: '1rem' }} />
        ))}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <DetailFormTable detailData={data} />
      </TabPanel>
      <TabPanel value={tabValue} index={1} width={'w-[90vw]'}>
        <ALBTable />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Negotiation />
      </TabPanel>
    </div>
  );
};

export default ProspectiveCustomerDetail;
