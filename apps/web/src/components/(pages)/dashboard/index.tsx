'use client';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import api from '@/apis';
import { User } from 'types';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
} from '@mui/material';

const Dashboard = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const {
    data: users,
    refetch,
    error,
  } = useQuery({
    // no need key for manual trigger
    queryKey: ['users'],
    // use global types interface (whole repo-scaled)
    queryFn: () => api.users.getAll.call<User[]>(),
    // manually triggered by button
    enabled: false,
    initialData: [],
  });
  const handlePress = () => {
    refetch();
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={600} mx="auto">
      <Typography variant="h4" fontWeight="bold">
        Hello {currentUser?.email}!
      </Typography>

      <Button variant="contained" color="primary" onClick={handlePress}>
        Get All Users
      </Button>

      {error ? (
        <Alert severity="error">Error fetching user data</Alert>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {users.map((acc) => (
            <Card key={acc.uid} variant="outlined">
              <CardContent>
                {Object.entries(acc).map(([key, value]) => (
                  <Typography key={key} variant="body2" color="textSecondary">
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
