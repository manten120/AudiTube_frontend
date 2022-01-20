import { NextComponentType } from 'next';
import { Container, Box } from '@mui/material';
import { Header } from './Header';

export const Layout: NextComponentType = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>{children}</Box>
    </Container>
  </>
);
