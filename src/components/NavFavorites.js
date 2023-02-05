import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getInspectorsRequests } from '../api';
import { Badge, ActivityIndicator, Colors } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addReports, setReport } from '../state/slices/reportSlice';
import styled from 'styled-components/native';

const NavFavorites = ({ size = '50%' }) => {
  const [newRequest, setNewRequest] = useState({});
  const [allRequsts, setAllRequests] = useState([]);
  const { width } = Dimensions.get('window');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const id = '63dbbe5b075ae8317bf3aa47';

  const {
    data: inspectorsRequests,
    isLoading,
    isError,
  } = useQuery('inspectorsRequests', () => getInspectorsRequests(id));

  const LoadingContainer = styled(View)`
    position: absolute;
    top: 50%;
    left: 50%;
  `;

  const Loading = styled(ActivityIndicator)`
    margin-left: -25px;
  `;

  useEffect(() => {
    if (inspectorsRequests) {
      setAllRequests(inspectorsRequests.data);
      dispatch(setReport(newRequest));
      dispatch(addReports(allRequsts));
    }
  }, [inspectorsRequests]);

  if (isError)
    return (
      <Text>an error accured while searching your reports please reset the app or call help</Text>
    );

  if (isLoading)
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.blue300} />
      </LoadingContainer>
    );

  // const updateRequestMutation = useMutation(updateRequest, {
  //   onSuccess: () => {
  //     // invalidate and refetch
  //     queryClient.invalidateQueries('inspectorsRequests');
  //   },
  // });

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: size,
      }}>
      <FlatList
        data={inspectorsRequests.data}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={tw`border-t border-gray-200`} />}
        renderItem={({
          item: {
            icon = 'home',
            location,
            reqPhoto,
            reStreetNum,
            reqStreet,
            reqTitle,
            reqDescription,
            urgency,
            reqNumber,
            ofUser,
            isDone,
            inspectorComment,
            _id,
          },
          item,
        }) => (
          <TouchableOpacity
            style={tw`flex-row p-2`}
            onPress={() =>
              setNewRequest({
                id: _id,
                reportNum: reqNumber,
                urgency,
                userReported: ofUser,
                title: reqTitle,
                description: reqDescription,
                isDone,
                image: reqPhoto,
                location,
                comment: inspectorComment,
              })
            }>
            <View style={{ position: 'absolute', top: 5, left: width / 1.2 }}>
              <Badge
                size={12}
                style={{ backgroundColor: urgency > 8 ? 'red' : urgency > 4 ? 'blue' : 'green' }}
              />
            </View>

            <Icon
              name={icon}
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              type="font-awesome"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{`${reqTitle}`}</Text>
              <View style={{ width: width / 1.2 }}>
                <Text style={styles.description}>{`${reqDescription}`}</Text>
              </View>
              <Text style={styles.address}>{`${reqStreet},${reStreetNum}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({
  address: {
    color: 'gray',
    fontSize: 12,
    margin: 4,
  },
  description: {
    color: 'gray',
    fontSize: 15,
  },
});
