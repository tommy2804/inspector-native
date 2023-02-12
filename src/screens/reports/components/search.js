import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { theme } from '../../../theme';

const SearchContainer = styled(View)`
  padding: ${theme.space[3]};
  background-color: ${theme.colors.brand.primary};
`;

export const Search = ({ search }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    search(searchKeyword);
    setSearchKeyword(searchKeyword);
  }, [searchKeyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search By Title"
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
