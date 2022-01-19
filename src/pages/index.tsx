import { Box, Container, Typography } from '@mui/material';

import type { NextPage } from 'next';

import { Link } from '@/components/Link';

import { Header } from '@/components/Header';
import { Finish } from '@/components/Finish';

const Index: NextPage = () => (
  <>
    <Header />
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" component="h1" gutterBottom>
            オーディチューブはYouTubeの朗読動画・オーディオブックを聴いた感想や記録をシェアするためのサイトです
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Link href="/" color="primary" sx={{ pr: 2 }}>
              <Typography variant="body1">アカウント作成</Typography>
            </Link>

            <Link href="/" color="primary" sx={{ pr: 2 }}>
              <Typography variant="body1">ログイン</Typography>
            </Link>
          </Box>
        </Box>

        <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1, my: 2 }}>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
            みんなの感想
          </Typography>

          <Finish />
          <Finish />
          <Finish />
          <Finish />
          <Finish />
        </Box>
      </Box>
    </Container>
  </>
);

export default Index;
