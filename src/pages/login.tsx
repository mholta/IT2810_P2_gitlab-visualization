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
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { FilterContext } from '../context/filter.context';
import { DataCategory, ListOrGraph } from '../context/filter.initialValue';
import { getDateBeforeToday } from '../utils/date';

/**
 * Login page. User submits ProjectID and Access Token to display data from their GitLab project.
 */
const Login = () => {
  const history = useHistory();
  const {
    state: { users, category },
    reset
  } = useContext(FilterContext);
  console.log(users, category);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('projectID');
    localStorage.removeItem('anonymize');
    localStorage.removeItem('category-state');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('projectID');
    sessionStorage.removeItem('anonymize');
    sessionStorage.removeItem('time-span-state');
    reset();
    console.log('login', users, category);
  }, []);
  const location: any = useLocation();
  const [remember, setRemember] = useState(false);
  const [anonymize, setAnonymize] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    const projectId = data.get('projectId')?.toString();
    const token = data.get('token')?.toString();

    // Store project information in browser storage
    if (remember && projectId && token) {
      localStorage.setItem('projectID', projectId);
      localStorage.setItem('token', token);
      localStorage.setItem('anonymize', anonymize.toString());
      history.replace('/');
    } else if (!remember && projectId && token) {
      sessionStorage.setItem('projectID', projectId);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('anonymize', anonymize.toString());
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
          <FormControlLabel
            control={
              <Checkbox
                value="anonymize"
                color="primary"
                id="anonymize"
                checked={anonymize}
                onChange={() => setAnonymize(!anonymize)}
              />
            }
            label="Anonymize userdata"
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
