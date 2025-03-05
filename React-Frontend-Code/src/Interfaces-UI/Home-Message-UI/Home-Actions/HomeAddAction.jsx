import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function HomeAddAction({ fillIcon, forPage }) {
  let [isClick, setClick] = useState(false);
  let [countFriends, setCountFriends] = useState([]);
  let [input, setInput] = useState('');
  
  const BackendLink = useSelector((state)=> state.backendLink.BackendLink);
  
  const navigate = useNavigate();
  const addSlideRef = useRef(null);
  const addBtnRef = useRef(null);
  const displayNoneRef = useRef(null);
  let user = JSON.parse(localStorage.getItem('user'));
  // Debounce logic
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // Handle Add Action
  function handleAddAction() {
    if (isClick === false) {
      setClick(true);
    }
    if (displayNoneRef.current) {
      displayNoneRef.current.style.left = '-10px';
      addBtnRef.current.style.bottom = '56%';
      addBtnRef.current.style.right = '25px';
    }
  }

  // Handle Add Action Blur
  function handleAddActionBlur() {
    if (isClick === true) {
      setClick(false);
    }
    if (displayNoneRef.current) {
      displayNoneRef.current.style.left = '100vw';
      addBtnRef.current.style.bottom = '120px';
      addBtnRef.current.style.right = '30px';
    }
    setInput('');
    setCountFriends([]);
  }

  // Search for someone with debouncing
  const handleSearchSomeone = debounce(async (e) => {
    let someone = e.target.value;
    if (someone) {
      setInput(someone); // Update input state
      try {
        const response = await axios.get(`${BackendLink}/api/findSomeone`, {
          params: { someone: someone },
        });

        if (response.data.user) {
          setCountFriends((prevFriends) => {
            const user = response.data.user;

            const userExists = prevFriends.some((friend) => friend._id === user._id || friend.username === user.username);

            if (!userExists) {
              return [...prevFriends, user]; // Add user to the list
            } else {
              return prevFriends; // Return the previous state if user already exists
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setCountFriends([]); // Clear the list if input is empty
    }
  }, 500); // 500ms debounce delay

  // Handle input change (calls debounced search function)
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (forPage === 'Home') {
      handleSearchSomeone(e); // Call debounced function
    }
  };
  
  const handleShareWorld = async (e) => {
  e.preventDefault();
  console.log('handleShareWorld called');

  try {
    const response = await axios.get(`${BackendLink}/api/${user._id}/toWorld/${input}`);

    if (response.status === 201) {
      console.log('Navigating to /updates');
      handleAddActionBlur();
    } else {
      console.error('Failed to post message:', response);
    }
  } catch (error) {
    console.error('Error in handleShareWorld:', error);
  }
};


  
  const handleAddToMessage = async (id) => {
    if (id) {
  
        const response = await axios.get(`${BackendLink}/api/addFriend/${id}/to/${user._id}`);
         
        if (response) {
          console.log('response from backend Add ', response);
          navigate(`/chatWith/${id}`)
          console.log(response.data.user)
          if (user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        }
    }
  }
  return (
    <>
      <div className="add-friend-container-pop" style={{
        top: forPage === 'Home' ? '30%' : '30%'
      }} ref={displayNoneRef}>
        <div className="form-inner" style={{
          
          width: forPage === 'Home' ? '70%' : '80%',
          
        }} ref={addSlideRef}>
          <h3>
            {
              forPage === 'Home' ? 
              <>
              Make Friends <i className="bi bi-people-fill"></i>
              </>
              :
              <>
              World Chat <i className="bi bi-globe-americas"></i>
              </>
            }
          </h3>
          <form className="form-of-add-action">
            {
              forPage === 'Home' ?
          <>
            <input
              type="text"
              placeholder="Find someone..."
              value={input}
              onChange={handleInputChange}
            /> 

            {countFriends.map((user) => (
              <div key={user._id} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '100px', letterSpacing: '2px', margin: '7px 0'}}
              onClick={()=> handleAddToMessage(user._id)}
              >
                {user.username}
                <i
                  className="bi bi-send-plus-fill"
                  style={{
                    fontSize: '25px',
                    background: '#e5e5e5',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    color: '#d266ff',
                    boxShadow: '1px 1px 0 black',
                  }}
                ></i>
              </div>
            ))}
            </>
            : 
            <>
              
            <textarea cols="20" rows="4" placeholder="Chat With World..." value={input} onChange={handleInputChange}></textarea>
            <button onClick={handleShareWorld}> Share World </button>
            </>
            }
          </form>
          <div>
          </div>
        </div>
      </div>
      <button
        className="add-friend"
        onClick={() => (isClick ? handleAddActionBlur() : handleAddAction())}
        ref={addBtnRef}
      >
        <i className="bi bi-chat-right-fill icon-msg-background"></i>
        {isClick ? (
          <i className="bi bi-chevron-double-down icon-msg-foreground"></i>
        ) : (
          <i className={fillIcon}> </i>
        )}
      </button>
    </>
  );
}
