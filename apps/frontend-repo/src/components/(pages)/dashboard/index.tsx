'use client';
import { useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import api from '@/apis';
import { User } from 'types';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAppContext } from '@/context/app-context';

const Dashboard = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { signOut } = useAppContext();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const {
    data: users,
    refetch,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.users.getAll.call<User[]>(),
    enabled: false,
    initialData: [],
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) =>
      api.users.update.call({
        params: { id: updatedUser.uid },
        data: updatedUser,
      }),
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const handlePress = () => {
    refetch();
  };

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setEmail(user.email);
    setName(user.name || '');
    setAge(user.age ? String(user.age) : '');
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      updateUserMutation.mutate({
        ...selectedUser,
        email,
        name,
        age: Number(age),
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={600} mx="auto">
      <Typography variant="h4" fontWeight="bold">
        Hello {currentUser?.email}!
      </Typography>

      <Button variant="contained" color="primary" onClick={handlePress}>
        Get All Users
      </Button>

      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="center"
      >
        {isLoading || isFetching ? (
          <CircularProgress />
        ) : (
          <>
            {error ? (
              <Alert severity="error">Error fetching user data</Alert>
            ) : (
              <Box display="flex" flexDirection="column" gap={2} flex={1}>
                {users.map((acc) => (
                  <Card key={acc.uid} variant="outlined">
                    <CardContent className="flex flex-row">
                      <Box className="flex w-full flex-col">
                        {Object.entries(acc).map(([key, value]) => (
                          <Typography
                            key={key}
                            variant="body2"
                            color="textSecondary"
                          >
                            <strong>{key}:</strong> {value}
                          </Typography>
                        ))}
                      </Box>

                      <Button onClick={() => handleOpenDialog(acc)}>
                        <ModeEditIcon />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
      <Button onClick={signOut}>Sign Out</Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent className="">
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Age"
            fullWidth
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleUpdateUser}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
