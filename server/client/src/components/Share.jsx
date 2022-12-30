import {React,useContext,useRef,useState} from 'react'
import Media from '@mui/icons-material/PermMedia';
import Tag from '@mui/icons-material/Label';
import Location from '@mui/icons-material/Room';
import Feelings from '@mui/icons-material/EmojiEmotions';
import Cancel from '@mui/icons-material/Cancel';
import './Share.css';



const Share = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const desc = useRef();
    const [file,setFile] = useState(null);

	const handleOnclick= async(e)=>{
        e.preventDefault();
		const newPost = {
			userId: user._id,
            desc:desc.current.value
		}
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName;
			console.log(newPost);
			try {
			  await axios.post("/upload", data);
			} catch (err) {}
		  }
		try{
           await axios.post("/posts",newPost)
		   window.location.reload();
		}catch(err){
			console.log(err);
		}
	}

  return (
	<div className='share'>
		<div className="shareWrapper">
			<div className="shareTop">
				<img className='shareProfileImg' src={user.profilePicture?PF+user.profilePicture : PF+"person/noAvtar.png"} alt="" />
				<input placeholder={`What's in your mind ${user.username}..?`} className="shareInput" ref={desc}/>
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
						<Media htmlColor='tomato' className='shareIcon' />
						<span className='shareOptionText'>Photo or Video</span>
						<input hidden type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
					</label>
					<div className="shareOption">
						<Tag htmlColor='blue' className='shareIcon' />
						<span className='shareOptionText'>Tag</span>
					</div>
					<div className="shareOption">
						<Location htmlColor='green' className='shareIcon' />
						<span className='shareOptionText'>Location</span>
					</div>
					<div className="shareOption">
						<Feelings htmlColor='goldenrod' className='shareIcon' />
						<span className='shareOptionText'>Feelings</span>
					</div>
				</div>
				<button className='shareButton' type='submit'>Share</button>
			</form>
		</div>
	</div>
  )
}

export default Share