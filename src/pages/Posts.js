import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

toast.configure()

function Posts() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [tag, setTag] = useState('');
  const params = useParams();
  const [loading, setloading] = useState(false);
  function richtextToplaintext(str) {
    var plainString = str.replace(/<[^>]+>/g, '');
    return plainString;
  }
  // backend.learntohack.com.au
  function getBlogByCategory() {
    debugger
    var pages,tags;
    if(params.tag.toLowerCase()==tag)
    {
      pages = page+1
      setPage(pages);
    }
    else{
      pages = 0
      tags = params.tag.toLowerCase();
      setTag(tags);
      setPage(0);
    }
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getblogbycategory?tag=${params.tag.toLowerCase()}&page_no=${pages}`).then(blogs => {
      //  setPosts(blogs.data.resData);
      setPosts(prevPosts => [...prevPosts, ...blogs.data.resData])
      setloading(false);
    }).catch(err => {
      setloading(false);
      toast.error('No Blog category Found');
    });
  }
  function getAllBlogs() {
    setPage(page + 1);
    setloading(true);
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getAllblogs?page_no=${page}`).then(res => {
      // setPosts(blogs.data.blogs);
      if (params.search !== '' & params.search !== undefined & params.search !== null) {
        setPosts(res.data.blogs.filter((result) => {
          if (result.title.toLowerCase().includes(params.search)) {
            return result.title.toLowerCase().includes(params.search)
          }
          else {
            setPosts([]);
          }
        }))
        setloading(false);
      }
      else {
        setloading(false);
        // setPosts(prevPosts=>{
        //   return [...new Set([...prevPosts,...res.data.blogs.map( b =>b.id)])]
        // })
        // if(posts.length!==0)
        // {
        setPosts(prevPosts => [...prevPosts, ...res.data.blogs])
        // }
        // else{
        //   setPosts(res.data.blogs)
        // }
        debugger
        console.log(posts)
      }
    }).catch(err => {
      setloading(false);
      toast.error('No Blogs Found');
    });
  }
  function searchfunc() {
    setPosts(posts.filter((result) => {
      return result.title.toLowerCase().includes(params.search)
    }))
    setloading(false);

  }
  function splitDate(x) {
    let y = x.split('T');
    return y[0];
  }
  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);
    if(params.tag)
    {
      setTag(params.tag.toLowerCase());
    }
    else{
      setTag('');
    }
    //setPage(0);
    if (params.tag) {
   //   setPage(0);
      getBlogByCategory();
      setPosts([]);
    }
    else {
    //  setPage(0);
      getAllBlogs();
      setPosts([]);
    }
  }, [history.location.pathname])
  return (
    <>
      {loading ? <div class="loading"></div> : ''}
      <div className="section" style={{ "marginTop": "5%" }}>
        <div className="container">
          <div className="row">

            {posts.length != 0 ?
              posts.map((recentblog, index) => {
                return (
                  <>
                    {
                      <div className="col-md-4 ">
                        <div className="post" >
                          <Link className="post-img" to={`/post/${recentblog.id}`}><img src={recentblog.image} alt="" style={{ "height": "176px" }} /></Link>
                          <div className="post-body">
                            <div className="post-meta">
                              {
                                (index + 1) % 4 === 0 ? <Link to={`/post/${recentblog.id}`} className="post-category cat-1">{recentblog.tag}</Link> :
                                (index + 1) % 3 === 0 ? <Link to={`/post/${recentblog.id}`} className="post-category cat-2">{recentblog.tag}</Link> :
                                (index + 1) % 2 === 0 ? <Link to={`/post/${recentblog.id}`} className="post-category cat-3">{recentblog.tag}</Link> :
                                (index) % 2 === 0 ? <Link to={`/post/${recentblog.id}`} className="post-category cat-4">{recentblog.tag}</Link> : ''
                              }
                              <span className="post-date">{splitDate(recentblog.updatedAt)}</span>
                            </div>
                            <h3 className="post-title" ><Link to={`/post/${recentblog.id}`}>{recentblog.title.substring(0, 30)}...</Link></h3>
                            <p className="post-text">{richtextToplaintext(recentblog.text).substring(0, 100)}.....<Link to={`/post/${recentblog.id}`}>Read More</Link></p>
                          </div>
                        </div>
                      </div>
                    }
                  </>
                )

              }) : 'No blog found.'
            }
            <div className="col-md-12">
              <div className="section-row">
                {
                  tag == '' || tag == undefined ?
                    <button className="primary-button center-block" onClick={(e) => { getAllBlogs(e) }}>
                      Load More
                    </button>
                    :
                    <button className="primary-button center-block" onClick={(e) => { getBlogByCategory(e) }}>
                      Load More
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Posts
