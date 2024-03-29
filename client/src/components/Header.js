import {React,useState,useRef} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton,Modal,Box,Avatar } from '@material-ui/core';
import {PermMedia,Cancel} from '@material-ui/icons';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {googleLogout} from '@react-oauth/google';
import './Header.css'; 
import instance from './axios';


function Header({user}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const name = useRef();
  const [file,setFile] = useState(null);

	const handleOnclick= async(e)=>{
        e.preventDefault();
		const newPost = {
			userId: user._id,
            name:name.current.value
		}
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName;
			try {
			  await instance.post("/upload", data);
			} catch (err) {
        console.log(err);
      }
		  }
		try{
        const res = await instance.post("/cards",newPost);
        console.log(res.data);
		   window.location.reload();
		}catch(err){
			console.log(err);
		}
	}

  const onSignoutSuccess = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
    alert("You have been logged out successfully");
    // console.clear();  
};

  return (
    <>
    <div className='header'>
    <IconButton>
    <div class="dropdown">
          <span>{user?<Avatar alt="PP" src={user.profilePicture} />:<PersonIcon  fontSize='large' className='header_icon'/>}</span>
          <div class="dropdown-content">
            <button onClick={onSignoutSuccess}>Log Out</button>
         </div>
     </div>
    </IconButton>
    <img
       className='header_logo'
       src = 'data:image/jpeg;base64,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'
       alt='tinder logo'
    />
    <IconButton>
        <AddAPhotoIcon  fontSize='large' className='header_icon'onClick={handleOpen} />
    </IconButton>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box className='modal-box'>
        <div className='share'>
		        <div className="shareWrapper">
          <div className="shareTop">
            <img className='shareProfileImg' src={user.profilePicture} alt="" />
            <input placeholder={`Your name..?`} className="shareInput" ref={name}/>
			    </div>
          <hr className='shareHr' />
          {file && (
            <div className='shareImgContainer'>
              <img className='shareImg' src={URL.createObjectURL(file)} alt=""/>
              <Cancel className='shareCancelImg' onClick={()=>{setFile(null)}}/>
            </div>
			     )}
          <form className="shareBottom" onSubmit={handleOnclick}>
              <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                  <PermMedia htmlColor='tomato' className='shareIcon' />
                  <span className='shareOptionText' >Upload Photo</span>
                  <input hidden type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                </label>
              </div>
              <button className='shareButton' type='submit'>Create Card</button>
			     </form>
          </div>
        </div>
        </Box>
      </Modal>
     
    </>
  )
}

export default Header