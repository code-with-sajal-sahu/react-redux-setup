import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import UserLayout from "../layout/Layout";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../redux/user/userSlice';
import {useNavigate} from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function AddEditTask() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: {
      task: "",
      description: "",
      priority: "",
      duration: "",
    }, 
    onSubmit: handleCreateTask
  });
  function handleCreateTask(values){
    dispatch(addTask(values));
    navigate("/")
  };

  return (
    <UserLayout
    >
      {/* <TemplateFrame> */}
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            {/* <SitemarkIcon /> */}
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Create Task
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="task">Task</FormLabel>
                <TextField
                  name="task"
                  required
                  fullWidth
                  id="task"
                  placeholder="Task"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="description"
                  placeholder="Description"
                  name="description"
                  variant="outlined"
                  multiline
                  rows={3}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="duration">Duration</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="duration"
                  type="number"
                  id="duration"
                  variant="outlined"
                  slotProps={{
                    htmlInput: {min: 0, max: 8}
                  }}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{backgroundColor: "#000"}}
              >
                Create Task
              </Button>
            </Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
      {/* </TemplateFrame> */}
    </UserLayout>
  );
}