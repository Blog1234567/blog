import React,{ useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Footer() {
  const [search, setSearches] = useState('');
  let styleSheet={
    width:"50%"
  }
  function searchfunc(e)
  {
    e.preventDefault()
      history.replace(`/allblog/search/${search.toLowerCase()}`);
     document.getElementById('search').value=''
  }
  function onChange(e)
  {
    setSearches(e.target.value);
  }

  const [tags, settags] = useState([]); 
  const history = useHistory();
  function getTags()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/gettags`).then(blogs => {
      console.log('getTAgs',blogs);
      settags(blogs.data.tag.count);
    }).catch(err => {
    });    
  }
  useEffect(() => {
    // getTags()
  }, [])
    return (
        <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="/" className="logo"><img src="./img/logo.png" alt="" style={styleSheet} onClick={()=>{history.push('/');window.location.reload()}}/></Link>
                </div>

                <div className="footer-copyright">
                  <span>&copy;
   Copyright 2022 Blogging.<script>document.write(new Date().getFullYear());</script> All rights reserved. </span>
                </div>
              </div>
            </div>
   
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-widget">
                    <h3 className="footer-title" >QUICK LINKS</h3>
                    <ul className="footer-links2" style={{"marginBottom":"5%"}}>
                      <li><Link style={{fontSize:"16px","fontWeight":"bold","marginLeft":"30%"}} to="/about">About Us</Link></li>
                      <li ><Link style={{fontSize:"16px","fontWeight":"bold","marginLeft":"30%"}} to="/allforum">Forums</Link></li>
                      <li ><Link style={{fontSize:"16px","fontWeight":"bold","marginLeft":"30%"}} to="/allblog">Blogs</Link></li>
                      <li ><Link style={{fontSize:"16px","fontWeight":"bold","marginLeft":"30%"}} to="/signup">Signup</Link></li>
                      <li><Link style={{fontSize:"16px","fontWeight":"bold","marginLeft":"30%",}} to="/login">Login</Link></li>
                      </ul>
                      <ul className="footer-links1" style={{"marginBottom":"5%"}}>
                      <li><Link style={{fontSize:"16px","fontWeight":"bold",}} to="/about">About Us</Link></li>
                      <li ><Link style={{fontSize:"16px","fontWeight":"bold",}} to="/allforum">Forums</Link></li>
                      <li ><Link style={{fontSize:"16px","fontWeight":"bold",}} to="/allblog">Blogs</Link></li>
                      <li ><Link style={{fontSize:"16px","fontWeight":"bold",}} to="/signup">Signup</Link></li>
                      <li><Link style={{fontSize:"16px","fontWeight":"bold",}} to="/login">Login</Link></li>
                      </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-widget" style={{"marginBottom":"5%"}}>
                    <h3 className="footer-title">CONTACT US</h3>
                    <ul className="footer-links">
                           <li><Link to="/contactus">Send Us A Message</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
   
            <div className="col-md-3">
              <div className="footer-widget">
                <h3 className="footer-title">SEARCH ANY BLOG</h3>
                <div className="footer-newsletter">
                <form onSubmit={(e)=>{searchfunc(e)}} >
                    <input className="input" onChange={onChange} type="search" name="search" placeholder="Enter Your Search ..." id="search" autoComplete="off"/>
                    <button className="newsletter-btn"><i className="fa fa-search"></i></button>
                  </form>
                  </div>
                <ul className="footer-social">
                  <li><a href="https://www.facebook.com/Learntohack" target="_blank"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="https://www.instagram.com/learntohack7" target="_blank"><i className="fa fa-instagram"></i></a></li>
                  <li><a href="https://twitter.com/LearnToHackAU" target="_blank"><i className="fa fa-twitter"></i></a></li>
                 {/* <li><a href="https://www.linkedin.com/company/jypragroup" target="_blank"><i className="fa fa-linkedin"></i></a></li>*/}
                  <li><a href="mailto:info@learntohack.com.au" target="_blank"><i className="fa fa-envelope"></i></a></li>
                </ul>
              </div>
              <div className="footer-widget" style={{"marginTop":"5%"}}>
              <ul className="footer-links" >
                <li><Link style={{fontSize:"16px","fontWeight":"bold"}} to="/termsandcondition">Terms And Conditions</Link></li>
                <li ><Link style={{fontSize:"16px","fontWeight":"bold"}} to="/privacypolicy">Privacy Policy</Link></li>
                </ul>
            </div>
            <div className="footer-copyright1">
            <span>&copy;
Copyright 2022 Blogging.<script>document.write(new Date().getFullYear());</script> All rights reserved. </span>
          </div>
            </div>
   
          </div>
        </div>
      </footer>
    )
}

export default Footer
