import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';
import { Spacer } from '../../components/styles/spacer';
import { CustomText as Text } from '../../components/styles/customText';
import { SafeArea } from '../../components/styles/safeArea';
import { Search } from './components/search';
import { ReportsList } from './components/stylesList';
import { ReportsInfoCard } from './components/infoCard';
import { FadeInView } from '../../components/styles/fadeInView';
import { selectReports } from '../../state/slices/reportSlice';
import { useSelector } from 'react-redux';

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const ReportsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reports = useSelector(selectReports);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}

      <Search />
      <ReportsList
        data={reports}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            // onPress={() => navigation.navigate('RestaurantDetail', { report: item })}
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ReportsInfoCard reports={reports} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
      {error && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
    </SafeArea>
  );
};

export default ReportsScreen;
