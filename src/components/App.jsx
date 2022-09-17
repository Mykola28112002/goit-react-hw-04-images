import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getPixabay } from '../api';
import { Div } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState,useEffect } from "react";


export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [array, setArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const onSabmit = (name) => {
    setArray([]);
    setPage(1);
    setSearchQuery(name);
    setShowLoader(true)
  
    setTimeout(() => {
      setShowLoader(false)
      localStorage.setItem('searchQuery', JSON.stringify(name))
      localStorage.setItem('page', JSON.stringify(page));
    }, 500);
  };

  useEffect(() => {
    fethGetPixabay();
  },[page,searchQuery]);

  const fethGetPixabay = () => {
    if (searchQuery !== '') {
      getPixabay(searchQuery, page)
        .then(result => {
          
          setArray(prevState => [...prevState, ...result])
        
          if (result.length === 0) {
            alert(`Sorry, there are no images matching your search query: ${searchQuery}. Please try again.`)
          }  
        })
        .catch(error => {
          console.log(error.Status)
          if (error) {
            alert("We're sorry, but you've reached the end of search results.")
          }
        });
    }
  }
  
  const handleClickLoadMore = () => {
    setShowLoader(true);
    setPage(page + 1);
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  };

  const toggleModal = (currentImg) => {
    setShowModal(!showModal);
    setImg(currentImg)
  };

  return <Div>
      <Searchbar onSubmit={onSabmit}/>
    <ImageGallery array={array} toggleModal={toggleModal} />
    {array.length !== 0 && (<Button clickLoadMore={handleClickLoadMore}></Button>)}
      {showModal && (<Modal toggleModal={toggleModal}>
        <img src={img} alt="" />
    </Modal>)}
    {showLoader && <Loader/> }
    </Div>
} 