import CircularProgress from '@mui/material/CircularProgress';
const Loader = ({msg}) => {
    return <div className={"main_loader"}>
        <p>{msg}...</p>
        <CircularProgress disableShrink />
    </div>
}

export default Loader;