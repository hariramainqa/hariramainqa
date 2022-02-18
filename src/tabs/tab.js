import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = props => makeStyles((theme) => ({
    root: {},
    tab: {
        // backgroundColor: 'primary',
        backgroundColor: props.tabBackgroundColor ?? 'primary',
        color: props.tabColor ?? 'primary',
        "&.Mui-selected": {
            backgroundColor: props.selectedTabBackgroundColor ?? 'primary',
            color: props.selectedTabColor ?? 'primary',
        }
    }
}));

export const Tabcomponent = (props) => {
    const classes = useStyles(props)();

    const { value, onChange,
        headerData,
        bodyData,
        indicatorColor,
        selectedTabBackgroundColor,
        tabBackgroundColor,
        tabColor,
        selectedTabColor
    } = props;

    const [isActive, setisActive] = React.useState(value);

    React.useEffect(() => {
        setisActive(value)
    }, [value])

    const handleChange = (newValue) => {
        onChange(newValue);
    };

    return <div>
        <Tabs {...props}
            TabIndicatorProps={{ style: { background: indicatorColor ?? 'primary' } }}
            classes={{ root: classes.root }}
            value={isActive}
            onChange={(e, v) => handleChange(v)}
        >
            {headerData?.map((v, i) => {
                return <Tab
                    {...v}
                    {...a11yProps(i)}
                    classes={{ root: classes.tab }}
                    label={v?.header} disabled={v?.disabled}
                    selected={v?.selected}
                    fullWidth={v?.fullWidth}
                />
            })}
        </Tabs>

        {bodyData?.map((v, i) => {
            return <TabPanel {...v} value={isActive} index={i}
                children={v?.children}
            >
                {v?.body}
            </TabPanel>
        })}
    </div>
};