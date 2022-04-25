            import * as React from 'react';          
            import AdapterDateFns from '@mui/lab/AdapterDateFns';
            import LocalizationProvider from '@mui/lab/LocalizationProvider';
            import {Button} from '@mui/material';
            import Stack from '@mui/material/Stack';
            import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
            import DateRangeIcon from '@mui/icons-material/DateRange';
            const DateRangePicker = ({onChange}) => {
              const [value, setValue] = React.useState([null, null]);
              const getMmddyyyy = (date) => {
                let newDate = new Date(date);
        
                let dd = new Date(date).getDate().toString().padStart(2, "0")
                let mm = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
                let yyyy = new Date(date).getFullYear();
        
                return `${mm + "/" + dd + "/" + yyyy}`;
            }
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack sx={{flexDirection:'row'}}>
                    <p style={{ marginBottom:0, marginTop:"8px"}}>{value[0] && value[1] ? (getMmddyyyy(value[0]) + " - " + (getMmddyyyy(value[1]))): (getMmddyyyy(new Date()) + " - " + getMmddyyyy(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+14)))}</p>
                    <MobileDateRangePicker
                      sx={{ flexDiration:'row', mt:0 }}
                      startText="Start Date"
                      endText="End Date"
                     value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        onChange(newValue)
                      }}
                      disableCloseOnSelect={false}
                      renderInput={(startProps, endProps) => {
                        console.log(startProps, value)
                        return (
                          <React.Fragment sx={{mt:0}}>
                            <Button size='small' onClick={startProps.inputProps.onClick}>
                              <DateRangeIcon/>
                            </Button>
                          </React.Fragment>
                        )
                      }}
                    />

                  </Stack>
                </LocalizationProvider>
              );
            }

            export default DateRangePicker;