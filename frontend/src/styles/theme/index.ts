import { extendTheme } from '@mui/material';

const theme = extendTheme({
    typography: {
        allVariants: {
            color: '#212121',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '##3B8EDE',
                    '&:hover': {
                        backgroundColor: '#3B8EDE', // Darker shade on hover
                    },
                    textTransform: 'none'
                },
            },
        },
    },
});

export { theme }