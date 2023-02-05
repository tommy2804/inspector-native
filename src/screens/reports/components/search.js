import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { theme } from '../../../theme';

const SearchContainer = styled(View)`
  padding: ${theme.space[3]};
  background-color: ${theme.colors.brand.primary};
`;

export const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    setSearchKeyword(searchKeyword);
  }, [searchKeyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        // onIconPress={searchKeyword}
        // onSubmitEditing={() => Search(searchKeyword)}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
