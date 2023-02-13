import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, RefreshControl, ScrollView, Text } from 'react-native';
import { Spacer } from '../../components/styles/spacer';
import { SafeArea } from '../../components/styles/safeArea';
import { Search } from './components/search';
import { ReportsList } from './components/stylesList';
import { ReportsInfoCard } from './components/infoCard';
import { FadeInView } from '../../components/styles/fadeInView';
import { selectReports } from '../../state/slices/reportSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getInspectorsRequests } from '../../api';
import { addReports } from '../../state/slices/reportSlice';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';

const ReportsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const reports = useSelector(selectReports);
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const getReports = async () => {
    try {
      const res = await getInspectorsRequests(user?.id);
      dispatch(addReports(res.data));
      setReportData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReports();
  }, [user]);

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

  // console.log(reports);
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

  if (reportData.length < 1) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
          <LottieView
            key="no-work"
            resizeMode="cover"
            autoPlay
            style={{ width: 400, height: 400, alignSelf: 'center', alignItems: 'center' }}
            loop
            source={require('../../../assets/animation/no-work.json')}
          />
          <Text style={{ fontSize: '30px' }}>
            no work for today {'\n'} go rest :{')'}
          </Text>
        </View>
      </ScrollView>
    );
  }
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
