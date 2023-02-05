import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { SafeArea } from '../../components/styles/safeArea';
import { Spacer } from '../../components/styles/Text';
import { OrderButton } from './components/stylesList';
import { theme } from '../../theme';
import { ReportsInfoCard } from './components/infoCard';

const ReportDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  //   const { report } = route.params;

  return (
    <SafeArea>
      <ScrollView>
        <ReportsInfoCard />
        <List.Accordion
          title=""
          left={(props) => <List.Icon {...props} icon="food-croissant" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}>
          <List.Item title=" " />
          <Divider />
          <List.Item title=" " />
          <Divider />
          <List.Item title=" " />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title=""
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}>
          <List.Item title="" />
          <Divider />
          <List.Item title=" " />
          <Divider />
          <List.Item title=" " />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title=""
          left={(props) => <List.Icon {...props} icon="glass-cocktail" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}>
          <List.Item title=" " />
          <Divider />
          <List.Item title=" " />
          <Divider />
          <List.Item title=" " />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title=""
          left={(props) => <List.Icon {...props} icon="coffee" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}>
          <List.Item title="" />
          <Divider />
          <List.Item title="" />
          <Divider />
          <List.Item title=" " />
          <Divider />
          <List.Item title=" Grey" />
          <Divider />
          <List.Item title=" " />
          <Divider />
          <List.Item title="" />
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large">
        <OrderButton
          mode="contained"
          //   onPress={() => {
          //     addToCart({ item: 'special', price: 1299 }, restaurant);
          //     navigation.navigate('Checkout');
          //   }}
        ></OrderButton>
      </Spacer>
    </SafeArea>
  );
};

export default ReportDetailScreen;
