import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Return } from '../../../components/elements/Button/Return';
import { TabPanel } from '../../../components/elements/Tab/TabPanel';
import { PropertyRegisterInformation } from '../../../components/templates/propertyInformation/detail/propertyInformation';
import { PropertyRegisterTabHeader } from '../../../constants/constants';
import { FormValues } from '../../../Types/FormTypes';
import { LandInformation } from '../../../components/templates/propertyInformation/register/LandInformation';
import { RegisterMortgageEstateInformation } from '../../../components/templates/propertyInformation/register/RegisterMortgageEstateInformation';
import { dialogState } from '../../../Atoms/Atoms';
import { useSetRecoilState } from 'recoil';
import { RegisterMortgageLandInformation } from '../../../components/templates/propertyInformation/register/RegisterMortgagelandInformation';

const PropertyRegister = () => {
  const { control, handleSubmit, reset } = useForm<Partial<FormValues>>();
  const [tabValue, setTabValue] = useState<number>(0);
  const searchState = useSetRecoilState(dialogState);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  //モーダル内の検索ボタン押下後にタブが移動しないようにするために別でデータを送信
  const searchSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    searchState(false);
    reset();
  };

  const onAddBuildingInfo: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    // 建物情報登録処理
    // API記載予定

    //ページ切り替え
    setTabValue((currVal) => currVal + 1);
    reset();
  };
  const onAddLandInfo: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    // 土地情報登録処理
    // API記載予定

    //ページ切り替え
    setTabValue((currVal) => currVal + 1);
    reset();
  };
  return (
    <div className="h-[90vh] py-5">
      <Return />
      <Tabs value={tabValue} onChange={handleChange} centered>
        {PropertyRegisterTabHeader.map((label, index) => (
          <Tab key={index} label={label} sx={{ fontSize: '1rem' }} />
        ))}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <PropertyRegisterInformation
          control={control}
          onSubmit={handleSubmit(onAddBuildingInfo)}
          searchSubmit={handleSubmit(searchSubmit)}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <LandInformation onSubmit={handleSubmit(onAddLandInfo)} control={control} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RegisterMortgageEstateInformation />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <RegisterMortgageLandInformation />
      </TabPanel>
    </div>
  );
};
export default PropertyRegister;
