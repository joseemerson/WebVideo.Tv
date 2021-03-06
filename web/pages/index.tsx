import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { Homecontext } from '../context/Homecontext';
import styles from '../styles/Home.module.css'
import  {PauseCircleOutlineTwoTone, PlayArrow, PlayArrowTwoTone,VolumeUp,VolumeUpTwoTone} from '@material-ui/icons'; 
import videos from '../DATA/videos';
import { converter } from '../utils/converte';
export default function Home() {
  const {
    videourl,
    videoRef,
    canvasRef,
    isPlaying,
    playpause,
    volume,
    currenttime,
    temptotal,
    configtemp,
    configVideo,
    configVolume,
    isMute,
    ConfigMute
  } = useContext(Homecontext);
  return (
    <div className={styles.main}>
      <div className ={styles.video}>
      <video src={`videos1/${videourl}`}controls ref = {videoRef} hidden >
      </video>
      <canvas className ={styles.canvas} 
       ref = {canvasRef}
      width = "720" height = "400">
      </canvas>
      <div className = {styles.controls}> 
      <div className = {styles.time}>
          <input 
          type="range" 
          min = "0"
          max = {temptotal}
          value = {currenttime}
          onChange ={(e) => configtemp(Number(e.target.value))}
          />
        </div>
        <div className = {styles.paineldecontrol}>                                  
      <button className = {styles.playbutton} onClick = {playpause} >
        {isPlaying ?
        (<PauseCircleOutlineTwoTone className = {styles.playIcon}/>):
       (<PlayArrowTwoTone className = {styles.playIcon}/>)
        } 
      </button>
      <div className = {styles.convert}>
          {
          converter(currenttime)
         }
          </div>
        <div className={styles.volumeMutebel}>
                {
                  isMute ?
                  (<VolumeUp className={styles.play} onClick={ConfigMute}></VolumeUp>)
                  :
                  (<VolumeUpTwoTone className={styles.play} onClick={ConfigMute}></VolumeUpTwoTone>)
                  
                }
      <input type="range" 
      min = "0"
      max = "1"
      step = "0.01"
     value={volume}
     onChange ={(e)=> configVolume(Number(e.target.value))}
      />
      </div>
      <div className = {styles.convert}>
        {
      converter(temptotal)
        }
      </div>
      </div> 
      </div>
      </div>
      <div className = {styles.Listadevideos}>
        {
          videos.map((videos,idx) => {
               return (
                 <div 
                 className = {styles.filmevideoItem}
                  onClick= {(e) => configVideo(idx)}
                 >
                   <img src={`capas/${videos.capa}`}alt ={videos.title} />
                   <h1>{videos.title}</h1>
                 </div>
               )
          })
        }
      </div>
    </div>
  )
}
