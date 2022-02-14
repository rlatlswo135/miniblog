/* eslint-disable */
//eslint라는 문법잡아주는? 그런기능 create-react-app할때 설치되는데 그기능끄는거 모르면 풀어보고 npm start해보자
import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [posts,setPosts] = useState([
    {title:'나랑드 사이다',like:0,date:'날짜0',content:'본문0'},
    {title:'제로 콜라',like:0,date:'날짜1',content:'본문1'},
    {title:'가나 초콜릿',like:0,date:'날짜2',content:'본문2'}
  ])

  let [post_detail,set_post_detail] = useState('')
  let [modal,setModal] = useState(false)
  

  function likes(index,subject,value=''){
    let copy = [...posts]
    //state는 최대한 건들지말기! deepCopy해서 그걸.
    if(subject === 'like'){
      copy[index].like ++;
    }
    if(subject === 'title'){
      copy[index].title = value;
      }

    setPosts(copy)
  }
  
  function sort(array){
    let keys = array.map((item,index) => item.title+index).sort()
    let result = keys.map(item => posts[Number(item[item.length-1])])
    setPosts(result)
  }
  function postAdd(e){
    //input태그에 name속성으로 form태그에서 value를 끄집어올수있음. event.target.'name'.value
    e.preventDefault()
    let copy = [...posts]
    let layout = posts[0]
    let date = new Date().toLocaleString()
    console.log(date)
    copy.push({
      ...layout,
      title:e.target.postTitle.value,
      content:e.target.postContent.value,
      date:date})
      e.target.postTitle.value = ''
      e.target.postContent.value = ''
    setPosts(copy)
  }
  function Posts({props}){
    return props.map((post,index) => {
      return (
        <div className="posts" key={`post${index}`}>
          <h3 onClick={()=>{
            if(post === post_detail){
              setModal(false)
              set_post_detail('')
            }
            else{
              setModal(true)
              set_post_detail(post)
            }
          }}>
            {post.title}
            <span onClick={()=>likes(index,'like')}>👍{post.like}</span>
          </h3>
          <p>{post.date}</p>
            <input type="button" value="변경" onClick={()=>likes(index,'title',`변경된제목-${index}`)}/>
        <hr/>
      </div>
      )
    })
  }
  //자식컴포넌트가 부모컴포넌트의 state를 꺼내쓸려면 그냥 return단에서 state변수를 넣으면 안되고 Props메커니즘을 거쳐야된다
  function PostDetail({props}){
    return(
      <div className="modal">
        <h2>{props.title}</h2>
        <p>{props.date}</p>
        <p>{props.content}</p>
      </div>
    )
  }
  // App 컴포넌트  < Posts,PostDetail (부모 < 자식 관계)
  return (
    <div className="App">
      <div className="black-nav">
      {/* react 렌더 만들었던거 원리를 생각해보면 될거같다(중괄호 2개를 감싸는거) */}
        <div style={ {color:'gray', fontSize:'30px'} }>개발 Blog</div>
      </div>
      <form onSubmit={(e)=>{postAdd(e)}}>
        <input type="text" placeholder="post-title" name="postTitle"></input>
        <input type="text" placeholder="post-value" name="postContent" ></input>
        <input type="submit" value="등록"></input>
      </form>
        <button onClick={()=>sort(posts)}>정렬</button>
      <Posts props={posts}></Posts>
      {modal ? <PostDetail props={post_detail}/>: null}
    </div>
  );
}

export default App;
