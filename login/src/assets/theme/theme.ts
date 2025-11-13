import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8B5FBF',
            light: '#B39DDB',
            dark: '#6A1B9A',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#CE93D8',
            light: '#E1BEE7',
            dark: '#AB47BC',
            contrastText: '#000000',
        },
        background: {
            default: '#F3E5F5',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#4A148C',
            secondary: '#7B1FA2',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            color: '#4A148C',
        },
        h2: {
            color: '#4A148C',
        },
        h3: {
            color: '#4A148C',
        },
        h4: {
            color: '#4A148C',
        },
        h5: {
            color: '#4A148C',
        },
        h6: {
            color: '#4A148C',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
                contained: {
                    background: 'linear-gradient(45deg, #8B5FBF 30%, #AB47BC 90%)',
                    boxShadow: '0 3px 5px 2px rgba(139, 95, 191, .3)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #7B4FAB 30%, #9C37AD 90%)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(145deg, #FFFFFF 0%, #F3E5F5 100%)',
                    border: '1px solid #E1BEE7',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#CE93D8',
                        },
                        '&:hover fieldset': {
                            borderColor: '#8B5FBF',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6A1B9A',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#7B1FA2',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6A1B9A',
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                standardSuccess: {
                    backgroundColor: '#E8F5E9',
                    color: '#2E7D32',
                    border: '1px solid #C8E6C9',
                },
                standardError: {
                    backgroundColor: '#FFEBEE',
                    color: '#C62828',
                    border: '1px solid #FFCDD2',
                },
            },
        },
    },
});

export default theme;