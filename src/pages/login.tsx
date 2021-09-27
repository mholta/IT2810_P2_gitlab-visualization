import {
  Box,
  Container,
  CssBaseline,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

// type loginProps = {
//   message?: string;
// } & RouteComponentProps;

// const Login: FunctionComponent<loginProps> = ({ message }) => {
const Login = () => {
  const history = useHistory();
  const location: any = useLocation();
  console.log(location.state);
  const [remember, setRemember] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    const projectId = data.get('projectId')?.toString();
    const token = data.get('token')?.toString();
    console.log(projectId);
    if (remember && projectId && token) {
      localStorage.setItem('projectId', projectId);
      localStorage.setItem('token', token);
      history.replace('/');
    } else if (!remember && projectId && token) {
      sessionStorage.setItem('projectId', projectId);
      sessionStorage.setItem('token', token);
      history.replace('/');
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {location.state !== undefined && (
          <Typography component="h1" color="secondary" variant="h5">
            {location.state}
          </Typography>
        )}
        <Typography component="h1" variant="h5">
          Visualize GitLab data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="projectId"
            label="Project ID to GitLab-repo"
            name="projectId"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="token"
            label="Access-token"
            id="token"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // sx={{ mt: 3, mb: 2 }}
          >
            Use this repo
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
