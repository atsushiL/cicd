import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../Atoms/Atoms';
import { Return } from '../../../components/elements/Button/Return';
import { TabPanel } from '../../../components/elements/Tab/TabPanel';
import { Evaluation } from '../../../components/templates/propertyInformation/detail/evaluation';
import { FieldInformation } from '../../../components/templates/propertyInformation/detail/fieldInformation';
import { MortgageInformation } from '../../../components/templates/propertyInformation/detail/MortgageInformation';
import { GainSim } from '../../../components/templates/propertyInformation/detail/GainSim';
import { PropertyInformation } from '../../../components/templates/propertyInformation/detail/propertyInformation';
import { RequestInfo } from '../../../components/templates/propertyInformation/detail/RequestInfo';
import { propertyTabHeader } from '../../../constants/constants';
import { FormValues } from '../../../Types/FormTypes';
import { QueryBuilder } from '@material-ui/icons';

const ApplyPropertyDetails = () => {
  const { control, handleSubmit, reset, register } = useForm<Partial<FormValues>>();
  const [tabValue, setTabValue] = useState<number>(0);
  const [openDialog, setOpenDialog] = useRecoilState(dialogState);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onClose = () => {
    setOpenDialog(false);
    reset();
  };
  const onOpen = () => {
    setOpenDialog(true);
  };

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="h-[90vh] py-5">
      <Return />
      <Tabs value={tabValue} onChange={handleChange} centered>
        {propertyTabHeader.map((label, index) => (
          <Tab key={index} label={label} sx={{ fontSize: '1rem' }} />
        ))}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <RequestInfo
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          onClick={onOpen}
          openDialog={openDialog}
          onClose={onClose}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PropertyInformation control={control} onSubmit={handleSubmit(onSubmit)} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <FieldInformation control={control} onSubmit={handleSubmit(onSubmit)} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <MortgageInformation />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Evaluation control={control} onSubmit={handleSubmit(onSubmit)} onClose={onClose} />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <GainSim />
      </TabPanel>
    </div>
  );
};
export default ApplyPropertyDetails;
