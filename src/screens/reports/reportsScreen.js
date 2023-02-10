import React, { useState } from 'react';
import { View, TouchableOpacity, RefreshControl, ScrollView, Button } from 'react-native';
import { Spacer } from '../../components/styles/spacer';
import { CustomText as Text } from '../../components/styles/customText';
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
  const dispatch = useDispatch();
  const user = useStorageData();
  const id = '63dbbe1d075ae8317bf3aa42';
  const navigation = useNavigation();

  const getReports = async () => {
    try {
      const res = await getInspectorsRequests(id);
      // console.log(res.data);

      dispatch(addReports(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(reports);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
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

  // const user = useStorageData();
  // console.log(user);

  // const {
  //   data: inspectorsRequests,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery('inspectorsRequests', () => getInspectorsRequests(user?.id));
  // // console.log(inspectorsRequests?.data);
  // if (inspectorsRequests?.status === 200) {
  //   dispatch(addReports(inspectorsRequests.data));
  // } else {
  //   return (
  //     <ScrollView
  //       style={{ flex: 1 }}
  //       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
  //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //         <LottieView
  //           key="animation"
  //           style={{ width: 150, height: 200 }}
  //           resizeMode="cover"
  //           autoPlay
  //           loop
  //           source={require('../../../assets/animation/car-loader.json')}
  //           // source={require('../../../../assets/animations/watermelon-lottie.json')}
  //         />
  //       </View>
  //     </ScrollView>
  //   );
  // }

  return (
    <SafeArea>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Search />
        <ReportsList
          data={reports}
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
