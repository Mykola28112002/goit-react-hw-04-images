import { Overlay,Modals } from './Modal.styled';
import { useEffect } from "react";
import PropTypes from 'prop-types';


export function Modal({toggleModal,showModal,img}) {
    const modalClosed = (e) => {
        if (e.currentTarget === e.target) {
            toggleModal()
        }
    }
    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            toggleModal()
        };
    };
    useEffect(() => {
      if (showModal !== false) {
        window.removeEventListener('keydown', handleKeyDown)
      }
      if (showModal !== true) {  
        window.addEventListener('keydown', handleKeyDown);
      }
    },[showModal]);


    return <Overlay onClick={(e) => {modalClosed(e)}}>
        <Modals>
            <img src={img} alt="" />
        </Modals>
    </Overlay>
    
};

Modal.propTypes = {
    showModal: PropTypes.bool,
    toggleModal: PropTypes.func,
    img: PropTypes.string
};