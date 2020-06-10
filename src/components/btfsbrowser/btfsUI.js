import React from 'react'
import Files from 'react-files'
import TronLinkInfo from "../TronLinkInfo";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '90%',
  },
  container: {
    maxHeight: 640,
  },
});

function onFilesChange(files) {
    console.log(files)
  }

function onFilesError(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  }

export default function BtfsUI(){
  const classes = useStyles();
    return (
    <Paper className={classes.root}>
      <div className="files">
      <TronLinkInfo />
        <Files
          className='files-dropzone'
          onChange={onFilesChange}
          onError={onFilesError}
          accepts={['image/png', '.pdf', 'audio/*']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    </Paper>
    )
  }
