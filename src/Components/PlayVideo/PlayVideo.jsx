import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'


const PlayVideo = () => {
    const {videoId}=useParams()
    const [apiData,setApiData]=useState(null)
    const [channelData,setChannelData]=useState(null)
    const [commentData,setCommentData]=useState([])
    const fetchVideoData=async ()=>{
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
    }
    const fetchOtherData=async()=>{
        const channelData_url=` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

        const comment_url=` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY} `
        await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
    }
    useEffect(()=>{
        fetchVideoData()
    },[videoId])
    useEffect(()=>{
        fetchOtherData(channelData)
    },[apiData])
    console.log({channelData})
  return (
    <div className="play-video">
        {/* <video src={video1} controls autoplay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"title"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"time"}</p>
            <div>
                <span><img src={like} alt="" />{value_converter(apiData?.statistics.likeCount)}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />share</span>
                <span><img src={save} alt="" />save</span>

            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?.snippet.thumbnails.default.url} alt="" />
            <div>
                <p>{apiData?.snippet.channelTitle}</p>
                <span>{value_converter(channelData?.statistics.subscriberCount)}</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <p>{apiData?.snippet.description.slice(0,250)}</p>
            
            <hr />
            <h4>{apiData?.statistics.commentCount} </h4>
            {commentData.map((item,index)=>{
                        return(
                            
            <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}  <span></span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                   
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                    </div>
                    
                </div>
            </div>
                        )
                    })}
                

        </div>
    </div>
  )
}

export default PlayVideo
