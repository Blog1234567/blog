import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Header from './header';
import parse from "html-react-parser";

toast.configure()
function SectionOne () {

  const [mostReadBlogs, setMostReadBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [featuredblogs, setfeaturedblogs] = useState([]);  
  const [loading,setloading] =useState(false);
  const history = useHistory();
  function richtextToplaintext(str)
  {
    var plainString = str.replace(/<[^>]+>/g, '');
    return plainString;
  }
  function splitDate(x)
  {
      let y = x.split('T');
      return y[0];
  }
  function componentDidMount()
    {
      Axios.get(`${process.env.React_App_Api_Url}/api/blog/getAllblogs?page_no=0`).then(blogs => {
        console.log('All blogs',blogs);
        setRecentBlogs(blogs.data.blogs);
        setloading(false);
      }).catch(err => {
        setloading(false);
        toast.error('No Blogs Found');
      });
      Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmostreadblogs`).then(blogs => {
        console.log('most read',blogs);
        setMostReadBlogs(blogs.data.tag);
        setloading(false);
      }).catch(err => {
        toast.error('No Most read blogs Found');
        setloading(false);
      });
      Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`).then(blogs => {
        console.log('featured blogs',blogs);
        setfeaturedblogs(blogs.data.tag)
        setloading(false);
        // this.featuredblogs = blogs.data.tag;
      }).catch(err => {
        setloading(false);
        toast.error('No featured blogsFound');
      });
    }
    function allBlogsPage()
    {
      history.replace("/allblog");
    }
    useEffect(() => {
      setloading(true);
      componentDidMount();
      window.scrollTo(0, 0);
    }, [])
  
    return (
   <>
    <div style={{"height":"360px","width":"100%"}}>
        <div className="parent">
        <img src="./img/blog-banner.png" alt="" className="image1" style={{"height":"360px","width":"100%"}}/>
        {/*<img src="./img/logo_1.png" alt="" className="image2" style={{"width":"30%"}}/>*/}
          </div>
    </div>
    <Header ></Header>
    <div className="section" >
   {loading?<div class="loading"></div>:''} 
     <div className="container">   
       <div className="row">
       <div className="col-md-6">
       {
          recentBlogs?recentBlogs.length!=0?
          <div className="post post-thumb">
          <Link className="post-img" to={`/post/${recentBlogs[0].id}`}><img src={recentBlogs[0].image} alt="" style={{"height":"273px"}}/></Link>
          <div className="post-body">
          <div className="post-meta">
              <Link className="post-category cat-3" to={`/post/${recentBlogs[0].id}`}>{recentBlogs[0].tag}</Link>
              <span className="post-date">{splitDate(recentBlogs[0].updatedAt)}</span>
              <span className="post-date" style={{textTransform:"uppercase"}}>&nbsp;&nbsp;{recentBlogs[0].User?recentBlogs[0].User.firstName:''}</span>
          </div>
          <h3 className="post-title"><Link to={`/post/${recentBlogs[0].id}`}>{recentBlogs[0].title}</Link></h3>
          </div>
        </div>:'':''
       }

        </div>
       <div className="col-md-6">
       {
        recentBlogs?recentBlogs.length>1?         
           <div className="post post-thumb">
           <Link className="post-img" to={`/post/${recentBlogs[1].id}`}><img src={recentBlogs[1].image} alt="" style={{"height":"273px"}}/></Link>
           <div className="post-body">
           <div className="post-meta">
               <Link className="post-category cat-3" to={`/post/${recentBlogs[1].id}`}>{recentBlogs[1].tag}</Link>
               <span className="post-date">{splitDate(recentBlogs[1].updatedAt)}</span>
               <span className="post-date" style={{textTransform:"uppercase"}}>&nbsp;&nbsp;{recentBlogs[1].User?recentBlogs[1].User.firstName:''}</span>
               </div>
           <h3 className="post-title"><Link to={`/post/${recentBlogs[1].id}`}>{recentBlogs[1].title}</Link></h3>
           </div>
         </div>:'':''
       }

        </div>
  
         <div className="col-md-12">
           <div className="section-title">
             <h2>Recent Posts</h2>
           </div>
         </div>
           { recentBlogs?recentBlogs.length!==0 ? 
            recentBlogs.map( (recentblog,index) =>{
              return(
                <>
                {
                  index>=2&&index<8?
                  <div className="col-md-4">
                  <div className="post">     
                  <Link className="post-img" to={`/post/${recentblog.id}`}><img src={recentblog.image} alt="" style={{"height":"176px"}}/></Link>
                    <div className="post-body">
                    <div className="post-meta">
                    {
                      (index+1)%4===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-1">{recentblog.tag}</Link> : 
                      (index+1)%3===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-2">{recentblog.tag}</Link>: 
                      (index+1)%2===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-3">{recentblog.tag}</Link>: 
                      (index)%2===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-4">{recentblog.tag}</Link>:''
                    }
                      <span className="post-date">{splitDate(recentblog.updatedAt)}</span>
                      <span className="post-date" style={{textTransform:"uppercase"}}>&nbsp;&nbsp;{recentblog.User?recentblog.User.firstName:''}</span>
                      </div>
                      <h3 className="post-title" ><Link to={`/post/${recentblog.id}`}>{recentblog.title.substring(0, 30)}...</Link></h3>
                            <p className="post-text">{richtextToplaintext(recentblog.text).substring(0, 100)}.....<Link to={`/post/${recentblog.id}`}>Read More</Link></p>
          </div>
                    </div>
                    </div>:''
                }         
                </>
              )

            }):'':''
          }
        
       </div>
       <div className="row">
         <div className="col-md-8">
           <div className="row">
           {
            recentBlogs?recentBlogs.length>8?
             <div className="col-md-12">
               <div className="post post-thumb">
                 <Link className="post-img" to={`/post/${recentBlogs[8].id}`}><img src={recentBlogs[8].image} alt="" /></Link>
                 <div className="post-body">
                   <div className="post-meta">
                     <Link className="post-category cat-3" to={`/post/${recentBlogs[8].id}`}>{recentBlogs[8].tag}</Link>
                     <span className="post-date">{splitDate(recentBlogs[6].updatedAt)}</span>
                     <span className="post-date" style={{textTransform:"uppercase"}}>&nbsp;&nbsp;{recentBlogs[8].User?recentBlogs[8].User.firstName:''}</span>
                     </div>
                   <h3 className="post-title"><Link to={`/post/${recentBlogs[8].id}`}>{recentBlogs[8].title}</Link></h3>
                 </div>
               </div>
             </div>:'':''
           }
            {
              recentBlogs?recentBlogs.length>9 ?
              recentBlogs.map( (recentblog,index)=>{
                  return(
                    <>
                      {
                        index>8 && index<15?
                        <>
                        <div className="col-md-6">
                        <div className="post">
                          <Link className="post-img" to={`/post/${recentblog.id}`}><img src={recentblog.image} alt="" style={{"height":"176px"}}/></Link>
                          <div className="post-body">
                            <div className="post-meta">
                            {
                              (index+1)%4===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-1">{recentblog.tag}</Link> : 
                              (index+1)%3===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-2">{recentblog.tag}</Link>: 
                              (index+1)%2===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-3">{recentblog.tag}</Link>: 
                              (index)%2===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-4">{recentblog.tag}</Link>:''
                            }
                              <span className="post-date">{splitDate(recentblog.updatedAt)}</span>
                              <span className="post-date" style={{textTransform:"uppercase"}}>&nbsp;&nbsp;{recentblog.User?recentblog.User.firstName:''}</span>
                              </div>
                              <h3 className="post-title" ><Link to={`/post/${recentblog.id}`}>{recentblog.title.substring(0, 30)}...</Link></h3>
                            <p className="post-text">{richtextToplaintext(recentblog.text).substring(0, 100)}.....<Link to={`/post/${recentblog.id}`}>Read More</Link></p>
                </div>
                        </div>
                      </div>   
                      </>
                      :''         
                      }
                    </>
                  )
                }
              ):'':''
            }

            <div className="col-md-12">
            <div className="section-row">
              <button className="primary-button center-block" onClick={(e)=>{allBlogsPage(e)}}>
                Load More
              </button>
            </div>
          </div>

          
           </div>
         </div>

         <div className="col-md-4">
           <div className="aside-widget">
             <div className="section-title">
               <h2>Most Read</h2>
             </div>
              {  mostReadBlogs.length!=0 ?
                mostReadBlogs.map( (mostReadBlog,index) =>{
                    return(
                      <>
                      {
                        index < 4 ?
                        <div className="post post-widget">
                        <Link className="post-img" to={`/post/${mostReadBlog.id}`}><img src={mostReadBlog.image} alt="" style={{"height":"90px"}}/></Link>
                        <div className="post-body">
                          <h3 className="post-title"><Link to={`/post/${mostReadBlog.id}`}>{mostReadBlog.title}</Link></h3>
                        </div>
                      </div> : ''
                      }

                      </>
                    )
                }):'No Most Read Blogs Found.'}
          </div>
           <div className="aside-widget">
             <div className="section-title">
               <h2>Featured Posts</h2>
             </div>
             { featuredblogs.length!=0 ? 
                  featuredblogs.map((featuredblog,index)=>{
                    return(
                      <>
                      {
                        index<2 ?
                      <div className="post post-thumb">
                      <Link className="post-img" to={`/post/${featuredblog.id}`}><img src={featuredblog.image} alt="" style={{"height":"176px"}}/></Link>
                        <div className="post-body">
                          <div className="post-meta">
                            <a className="post-category cat-3" to="category.html">{featuredblog.tag}</a>
                            <span className="post-date">{splitDate(featuredblog.updatedAt)}</span>
                          </div>
                          <h3 className="post-title"><Link to={`/post/${featuredblog.id}`}>{featuredblog.title}</Link></h3>
                        </div>    
                      </div>:''}
                      </>
                    )
                  })
                :'No Featured Posts.'

            }
           </div>
           {/*<div className="aside-widget text-center">
             <a to="#" style={ {display: "inline-block",margin: "auto"}}>
               <img className="img-responsive" src="./img/ad-1.jpg" alt="" />
             </a>
          </div>*/}
         </div>
       </div>
     </div>
   </div>
   </>
    )
}
export default SectionOne