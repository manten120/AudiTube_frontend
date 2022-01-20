/* eslint-disable no-shadow */
import { useState, createContext, useContext, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import type { NextPage } from 'next';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Layout } from '@/components/Layout';
import { theme } from '@/styles/theme';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Video } from '@/components/video';

type apiRouteResponse = {
  nextPageToken: string;
  items: {
    videoId: string;
    videoTitle: string;
    channelId: string;
    channelTitle: string;
  }[];
};

const SearchResultsContext = createContext(
  {} as {
    searchResult: apiRouteResponse | null;
    setSearchResult: Dispatch<SetStateAction<apiRouteResponse | null>>;
  }
);

type Props = {
  children?: ReactNode;
};

const SearchContextsProvider: FC<Props> = ({ children }) => {
  const [searchResult, setSearchResult] = useState<apiRouteResponse | null>(null);
  return (
    <SearchResultsContext.Provider value={{ searchResult, setSearchResult }}>{children}</SearchResultsContext.Provider>
  );
};

const UseSearchResultsContext = () => useContext(SearchResultsContext);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginLeft: 0,
  width: '100%',
  flex: 1, // flex item のときwidth: 100%が効かないため代わりに設定
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.28),
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.4),
    boxShadow: 'none',
  },
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}));

const Result = () => {
  const { searchResult } = UseSearchResultsContext();

  if (!searchResult) {
    return null;
  }

  const videos = searchResult.items.map((r) => (
    <Video
      key={r.videoId}
      videoId={r.videoId}
      videoTitle={r.videoTitle}
      channelTitle={r.channelTitle}
      channelId={r.channelId}
    />
  ));

  return <>{videos}</>;
};

const SearchBox = () => {
  const { setSearchResult } = UseSearchResultsContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    const searchWord = inputData.get('searchWord');
    const res = await fetch(`/api/youtubeSearch?searchWords=${searchWord}`);
    const result = (await res.json()) as apiRouteResponse;
    console.log({ result });
    setSearchResult(result);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        color: 'white',
        display: 'flex',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Search>
          <StyledInputBase placeholder="聴きたい動画を検索" inputProps={{ 'aria-label': 'search' }} name="searchWord" />
        </Search>
        <StyledButton variant="contained" type="submit">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </StyledButton>
      </Box>
    </Box>
  );
};

const SearchPage: NextPage = () => (
  <SearchContextsProvider>
    <Layout>
      <SearchBox />
      <Result />
    </Layout>
  </SearchContextsProvider>
);

export default SearchPage;
