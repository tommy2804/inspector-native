import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

export const CustomButtonSheet = ({
  children,
  middle = '15%',
  maxPresent = '55%',
  minPresent = '5.5%',
}) => {
  const bottomSheetRef = useRef();
  const { width, height } = Dimensions.get('window');

  // variables
  const snapPoints = useMemo(() => [minPresent, middle, maxPresent], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      handleHeight={0}
      ref={bottomSheetRef}
      index={1}
      width={width}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={(styles.contentContainer, { width: width / 0.2, height })}>{children}</View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
