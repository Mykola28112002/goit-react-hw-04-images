import { Overlay,Modals } from './Modal.styled';
import { useEffect } from "react";
import PropTypes from 'prop-types';


export function Modal({toggleModal,img}) {
    const modalClosed = (e) => {
        if (e.currentTarget === e.target) {
            toggleModal()
        }
    }
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                toggleModal()
            };
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    },[toggleModal]);


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