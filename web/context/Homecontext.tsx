import { Children, createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import videos from "../DATA/videos";
type HomecontextDate ={
 videourl: string;
 videoRef: MutableRefObject<HTMLVideoElement>;
 canvasRef:MutableRefObject<HTMLCanvasElement>;
 playpause: () => void;
 volume: number;
 isPlaying: boolean;
 currenttime: number;
 temptotal: number;
 configtemp: (time: number) => void;
 configVideo:(videoidx: number) =>void;
 configVolume:(volume:number) => void;
}
type Homecontextproviderprops ={
    children: ReactNode;
}

export const Homecontext = createContext ({}as HomecontextDate);

const Homecontextprovider = ({children}:Homecontextproviderprops) => {
    const [videourl,setvideourl] = useState ("");
    const [isPlaying,setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currenttime,setcurrenttime]= useState(0);
    const [temptotal,settemptotal] = useState(0);
    const [videoIdx,setvideoIdx] = useState (1);
    const [volume,setvolume] =  useState(1);
    useEffect(()=> {
        configVideo(videoIdx);
    })
    useEffect(()=> {
     if(videourl && videourl.length > 0){
         const video = videoRef.current;
         video.onloadedmetadata = () => {
             settemptotal(video.duration);
         }
         video.ontimeupdate = () => {
             setcurrenttime(video.currentTime);
             if(isPlaying){
                 video.play();
                 draw();
             }
             else {
                 video.pause();
                 draw();
             }
         }
         video.onended = () => {
             configVideo(videoIdx+1);
         }
     }
    },[videourl,currenttime]);
    const configVideo = (idx:number) => {
        const nextidx = idx%videos.length;
        const nextvideourl = videos[nextidx].video;
        setvideoIdx(nextidx);
        setvideourl(nextvideourl);
    }
    const configtemp = (time: number) => {
        const videos= videoRef.current;
        setcurrenttime(time);
        videos.currentTime = time;
    }
    const configVolume = (volume: number) =>{
       const video= videoRef.current;
       setvolume(volume);
       video.volume= volume;
    }
    const draw = () => {
        const video = videoRef.current;
        if(video.paused || video.ended) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(video,0,0,720,400);
        requestAnimationFrame(draw);
    }
    const playpause = () => {
        const video = videoRef.current;
        if(isPlaying){
          video.pause();
          draw();
        }
        else{
            video.play();
            draw();
        }
        setIsPlaying(!isPlaying);
    }
   return (
       <Homecontext.Provider value ={
           {
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
           configVolume
        
           }
       }>
           {children}
       </Homecontext.Provider>
   )
}

export default Homecontextprovider;