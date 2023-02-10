import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Linking, Image } from 'react-native';
import { List, Divider, Button, Text, TextInput } from 'react-native-paper';
import { SafeArea } from '../../components/styles/safeArea';
import { Spacer } from '../../components/styles/Text';
import { theme } from '../../theme';
import { ReportsInfoCard } from './components/infoCard';
import { Input } from 'react-native-elements';
import { Icon, MapIcon } from './components/reportsStyle';

const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;
  console.log(report);

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
            <Text>write a comment</Text>
            <Input multiline style={{ width: 50 }} />
            <TouchableOpacity style={styles.uploadButton}>
              <Text>Send Comment</Text>
            </TouchableOpacity>
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
                <MapIcon source={require('../../../assets/icon-waze.png')} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleGoogle} style={styles.navButton}>
                <MapIcon source={require('../../../assets/Google_Maps_icon.png')} />
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
