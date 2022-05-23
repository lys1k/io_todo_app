import React from 'react';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FilterAlt } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box } from '@mui/system';
import AccountButton from 'components/AccountButton';
import FilterButton from 'components/FilterButton';
import MenuButton from 'components/MenuButton';

const AuthorizedLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        padding: 20,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}
      >
        <MenuButton
          title="Lista"
          Icon={FormatListBulletedIcon}
          active={matchPath('/application/tasks/list', pathname) !== null}
          onClick={() => navigate('/application/tasks/list')}
        />
        <MenuButton title="Kalendarz" Icon={EventAvailableIcon} />
        <MenuButton
          title="Dodaj zadanie"
          Icon={AddTaskIcon}
          active={matchPath('/application/tasks/add', pathname) !== null}
          onClick={() => navigate('/application/tasks/add')}
        />
        <Box>
          <label>
            <h3>Filtrowanie zadań:</h3>
            <h6>Od:</h6>
            <input type="datetime-local" name="start_date" />
            <h6>Do:</h6>
            <input type="datetime-local" name="end_date" />
          </label>
          <h5>
            <FilterButton
              title="Filtruj"
              Icon={FilterAlt}
              active={
                matchPath('/application/tasks/filter}', pathname) !== null
              }
              onClick={() => navigate('/application/tasks/filter')}
            />
          </h5>
        </Box>
      </Box>

      <Box sx={{ flex: 1, padding: 50, maxWidth: 1000 }}>
        <Outlet />
      </Box>
      <Box sx={{ width: 100 }}>
        <AccountButton
          active={matchPath('/application/profile', pathname) !== null}
          onClick={() => navigate('/application/profile')}
        />
      </Box>
    </Box>
  );
};

export default AuthorizedLayout;
