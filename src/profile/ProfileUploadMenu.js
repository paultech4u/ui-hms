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
import { useIsMobile } from "../hooks"

function ProfilePictureUploadMenu(props) {
  const isMobile = useIsMobile()
  const FileSelector = React.useRef(null);
  const { open, anchorRef, handleMenuClose } = props;

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
        transition
        disablePortal
        role={undefined}
        style={{ top: '20px' }}
        placement={isMobile ? 'right-start' : 'bottom-end'}
        anchorEl={anchorRef.current}>
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
                    ref={FileSelector}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
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
