import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Linking, Alert } from 'react-native';
import { Divider, Text, Checkbox } from 'react-native-paper';
import { SafeArea } from '../../components/styles/safeArea';
import { Spacer } from '../../components/styles/Text';
import { theme } from '../../theme';
import { ReportsInfoCard } from './components/infoCard';
import { Input } from 'react-native-elements';
import { Icon, MapIcon } from './components/reportsStyle';
import { updateRequest } from '../../api';
import { useNavigation } from '@react-navigation/native';

const ReportDetailScreen = ({ route }) => {
  const [checked, setChecked] = useState(false);
  const [comment, setComment] = useState('');

  const { report } = route.params;
  const navigation = useNavigation();

  const submitComment = async () => {
    const formData = {
      inspectorComment: comment,
      reqIsDone: checked,
    };
    const res = await updateRequest(report._id, formData);
    if (res.status === 200) {
      Alert.alert('Comment was added, Thank you!');
      setComment('');
      setChecked(false);
      navigation.navigate('reports');

      // console.log(res.data);
    }
  };

  const handleWaze = () => {
    Linking.canOpenURL(
      `https://waze.com/ul?q=TelAviv,${report.reqStreet}`
      // `https://waze.com/ul?ll=${report?.loaction?.lat},${report?.loaction?.lng}&z=10&navigate=yes`
    ).then((supported) => {
      if (supported) {
        return Linking.openURL(
          // `https://waze.com/ul?ll=${report?.loaction?.lat},${report?.loaction?.lng}&z=10&navigate=yes`
          `https://waze.com/ul?q=TelAviv,${report.reqStreet}`
        );
      } else {
        return console.log("Don't know how to open URI: " + report.reqStreet);
      }
    });
  };

  const handleGoogle = () => {
    Linking.canOpenURL(
      `https://www.google.com/maps/dir/?api=1&destination=${report.reqStreet}`
    ).then((supported) => {
      if (supported) {
        return Linking.openURL(
          `https://www.google.com/maps/dir/?api=1&destination=${report.reqStreet}`
        );
      } else {
        return console.log("Don't know how to open URI: " + report.reqStreet);
      }
    });
  };

  return (
    <SafeArea style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView>
        <ReportsInfoCard report={report} />
        <Spacer position="left" size="large">
          <Divider />
          <View style={{}}>
            <Text style={{ fontSize: 16, margin: 10 }}>Write Comment</Text>
            <Input
              multiline
              style={{ width: 50 }}
              value={comment}
              onChangeText={(ev) => setComment(ev)}
            />

            <Spacer position="left" size="large">
              <View style={{ width: 160, borderColor: 'black', flexDirection: 'row' }}>
                {/* <Icon source={require('../../../assets/images/icon-comment.png')} /> */}
                <Text style={{ fontSize: 16, margin: 10 }}>did you check the report?</Text>
                <View
                  style={{
                    borderStyle: 'solid',
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 38,
                    borderRadius: '50%',
                  }}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                    color={theme.colors.ui.primary}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={submitComment} style={styles.uploadButton}>
                <Text>Send Comment</Text>
              </TouchableOpacity>
            </Spacer>
          </View>

          <Spacer position="left" size="large">
            <Divider />
            <View style={{ flexDirection: 'culumn', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, margin: 10 }}>
                {report.reqStreet},{report?.reStreetNum}
              </Text>
              <Text style={{ fontSize: 16 }}>Tel Aviv</Text>
            </View>
            <View
              style={{
                marginTop: 40,
                width: '80%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={handleWaze} style={styles.navButton}>
                <MapIcon source={require('../../../assets/images/icon-waze.png')} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleGoogle} style={styles.navButton}>
                <MapIcon source={require('../../../assets/images/Google_Maps_icon.png')} />
              </TouchableOpacity>
            </View>
          </Spacer>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  navButton: {
    borderRadius: 16,
    alignSelf: 'center',
    elevation: 4,
    margin: 10,
    padding: 10,
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: theme.colors.ui.success,
  },
});

export default ReportDetailScreen;
