import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, RefreshControl, ScrollView, Button } from 'react-native';
import { Spacer } from '../../components/styles/spacer';
import { SafeArea } from '../../components/styles/safeArea';
import { Search } from './components/search';
import { ReportsList } from './components/stylesList';
import { ReportsInfoCard } from './components/infoCard';
import { FadeInView } from '../../components/styles/fadeInView';
import { selectReports } from '../../state/slices/reportSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getInspectorsRequests } from '../../api';
import { useStorageData } from '../../hooks/fetchAsyncStorage';
import { addReports } from '../../state/slices/reportSlice';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const ReportsScreen = () => {
  const reports = useSelector(selectReports);
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatch();
  const user = useStorageData();
  const id = '63dbbe1d075ae8317bf3aa42';
  const navigation = useNavigation();

  const searchReport = (value) => {
    if (!value.length) return setReportData(reports);
    const filteredReports = reports.filter((report) => {
      return report?.reqTitle.toLowerCase().includes(value.toLowerCase());
    });
    if (filteredReports.length) setReportData(filteredReports);
    else {
      setReportData(reports);
    }
  };

  const getReports = async () => {
    try {
      const res = await getInspectorsRequests(id);
      // console.log(res.data);

      dispatch(addReports(res.data));
      setReportData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(reports);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (reports.length <= 0) {
      try {
        getReports();
      } catch (error) {
        console.log(error);
        setRefreshing(false);
      }
    }
    setRefreshing(false);
  }, []);
  useEffect(() => {
    getReports();
  }, []);

  return (
    <SafeArea>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Search search={searchReport} />
        <ReportsList
          data={reportData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => console.log(item)}>
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <ReportsInfoCard report={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </ScrollView>
    </SafeArea>
  );
};

export default ReportsScreen;
