import React,{ useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
toast.configure()
  
function About() {
    const [mostReadBlogs, setMostReadBlogs] = useState([]);
    const [featuredblogs, setfeaturedblogs] = useState([]); 
    const [loading,setloading] =useState(false);
    function splitDate(x)
  {
        let y = x.split('T');
        return y[0]; 
  }
  function mostRead()
    {
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmostreadblogs`).then(blogs => {
            setMostReadBlogs(blogs.data.tag);
            setloading(false);
          }).catch(err => {
            toast.error('No Most read blogs Found');
          });
    }
    function featuredBlogs()
    {
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`).then(blogs => {
            setfeaturedblogs(blogs.data.tag)
            setloading(false);
          }).catch(err => {
            toast.error('No featured blogsFound');
            setloading(false);
        });
    }
      useEffect(()=> {
        setloading(true);
        mostRead()
        featuredBlogs()
        window.scrollTo(0, 0);

      },[]);
    return (
        <div className="section">
        {loading?<div class="loading"></div>:''} 
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="section-row">
                        <h3>About Us</h3>
                        <p>Lorem ipsum dolor sit amet, ea eos tibique expetendis, tollit viderer ne nam. No ponderum accommodare eam, purto nominavi cum ea, sit no dolores tractatos. Scripta principes quaerendum ex has, ea mei omnes eruditi. Nec ex nulla mandamus, quot omnesque mel et. Amet habemus ancillae id eum, justo dignissim mei ea, vix ei tantas aliquid. Cu laudem impetus conclusionemque nec, velit erant persius te mel. Ut eum verterem perpetua scribentur.</p>
                        <figure className="figure-img">
                            <img className="img-responsive" src="./img/about-1.jpg" alt="" />
                        </figure>
                        <p>Vix mollis admodum ei, vis legimus voluptatum ut, vis reprimique efficiendi sadipscing ut. Eam ex animal assueverit consectetuer, et nominati maluisset repudiare nec. Rebum aperiam vis ne, ex summo aliquando dissentiunt vim. Quo ut cibo docendi. Suscipit indoctum ne quo, ne solet offendit hendrerit nec. Case malorum evertitur ei vel.</p>
                    </div>
                    <div className="row section-row">
                        <div className="col-md-6">
                            <figure className="figure-img">
                                <img className="img-responsive" src="./img/about-2.jpg" alt="" />
                            </figure>
                        </div>
                        <div className="col-md-6">
                            <h3>Our Mission</h3>
                            <p>Id usu mutat debet tempor, fugit omnesque posidonium nec ei. An assum labitur ocurreret qui, eam aliquid ornatus tibique ut.</p>
                            <ul className="list-style">
                                <li><p>Vix mollis admodum ei, vis legimus voluptatum ut.</p></li>
                                <li><p>Cu cum alia vide malis. Vel aliquid facilis adolescens.</p></li>
                                <li><p>Laudem rationibus vim id. Te per illum ornatus.</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Most Read</h2>
                        </div>
                        {
                            mostReadBlogs.length!=0 ?
                            mostReadBlogs.map( (mostReadBlog,index) => {
                              return (
                                <>
                                    {
                                        index<5?                                       
                                        <div className="post post-widget">
                                        <Link className="post-img" to={`/post/${mostReadBlog.id}`}><img src={mostReadBlog.image} alt="" style={{"height":"90px"}}/></Link>
                                        <div className="post-body">
                                            <h3 className="post-title"><Link to={`/post/${mostReadBlog.id}`}>{mostReadBlog.title}</Link></h3>
                                        </div>
                                        </div>:''
                                    }

    
                                </>
                                )
                              }):''
                        }
                      
                    </div>
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Featured Posts</h2>
                        </div>
                        {
                            featuredblogs.length!=0 ? featuredblogs.map( (featuredblog,index) => {
                                return (
                                  <>
                                  {
                                      index<5?
                                      <div className="post post-thumb">
                                      <Link className="post-img" to={`/post/${featuredblog.id}`}><img src={featuredblog.image} alt="" style={{"height":"176px"}}/></Link>
                                      <div className="post-body">
                                          <div className="post-meta">
                                              <Link className="post-category cat-3" to={`/post/${featuredblog.id}`}>{featuredblog.tag}</Link>
                                              <span className="post-date">{splitDate(featuredblog.updatedAt)}</span>
                                          </div>
                                          <h3 className="post-title"><Link to={`/post/${featuredblog.id}`}>{featuredblog.title}</Link></h3>
                                      </div>
                                  </div>:''
                                  }

                                  </>
                                )
                                }):''
                        }
                   </div>
                    {/*<div className="aside-widget">
                        <div className="section-title">
                            <h2>Catagories</h2>
                        </div>
                        <div className="category-widget">
                            <ul>
                                <li><a href="#" className="cat-1">Web Design<span>340</span></a></li>
                                <li><a href="#" className="cat-2">JavaScript<span>74</span></a></li>
                                <li><a href="#" className="cat-4">JQuery<span>41</span></a></li>
                                <li><a href="#" className="cat-3">CSS<span>35</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside-widget">
                        <div className="tags-widget">
                            <ul>
                                <li><a href="#">Chrome</a></li>
                                <li><a href="#">CSS</a></li>
                                <li><a href="#">Tutorial</a></li>
                                <li><a href="#">Backend</a></li>
                                <li><a href="#">JQuery</a></li>
                                <li><a href="#">Design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">JavaScript</a></li>
                                <li><a href="#">Website</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Archive</h2>
                        </div>
                        <div className="archive-widget">
                            <ul>
                                <li><a href="#">January 2018</a></li>
                                <li><a href="#">Febuary 2018</a></li>
                                <li><a href="#">March 2018</a></li>
                            </ul>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    </div>
    )
}

export default About;