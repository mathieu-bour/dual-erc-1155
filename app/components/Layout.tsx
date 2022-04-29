import { FC, ReactNode } from 'react';
import Container from '@mui/material/Container';

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Container maxWidth="xl" sx={{ mt: 4 }}>
    {children}
  </Container>
);

export default Layout;
