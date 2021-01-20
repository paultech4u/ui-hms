import React from 'react';
// import PropTypes from 'prop-types';
import {
  Box,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
} from '@material-ui/core';

function ProfilePictureUploadMenu(props) {
  const { open, anchorRef, handleMenuClose } = props;
  const FileSelector = React.useRef(null);

  const handleFileChange = (e) => {
    const uploadedPic = e.target.files[0];
    console.log(uploadedPic);
  };

  const handleUploadPicClick = (event) => {
    FileSelector.current.click();
  };

  return (
    <Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement='bottom-start'
        style={{ top: "20px"}}
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'right bottom' : 'right top',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList autoFocusItem={open} id='upload-menu'>
                  <MenuItem onClick={handleUploadPicClick}>
                    Upload photo
                  </MenuItem>
                  <input
                    type='file'
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={FileSelector}
                  />
                  <MenuItem>Remove photo</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

export default ProfilePictureUploadMenu;
